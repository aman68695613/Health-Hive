// src/api/controllers/hospitalController.js
import prisma, { Hospital, Queue, QueueEntry } from '../models/index.js';
import { getIo } from '../socket/socketManager.js';

export const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.findMany();
    res.json(hospitals);
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    res.status(500).json({ error: "Error fetching hospitals" });
  }
};

export const getHospitalQueues = async (req, res) => {
  const { id } = req.params;
  
  try {
    const queues = await Queue.findMany({
      where: { hospitalId: parseInt(id) },
      include: {
        patients: {
          include: { user: true },
          orderBy: { joinedAt: "asc" },
        },
      },
    });
    
    res.json(queues);
  } catch (error) {
    console.error("Error fetching hospital queues:", error);
    res.status(500).json({ error: "Error fetching hospital queues" });
  }
};

export const processNextPatient = async (req, res) => {
  const queueId = parseInt(req.params.queueId);
  
  try {
    const nextEntry = await QueueEntry.findFirst({
      where: {
        queueId,
        status: "waiting",
      },
      orderBy: { id: "asc" },
      include: { user: true },
    });

    if (!nextEntry) {
      return res.json({ message: "No more users in queue" });
    }

    await QueueEntry.update({
      where: { id: nextEntry.id },
      data: { status: "consulting" },
    });

    // Notify clients
    const io = getIo();
    io.emit("queueUpdate");

    res.json({
      message: "Next user marked as consulting",
      transferredUser: { id: nextEntry.user.id, name: nextEntry.user.name },
    });
  } catch (error) {
    console.error("Error processing next patient:", error);
    res.status(500).json({ error: "Error processing next patient" });
  }
};

export const getPatientQueues = async (req, res) => {
  const userId = parseInt(req.params.id);
  
  try {
    const entries = await QueueEntry.findMany({
      where: { userId, status: "waiting" },
      include: {
        queue: {
          include: { hospital: true, patients: true },
        },
      },
    });

    const data = entries.map((entry) => {
      const sorted = [...entry.queue.patients].sort((a, b) =>
        new Date(a.joinedAt) - new Date(b.joinedAt)
      );
      const position = sorted.findIndex((p) => p.id === entry.id) + 1;
      
      return {
        queue: entry.queue,
        position,
        eta: position * (Math.floor(Math.random() * 11) + 5), // Assume 5-15 mins per consultation
      };
    });

    res.json(data);
  } catch (error) {
    console.error("Error fetching patient queues:", error);
    res.status(500).json({ error: "Error fetching patient queues" });
  }
};

export const seedDummyData = async (req, res) => {
  try {
    const h1 = await Hospital.create({ data: { name: "HealthBridge" } });
    const h2 = await Hospital.create({ data: { name: "CareWell Clinic" } });

    const q1 = await Queue.create({ data: { type: "General", hospitalId: h1.id } });
    const q2 = await Queue.create({ data: { type: "Dermatology", hospitalId: h2.id } });

    const users = await Promise.all(
      Array.from({ length: 5 }).map((_, i) =>
        prisma.user.create({
          data: {
            email: `test${i}@mail.com`,
            name: `Test User ${i}`,
            password: "dummy",
          },
        })
      )
    );

    await QueueEntry.createMany({
      data: [
        { queueId: q1.id, userId: users[0].id },
        { queueId: q1.id, userId: users[1].id },
        { queueId: q2.id, userId: users[2].id },
        { queueId: q2.id, userId: users[3].id },
      ],
    });

    res.json({ message: "Dummy data inserted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to seed" });
  }
};
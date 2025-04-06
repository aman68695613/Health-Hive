import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Loader2 } from "lucide-react";

const socket = io("http://localhost:3000");

const PatientQueueStatus = ({ userId }) => {
  const [myQueues, setMyQueues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/patient/${userId}/queues`);
      setMyQueues(res.data);
    } catch (err) {
      console.error("Error fetching queue status:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    socket.on("queueUpdate", fetchStatus);
    return () => socket.off("queueUpdate");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">📋 My Queue Status</h2>

        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <Loader2 className="animate-spin text-indigo-600" size={48} />
          </div>
        ) : myQueues.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">You're not in any queue yet.</p>
        ) : (
          myQueues.map(({ queue, position, eta }) => (
            <div
              key={queue.id}
              className="bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6 mb-6 transition hover:scale-[1.01]"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {queue.type} @ <span className="text-indigo-600">{queue.hospital.name}</span>
              </h3>
              <p className="text-gray-700">
                🔢 Your position: <span className="font-medium">{position}</span>
              </p>
              <p className="text-gray-700">
                ⏱️ Estimated time: <span className="font-medium">{eta} minutes</span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PatientQueueStatus;

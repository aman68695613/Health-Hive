import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const HospitalQueueManager = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch hospitals initially
  useEffect(() => {
    const fetchHospitals = async () => {
      const res = await axios.get("/api/hospitals/");
      setHospitals(res.data);
    };
    fetchHospitals();
  }, []);

  // Fetch queues for selected hospital
  useEffect(() => {
    if (selectedHospitalId) {
      fetchQueues(selectedHospitalId);
    }
  }, [selectedHospitalId]);

  const fetchQueues = async (hospitalId) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/hospitals/${hospitalId}/queues`);
      setQueues(res.data);
    } catch (err) {
      console.error("Error fetching queues:", err);
      toast.error("Failed to load queues.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async (queueId) => {
    const res = await axios.post(`/api/hospitals/queues/${queueId}/next`);
    if (res.data?.transferredUser?.name) {
      toast.success(`Transferring ${res.data.transferredUser.name} for consultation...`);
    } else {
      toast("Queue updated");
    }
    fetchQueues(selectedHospitalId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <Toaster position="top-right"  toastOptions={{
    duration: 4000,
    style: {
      transition: "all 0.5s ease",
      padding: "12px 16px",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
    }}}/>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">🏥 Select a Hospital</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              onClick={() => setSelectedHospitalId(hospital.id)}
              className="cursor-pointer bg-white/40 backdrop-blur-md border border-white/30 shadow-md rounded-xl p-4 text-center hover:shadow-xl hover:scale-105 transition"
            >
              <h3 className="text-xl font-semibold text-gray-800">{hospital.name}</h3>
            </div>
          ))}
        </div>

        {selectedHospitalId && (
          <>
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
              Queues at Selected Hospital
            </h2>

            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="flex items-center gap-3 bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow-lg">
                  <Loader2 className="animate-spin text-indigo-600 w-6 h-6" />
                  <span className="text-gray-700 font-medium text-lg">Loading queues...</span>
                </div>
              </div>
            ) : queues.length === 0 ? (
              <p className="text-center text-gray-600 text-lg">No queues found.</p>
            ) : (
              queues.map((queue) => (
                <div
                  key={queue.id}
                  className="bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6 mb-6 transition hover:scale-[1.01]"
                >
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{queue.type} Queue</h3>
                  <p className="text-gray-700 mb-2">
                    👥 Total in queue:{" "}
                    <span className="font-medium">{queue.patients.length}</span>
                  </p>

                  <ul className="list-disc list-inside text-gray-800 mb-4">
                    {queue.patients.map((p, i) => (
                      <li key={p.id}>
                        {i + 1}. {p.user.name}
                        <span className="ml-2 text-sm text-gray-600">({p.status})</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleNext(queue.id)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-semibold transition duration-200"
                  >
                    📞 Call Next
                  </button>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HospitalQueueManager;
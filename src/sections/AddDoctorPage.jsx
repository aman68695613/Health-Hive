import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
function AddDoctorPage() {
  const [doctor, setDoctor] = useState({ name: '', speciality: '', fee: '', image: '' });
  const [doctors, setDoctors] = useState([]);

   // Fetch doctors from backend
   useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get('/doctors');
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/doctors', doctor);
      alert('Doctor added successfully!');
    } catch (error) {
      console.error(error);
      alert('Error adding doctor');
    }
  };

  return (
    <div className='flex items-center justify-center h-screen  bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white'>
         {/* Hospital Dashboard Heading */}
    <div className="max-w-md mx-auto bg-gray-800 text-white p-6 rounded-2xl shadow-lg">
    <motion.h1
        animate={{
            backgroundPositionX: "100%",
        }}
        transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
        }}
        className="text-4xl text-center mb-8 tracking-wide bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF)] [background-size:200%] text-transparent bg-clip-text font-medium"
        >
        Hospital Dashboard
    </motion.h1>
  <h2 className="text-2xl font-semibold text-center mb-4">Add Doctor</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <input
      type="text"
      name="name"
      placeholder="Name"
      onChange={handleChange}
      required
      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    <input
      type="text"
      name="speciality"
      placeholder="Speciality"
      onChange={handleChange}
      required
      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    <input
      type="number"
      name="fee"
      placeholder="Fee"
      onChange={handleChange}
      required
      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    <input
      type="text"
      name="image"
      placeholder="Image URL"
      onChange={handleChange}
      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
      >
      Add Doctor
    </button>
  </form>
     {/* Your Team Section */}
     <div className="max-w-4xl w-full mt-12">
        <h2 className="text-2xl font-semibold text-center mb-4">👨‍⚕️ Your Team</h2>
        
        <div className="overflow-hidden rounded-xl border border-gray-700 shadow-lg">
          <table className="w-full text-left bg-gray-800 text-white">
            <thead>
              <tr className="bg-gray-700 text-gray-300">
                <th className="py-3 px-6">Doctor Name</th>
                <th className="py-3 px-6">Speciality</th>
              </tr>
            </thead>
            <tbody>
              {doctors.length > 0 ? (
                doctors.map((doc, index) => (
                  <tr key={index} className="border-t border-gray-600 hover:bg-gray-700 transition">
                    <td className="py-3 px-6">{doc.name}</td>
                    <td className="py-3 px-6 text-blue-400 font-semibold">{doc.speciality}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4 text-gray-400">
                    No doctors added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
</div>

  );
}

export default AddDoctorPage;

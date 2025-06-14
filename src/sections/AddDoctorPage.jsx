import { useState } from 'react';
import axios from 'axios';

function AddDoctorPage() {
  const [doctor, setDoctor] = useState({
    name: '',
    speciality: '',
    fee: '',
    experience: '',
    hospital: '',
    surgeries: '',
    timing: '',
    image: '',
    bio: '',
    location: '',
    qualifications: ''
  });

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...doctor,
      fee: parseFloat(doctor.fee),
      experience: parseInt(doctor.experience),
    };

    try {
      await axios.post('/api/doctors/', dataToSend, {
        withCredentials: true
      });
      alert('Doctor added successfully!');
      setDoctor({
        name: '',
        speciality: '',
        fee: '',
        experience: '',
        hospital: '',
        surgeries: '',
        timing: '',
        image: '',
        bio: '',
        location: '',
        qualifications: ''
      });
    } catch (error) {
      console.error(error);
      alert('Error adding doctor');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-gray-800 text-white p-8 rounded-2xl shadow-lg overflow-y-auto">
        <h1
          className="text-4xl rainbow-text text-center mb-8 tracking-wide bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF)] [background-size:200%] text-transparent bg-clip-text font-medium"
        >
          Hospital Dashboard
        </h1>
        <h2 className="text-2xl font-semibold text-center mb-6">Add Doctor</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column – 6 fields */}
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={doctor.name}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="speciality"
                placeholder="Speciality (e.g., Cardiologist)"
                value={doctor.speciality}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="fee"
                placeholder="Consultation Fee"
                value={doctor.fee}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="experience"
                placeholder="Experience (in years)"
                value={doctor.experience}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="hospital"
                placeholder="Hospital / Clinic Affiliation"
                value={doctor.hospital}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="surgeries"
                placeholder="Surgeries (comma-separated: Heart, Knee, etc.)"
                value={doctor.surgeries}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Right Column – 5 fields + submit */}
            <div className="space-y-4">
              <input
                type="text"
                name="timing"
                placeholder="Available Timings (e.g., Mon-Fri 10am-2pm)"
                value={doctor.timing}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="image"
                placeholder="Profile Image URL"
                value={doctor.image}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="bio"
                placeholder="Short Bio / About You"
                value={doctor.bio}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="location"
                placeholder="Location / City"
                value={doctor.location}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="qualifications"
                placeholder="Qualifications (e.g., MBBS, MS)"
                value={doctor.qualifications}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
              >
                Add Doctor
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDoctorPage;








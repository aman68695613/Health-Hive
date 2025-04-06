import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUser,
  FaHospitalAlt,
  FaUserCircle
} from 'react-icons/fa';
import { MdMedicalServices } from 'react-icons/md';

import hospitalImage from '../assets/Ambulance-removebg.png';
import patientImage from '../assets/Patient.jpg';
import doctorImage from '../assets/Doctor_removebg.png';

function BasePage() {
  const [imageErrors, setImageErrors] = useState({
    hospital: false,
    patient: false,
    doctor: false
  });

  const handleImageError = (imageType) => {
    setImageErrors(prev => ({
      ...prev,
      [imageType]: true
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-800 text-white px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-white">
        <h1 className="text-xl font-bold">Dashboard</h1>
        </Link>
        <div className="flex gap-4">
            
        </div>
        <div className="flex items-center gap-2">
          <input type="text" placeholder="Search" className="rounded px-2 py-1" />
          <button>🔍</button>
          <button><FaUserCircle /></button>
        </div>
      </nav>

      {/* Cards Section */}
      <div className="flex justify-center items-center min-h-[80vh] px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl">
        <Link to="/hospital-dashboard" className="block">
          {/* 🏥 Hospital Card */}
          <div className="group relative bg-gray-100 hover:bg-gray-200 rounded-2xl shadow-2xl transition-all duration-300 h-[500px] w-full overflow-hidden">
            <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0">
              {!imageErrors.hospital ? (
                <img
                  src={hospitalImage}
                  alt="Hospital Building"
                  className="w-full h-full object-cover"
                  onError={() => handleImageError('hospital')}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <FaHospitalAlt className="h-24 w-24 text-gray-400" />
                </div>
              )}
            </div>
            <div className="absolute inset-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-start space-x-6">
                <FaHospitalAlt className="h-14 w-14 text-[#2B579A]" />
                <div>
                  <h2 className="text-3xl font-semibold mb-4">Hospital Services</h2>
                  <p className="text-gray-700 text-lg">
                    Access hospital services like emergency care, specialist treatment, and more.
                  </p>
                </div>
              </div>
            </div>
          </div>
          </Link>

          {/* 👤 Patient Card with Link */}
          <Link to="/patient-dashboard" className="block">
            <div className="group relative bg-gray-100 hover:bg-gray-200 rounded-2xl shadow-2xl transition-all duration-300 h-[500px] w-full overflow-hidden">
              <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0">
                {!imageErrors.patient ? (
                  <img
                    src={patientImage}
                    alt="Patient Care"
                    className="w-full h-full object-cover"
                    onError={() => handleImageError('patient')}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <FaUser className="h-24 w-24 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="absolute inset-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-start space-x-6">
                  <FaUser className="h-14 w-14 text-[#2B579A]" />
                  <div>
                    <h2 className="text-3xl font-semibold mb-4">Patient Portal</h2>
                    <p className="text-gray-700 text-lg">
                      Manage your medical records, view test results, and schedule appointments in one secure location.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* 🩺 Doctor Card */}
          <div className="group relative bg-gray-100 hover:bg-gray-200 rounded-2xl shadow-2xl transition-all duration-300 h-[500px] w-full overflow-hidden">
            <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0">
              {!imageErrors.doctor ? (
                <img
                  src={doctorImage}
                  alt="Doctor Consultation"
                  className="w-full h-full object-cover"
                  onError={() => handleImageError('doctor')}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <MdMedicalServices className="h-24 w-24 text-gray-400" />
                </div>
              )}
            </div>
            <div className="absolute inset-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-start space-x-6">
                <MdMedicalServices className="h-14 w-14 text-[#2B579A]" />
                <div>
                  <h2 className="text-3xl font-semibold mb-4">Doctor Directory</h2>
                  <p className="text-gray-700 text-lg">
                    Connect with healthcare professionals by specialty, read reviews, and book consultations.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BasePage;
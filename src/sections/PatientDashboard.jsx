import { useState } from "react";
import PropTypes from "prop-types";

import {
  FaMoneyCheckAlt,
  FaSearch,
  FaUserCircle
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { LuAmbulance } from "react-icons/lu";
import { CiBoxList } from "react-icons/ci";

// Main App Component
export default function App() {
  return (
    <main className="min-h-screen bg-gray-50">
      <PatientDashboard />
    </main>
  );
}

// Navbar Component
function Navbar() {
  return (
    <nav className="bg-[#2B579A] text-white p-6 rounded-xl mb-12">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Patient Dashboard</h1>

        <div className="flex items-center space-x-8">
          <a href="#" className="hover:text-gray-200">Home</a>
          <a href="#" className="hover:text-gray-200">Medical Records</a>
          <a href="#" className="hover:text-gray-200">Support</a>

          <div className="flex items-center bg-white rounded-lg px-4 py-2">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-gray-800 focus:outline-none w-48"
            />
            <FaSearch className="h-5 w-5 text-gray-500 ml-2" />
          </div>

          <FaUserCircle className="h-8 w-8" />
        </div>
      </div>
    </nav>
  );
}

// Patient Dashboard Component
function PatientDashboard() {
  const services = [
    {
      title: "Surgery and Billing",
      icon: FaMoneyCheckAlt,
      description:
        "View hospitals offering surgeries, check justified billing, book consultation with surgeons. Compare costs across hospitals and get detailed breakdown of all charges.",
    },
    {
      title: "Ambulance Booking",
      icon: LuAmbulance,
      description:
        "Emergency & scheduled booking, no-time tracking. GPS-enabled ambulance tracking, estimated arrival time, and option to share location with emergency contacts.",
    },
    {
      title: "Doctor Consultation",
      icon: FaUserDoctor,
      description:
        "List of verified doctors, specialization-based search, appointment booking. View doctor ratings, experience, and available time slots for in-person or virtual consultations.",
    },
    {
      title: "Real Time Queue",
      icon: CiBoxList,
      description:
        "Check current waiting times, get notifications when your turn is approaching. Estimate your appointment time and reduce waiting room crowding with virtual queue management.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Patient Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Service Card Component
function ServiceCard({ service }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 flex items-start">
        <div className="mr-4 text-blue-600">
          <service.icon className="text-5xl" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isHovered ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-gray-600 mb-4">{service.description}</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Prop Types Validation
ServiceCard.propTypes = {
  service: PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
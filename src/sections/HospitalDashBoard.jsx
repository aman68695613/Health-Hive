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
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
// Main App Component
export default function App() {
  return (
    <main className="min-h-screen bg-gray-50">
      <HospitalDashboard />
    </main>
  );
}

// Navbar Component
function Navbar() {
  return (
    <nav className="bg-[#2B579A] text-white p-6 rounded-xl mb-12">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/">
        <h1 className="text-2xl font-semibold">Hospital Dashboard</h1>
        </Link>

        <div className="flex items-center space-x-8">
          <a href="/" className="hover:text-gray-200">Home</a>
          <a href="/" className="hover:text-gray-200">Medical Records</a>
          <a href="/" className="hover:text-gray-200">Support</a>

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
function HospitalDashboard() {

const services = [
    {
      title: "Register Doctors",
      icon: FaMoneyCheckAlt,
      route: "/adddoctor",
      description: "...",
    },
    {
      title: "Buy oxygen Cylinder",
      icon: CiBoxList,
      route: "/products",
      description: "...",
    },
    {
      title: "Current Queues ",
      icon: CiBoxList,
      route: "/hospital-queues",
      description: "...",
    },
  ];
  

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Hospital Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service }) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
  
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
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
                // eslint-disable-next-line react/prop-types
                onClick={() => navigate(service.route)}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

ServiceCard.propTypes = {
    service: PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      description: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
    }).isRequired,
  };
  
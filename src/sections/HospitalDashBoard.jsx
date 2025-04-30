import { useState } from "react";
import PropTypes from "prop-types";

import {
  FaMoneyCheckAlt,
  FaSearch,
  FaUserCircle
} from "react-icons/fa";

import { CiBoxList } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { TbScubaDivingTankFilled } from "react-icons/tb";
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
    <nav className="bg-[#2B579A] text-white p-6  mb-12">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/basepage">
        <h1 className="text-3xl font-semibold text-white tracking-tight -ml-35">
            Hospital Dashboard
          </h1>
        </Link>

        <div className="flex items-center space-x-8">
  {["Home", "Medical Records", "Support"].map((label, index) => (
    <a
      key={index}
      href="/"
      className="relative group text-white font-medium"
    >
      {label}
      <span
        className="absolute left-0 -bottom-1 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"
      ></span>
    </a>
  ))}

  <div className="flex items-center bg-white rounded-lg px-4 py-2">
    <input
      type="text"
      placeholder="Search"
      className="bg-transparent text-gray-800 focus:outline-none w-48"
    />
    <FaSearch className="h-5 w-5 text-gray-500 ml-2" />
  </div>

  <FaUserCircle className="h-8 w-8 opacity-0" />
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
      description: "Empower your hospital by registering qualified doctors directly through our platform. Building a trusted medical network accessible to all.",
    },
    {
      title: "Buy oxygen Cylinder",
      icon: TbScubaDivingTankFilled,
      route: "/products",
      description: "Ensure uninterrupted oxygen supply by purchasing verified cylinders through our platform. Track availability, get fair pricing , and receive timely delivery backed by trusted logistics.",
    },
    {
      title: "Current Queues ",
      icon: CiBoxList,
      route: "/hospital-queues",
      description: "Seamlessly manage and update real-time queues for consultations and procedures. Provide patients with live status, reduce waiting room congestion, and optimize flow — all with transparency and control at your fingertips.",
    },
  ];
  

  const numColumns = 3; // You can change this to 3 or 4 as needed
  const columns = Array.from({ length: numColumns }, () => []);

  services.forEach((service, index) => {
    columns[index % numColumns].push(service);
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Hospital Services</h1>
        <div className="flex gap-6">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-6 flex-1">
              {column.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
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
      className={`bg-white rounded-2xl shadow-md transition-all duration-300 ease-in-out transform hover:shadow-xl relative overflow-hidden border ${
        isHovered ? "border-blue-500 bg-blue-50" : "border-transparent"
      } ${isHovered ? "py-6" : "py-10"} px-6`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="px-6 flex items-start">
        <div className="mr-4 text-blue-600">
          <service.icon className="text-5xl" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
          <div
            className={`transition-all duration-300 ease-in-out ${
              isHovered ? "opacity-100 max-h-60" : "opacity-0 max-h-0"
            } overflow-hidden`}
          >
            <p className="text-gray-600 mb-4">{service.description}</p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
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
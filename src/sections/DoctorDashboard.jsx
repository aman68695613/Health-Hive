
import { useState } from "react";
import PropTypes from "prop-types";
import {
  FaMoneyCheckAlt,
  FaSearch,
  FaUserCircle
} from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { LuAmbulance } from "react-icons/lu";
import { CiBoxList } from "react-icons/ci";
import { useNavigate, Link } from "react-router-dom";

// Reusable Navigation Link with Animated Underline
function NavLink({ label, href }) {
  return (
    <Link
      to={href}
      className="relative group text-white font-medium tracking-wide"
    >
      {label}
      <span className="absolute left-1/2 bottom-[-6px] w-0 h-0.5 bg-white transition-all duration-300 origin-center transform -translate-x-1/2 group-hover:w-full" />
    </Link>
  );
}

// Navbar Component
function Navbar() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Medical Records", href: "/" },
    { label: "Support", href: "/" },
  ];

  return (
    <nav className="bg-[#2B579A] text-white p-8 mb-12 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/basepage">
          <h1 className="text-3xl font-bold tracking-tight">Doctor Dashboard</h1>
        </Link>
        <div className="flex items-center space-x-8">
          {navLinks.map((link, idx) => (
            <NavLink key={idx} label={link.label} href={link.href} />
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

// Service Card Component
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
      <div className="flex items-start mb-3">
        <div className="mr-5 text-blue-600">
          <service.icon className="text-4xl" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-gray-800 mb-1">
            {service.title}
          </h3>
        </div>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isHovered ? "opacity-100 max-h-64" : "opacity-0 max-h-0"
        } overflow-hidden`}
      >
        <p className="text-gray-700 mb-4 leading-relaxed">{service.description}</p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full text-sm font-medium shadow-sm"
          onClick={() => navigate(service.route)}
        >
          Learn More
        </button>
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

// Doctor Dashboard Component
function DoctorDashboard() {
  const services = [
    {
      title: "Online Session",
      icon: FaVideo,
      route: "/doctorrev",
      description:
        "Deal with your patient via video calls - even from remote areas.",
    },
    
    {
      title: "Doctor Consultation",
      icon: FaUserDoctor,
      route: "/doctors",
      description:
        "Connect with your patients via chat.",
    },
    {
      title: "Real Time Queue",
      icon: CiBoxList,
      route: "/doctor-queue",
      description:
        "Track live queues so you know exactly when it's your turn — efficient and stress-free.",
    },
  ];

  const numColumns = 2;
  const columns = Array.from({ length: numColumns }, () => []);
  services.forEach((service, index) => {
    columns[index % numColumns].push(service);
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-10 text-gray-900">Doctor Services</h1>
        <div className="flex gap-8">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-8 flex-1">
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

// Main App Component
export default function App() {
  return (
    <main className="min-h-screen bg-gray-50">
      <DoctorDashboard />
    </main>
  );
}

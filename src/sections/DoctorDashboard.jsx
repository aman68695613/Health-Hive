// import { useState } from "react"
// import PropTypes from "prop-types"
// import { FaCalendarCheck, FaUserMd, FaClipboardList, FaUserInjured } from "react-icons/fa"

// // Navbar Component
// const Navbar = () => (
//   <nav className="bg-blue-700 text-white p-4">
//     <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
//       <div className="flex items-center mb-4 md:mb-0">
//         <h1 className="text-2xl font-bold mr-8">Healthcare Dashboard</h1>
//         <div className="hidden md:flex space-x-6">
//           <a href="#" className="hover:text-blue-200 transition-colors">Home</a>
//           <a href="#" className="hover:text-blue-200 transition-colors">Medical Records</a>
//           <a href="#" className="hover:text-blue-200 transition-colors">Surgery</a>
//           <a href="#" className="hover:text-blue-200 transition-colors">Ambulance</a>
//         </div>
//       </div>
//       <div className="flex items-center w-full md:w-auto">
//         <div className="relative flex-grow md:flex-grow-0">
//           <input
//             type="text"
//             placeholder="Search"
//             className="w-full md:w-64 px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <button className="ml-4 bg-blue-800 p-2 rounded-full">
//           <span className="text-white">User</span>
//         </button>
//       </div>
//     </div>
//   </nav>
// )

// // DashboardCard Component
// const DashboardCard = ({ card }) => {
//   const [isHovered, setIsHovered] = useState(false)
  
//   const statusColors = {
//     success: "bg-green-100 text-green-800",
//     warning: "bg-yellow-100 text-yellow-800",
//     error: "bg-red-100 text-red-800",
//     info: "bg-blue-100 text-blue-800",
//   }

//   return (
//     <div
//       className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       style={{ height: isHovered ? "auto" : "280px" }}
//     >
//       <div className="relative h-40 bg-blue-50 flex items-center justify-center">
//         <card.icon className="text-blue-600 text-5xl" />
//         <div className="absolute top-4 right-4">
//           <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[card.statusType]}`}>
//             {card.status}
//           </span>
//         </div>
//       </div>
//       <div className="p-5">
//         <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
//         <div className={`transition-all duration-300 ${isHovered ? "opacity-100 max-h-60" : "opacity-0 max-h-0 overflow-hidden"}`}>
//           <p className="text-gray-600 mb-3">{card.description}</p>
//           <div className="flex justify-between items-center text-sm">
//             <span className="text-gray-500">{card.count}</span>
//             <span className="text-gray-500">Updated: {card.lastUpdated}</span>
//           </div>
//           <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors">
//             View Details
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// // PropTypes for DashboardCard
// DashboardCard.propTypes = {
//   card: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     status: PropTypes.string.isRequired,
//     statusType: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired,
//     icon: PropTypes.elementType.isRequired,
//     description: PropTypes.string.isRequired,
//     count: PropTypes.string.isRequired,
//     lastUpdated: PropTypes.string.isRequired,
//   }).isRequired,
// }

// // Main DoctorDashboard Component
// export default function DoctorDashboard() {
//   const doctorCards = [
//     {
//       title: "Appointment with Patient",
//       status: "5 Today",
//       statusType: "info",
//       icon: FaCalendarCheck,
//       description: "View and manage your upcoming patient appointments. You can reschedule, cancel, or add notes for each appointment.",
//       count: "5 pending",
//       lastUpdated: "10 minutes ago",
//     },
//     {
//       title: "Register Yourself",
//       status: "Required",
//       statusType: "warning",
//       icon: FaUserMd,
//       description: "Complete your profile registration to access all features. Add your specialization, experience, education, and availability hours for better patient matching.",
//       count: "Profile 70% complete",
//       lastUpdated: "2 days ago",
//     },
//     {
//       title: "Patient Records",
//       status: "Available",
//       statusType: "success",
//       icon: FaClipboardList,
//       description: "Access and update medical records for your patients. View history, prescriptions, test results, and add new medical notes after consultation.",
//       count: "120 records",
//       lastUpdated: "1 hour ago",
//     },
//     {
//       title: "Emergency Cases",
//       status: "2 New",
//       statusType: "error",
//       icon: FaUserInjured,
//       description: "View urgent cases requiring immediate attention. These patients have been flagged as high priority and need your expertise as soon as possible.",
//       count: "2 waiting",
//       lastUpdated: "5 minutes ago",
//     },
//   ]

//   return (
//     <main className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">Doctor Services</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           {doctorCards.map((card, index) => (
//             <DashboardCard key={index} card={card} />
//           ))}
//         </div>
//       </div>
//     </main>
//   )
// }

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

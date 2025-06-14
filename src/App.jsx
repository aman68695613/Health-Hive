import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Lenis from 'lenis'
import HomePage from './sections/HomePage'
import LoginPage from './sections/LoginPage'
import SignUpPage from './sections/SignupPage'
import AddDoctorPage from './sections/AddDoctorPage';
import DoctorsListPage from './sections/DoctorsListPage';
import AddProductPage from './sections/AddProductPage';
import ProductsPage from './sections/ProductsPage';
import AmbulanceBookingPage from "./sections/AmbulanceBookingPage";
// 🆕 Import new queue pages
import HospitalQueueManagementPage from './sections/HospitalQueueManager';
import PatientQueueStatusPage from './sections/PatientQueueStatus';
import ProtectedRoute from "./sections/ProtectedRoute"; // ✅
import Layout from './sections/Layout'; // ✅ import Layout
import DoctorRev from "./sections/DoctorRev";
import ChatPage from "./sections/ChatPage";
import DoctorChatPage from "./sections/DoctorChatPage";
import BasePage from './sections/BasePage';
import PatientDashboard from "./sections/PatientDashboard";
import HospitalDashboard from "./sections/HospitalDashBoard";
import DoctorDashboard from "./sections/DoctorDashboard";

//setting up cors 
axios.defaults.baseURL = "https://health-hive-8tv1.onrender.com"
axios.defaults.withCredentials = true
// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
  console.log(e);
});

function App() {
  const userId = parseInt(localStorage.getItem("userId"), 10);
  const randomHospitalId = Math.random() < 0.5 ? 1 : 2;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/" element={<HomePage />} />

        <Route path="/user" element={
          <ProtectedRoute><Layout><HomePage /></Layout></ProtectedRoute>
        } />
        <Route path="/doctors" element={
          <ProtectedRoute><Layout><DoctorsListPage /></Layout></ProtectedRoute>
        } />
        <Route path="/adddoctor" element={
          <ProtectedRoute><Layout><AddDoctorPage /></Layout></ProtectedRoute>
        } />
        <Route path="/addproduct" element={
          <ProtectedRoute><Layout><AddProductPage /></Layout></ProtectedRoute>
        } />
        <Route path="/products" element={
          <ProtectedRoute><Layout><ProductsPage /></Layout></ProtectedRoute>
        } />
        <Route path="/doctorrev" element={
          <ProtectedRoute><Layout><DoctorRev /></Layout></ProtectedRoute>
        } />
        <Route path="/ambulance-booking" element={
          <ProtectedRoute><Layout><AmbulanceBookingPage /></Layout></ProtectedRoute>
        } />
        <Route path="/hospital-queues" element={
          <ProtectedRoute><Layout><HospitalQueueManagementPage hospitalId={randomHospitalId} /></Layout></ProtectedRoute>
        } />
        <Route path="/basepage" element={
          <ProtectedRoute><Layout><BasePage/></Layout></ProtectedRoute>
        } />
        <Route path="/patient-dashboard" element={
          <ProtectedRoute><Layout><PatientDashboard/></Layout></ProtectedRoute>
        } />
        <Route path="/hospital-dashboard" element={
          <ProtectedRoute><Layout><HospitalDashboard/></Layout></ProtectedRoute>
        } />
        <Route path="/doctor-dashboard" element={
          <ProtectedRoute><Layout><DoctorDashboard/></Layout></ProtectedRoute>
        } />
        <Route path="/patient-queue" element={
          <ProtectedRoute><Layout><PatientQueueStatusPage userId={userId} /></Layout></ProtectedRoute>
        } />
      <Route path="/chat/:doctorId" element={
        <ProtectedRoute><Layout><ChatPage /></Layout></ProtectedRoute>
      } />
      <Route path="/doctor-chat" element={
        <ProtectedRoute><Layout><DoctorChatPage /></Layout></ProtectedRoute>
      } />
      </Routes>


    </BrowserRouter>
  );
}

export default App

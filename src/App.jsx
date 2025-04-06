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

import DoctorRev from "./sections/DoctorRev";
//setting up cors 
axios.defaults.baseURL="http://localhost:3000"
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
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/user' element={<HomePage />} />
        <Route path='/doctors' element={<DoctorsListPage />} />
        <Route path='/adddoctor' element={<AddDoctorPage />} />
        <Route path='/addproduct' element={<AddProductPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/doctorrev' element={<DoctorRev />} />
        <Route path="/ambulance-booking" element={<AmbulanceBookingPage />} />
        <Route path="/hospital-queues" element={<HospitalQueueManagementPage hospitalId={randomHospitalId}/>} />
        <Route path="/patient-queue" element={<PatientQueueStatusPage userId={userId} />} />
      </Routes>
   </BrowserRouter>
  )
}

export default App

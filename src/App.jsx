import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Lenis from 'lenis'
import HomePage from './sections/HomePage'
import LoginPage from './sections/LoginPage'
import SignUpPage from './sections/SignupPage'
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
 
  return (
     <BrowserRouter>
     <Routes>
       <Route path='/' element={<HomePage/>} />
       <Route path='/login' element={<LoginPage/>} />
       <Route path='/signup' element={<SignUpPage/>} />
       <Route path='/user' element={<HomePage/>} />
     </Routes>
   </BrowserRouter>
  )
}

export default App

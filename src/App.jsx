import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Lenis from 'lenis'
import HomePage from './sections/HomePage'
import { useEffect } from 'react'
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/users"); // ✅ Replace with your API URL
        const data=response.data[0];
        console.log(data); // ✅ Handle the response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // ✅ Call the async function
  }, []); 
  return (
     <BrowserRouter>
     <Routes>
       <Route path='/' element={<HomePage />} />
     </Routes>
   </BrowserRouter>
  )
}

export default App

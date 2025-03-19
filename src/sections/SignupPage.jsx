import axios from 'axios'
import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'



function LoginPage() {
  const navigate = useNavigate();
  const [email,setEmail]=useState("")
  const [name,setName]=useState("")
  const [password,setPassword]=useState("")
  const [redirect,setRedirect]=useState(false)
  async function handleSignUpSubmit(e){
    e.preventDefault()
    try{
        const data=await axios.post('/signup',{name,email,password}) 
        alert("Signup successful")
        console.log(data)
        setRedirect(true) 
    }catch(e){
      alert("SignUp failed",e)
    }
    if(redirect){
      navigate('/')  // redirect to dashboard page when login successful
    }
  }
  return(
    <div className="flex items-center justify-center h-screen  bg-gray-900 text-white">
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 ">
      <h2 className="text-2xl font-bold text-center mb-4">SignUp</h2>
      <form onSubmit={handleSignUpSubmit}  className="space-y-4"> 
        {/* Name Input */}
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* Login Button */}
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white p-3 rounded transition">
          SignUp
        </button>
      </form>
      <p className="text-center mt-4 text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  </div>
  )
} 

export default LoginPage
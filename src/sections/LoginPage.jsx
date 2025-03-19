/* eslint-disable react/prop-types */
import axios from 'axios'
import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'



function LoginPage() {
  const navigate = useNavigate();
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  async function handleLoginSubmit(e){
    e.preventDefault()
    try{
        const data=await axios.post('/login',{email,password}) 
        alert("Login successful")
        console.log(data)
        navigate('/user')  
    }catch(e){
      alert("Login failed",e)
    }
    
  }
  return(
    <div className="flex items-center justify-center h-screen  bg-gray-900 text-white">
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 ">
      <h2 className="text-2xl font-bold text-center mb-4">Welcome Back</h2>
      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white p-3 rounded transition"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4 text-gray-400">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="text-blue-400 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  </div>
  )
} 

export default LoginPage
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
        const userId=localStorage.setItem('userId',data.data.user.id)
        console.log(data.data.user)
        alert("Login successful")
        console.log(data)
        navigate('/user')  
    }catch(e){
      alert("Login failed: " + (e.response?.data?.error || e.message));
  }
    }
    
  
  

  return(
    <div className="flex items-center justify-center h-screen  bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 ">
    <h2
        className="text-4xl rainbow-text text-center mb-8 tracking-wide bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF)] [background-size:200%] text-transparent bg-clip-text font-medium"
        >
        Welcome Back
    </h2>
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
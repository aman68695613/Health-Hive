import axios from 'axios'
import  { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext';


function LoginPage() {
  const navigate = useNavigate();
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [redirect,setRedirect]=useState(false)
  const {setUser}=useContext(UserContext)
  async function handleLoginSubmit(e){
    e.preventDefault()
    try{
        const {data}=await axios.post('/login',{email,password}) 
        setUser(data)
        alert("Login successful")
        setRedirect(true) 
    }catch(e){
      alert("Login failed")
    }
    if(redirect){
      navigate('/')  // redirect to dashboard page when login successful
    }
  }
  return(

    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>

      <h1 className='text-4xl text-center mb-4'>Login</h1>
      <form className='max-w-md mx-auto ' 
      onSubmit={handleLoginSubmit}>
        <input type='email' placeholder='your@email.com' 
        value={email} onChange={e=>setEmail(e.target.value)}></input>

        <input type='password' placeholder='password'
        value={password} onChange={e=>setPassword(e.target.value)}></input>

        <button className='primary'>Login</button>
        <div className='text-center py-2 text-gray-500'>
            Not have an account yet ? 
          <Link to={"/register"} className='underline text-black'> Register now </Link>
        </div>
      </form>
      </div>
    </div>
  )
} 

export default LoginPage
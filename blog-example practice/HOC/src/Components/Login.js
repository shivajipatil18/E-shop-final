import React from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const Navigate= useNavigate()

    const handleLogin=()=>{
        localStorage.setItem("auth",true)
        Navigate("/dashboard")
    }
  return (
    <div>
        <h1>Login</h1>
        <button onClick={handleLogin}>Login</button>    
    </div>
  )
}

export default Login
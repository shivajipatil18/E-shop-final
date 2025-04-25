import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const Navigate= useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem("auth")
        Navigate("/login")
    }
  return (
    <div style={{padding:"20px"}}>
        
        <h3>Welcome to the dashboard</h3>   
       
        <button onClick={handleLogout}>Logout</button>  
    </div>
  )
}

export default Dashboard
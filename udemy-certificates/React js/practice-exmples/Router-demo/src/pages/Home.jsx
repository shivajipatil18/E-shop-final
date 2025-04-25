import React from 'react'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Data fetch from api</p>
      <Outlet/>
    </div>
  )
}

export default Home
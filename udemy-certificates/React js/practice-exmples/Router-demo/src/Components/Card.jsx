import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({ user: { picture = {}, name = {}, email } = {},id={} }) => {
  const navigate=useNavigate()
  // const {avatar,email, first,last}=user
 const userDetailNavigate=()=>{
  navigate(`/user${id}`)
 }
  return (
    <div className='cardWrapper ' onClick={userDetailNavigate}>
      <img src={picture?.large} alt='image'/>
      <h1>{name?.first}</h1>
      <h1>{name?.last}</h1>
      <h1>{email}</h1>
    </div>
  )
}

export default Card
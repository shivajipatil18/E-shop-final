import React from 'react'
import { useNavigate } from 'react-router-dom'

const Back = () => {
    const navigate=useNavigate()
  return (
    <div>
        <p>
    Come Back
        </p>
        <button onClick={()=>navigate(-1)}>Back </button>
        </div>
  )
}

export default Back
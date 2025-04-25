import React from 'react'
import image1 from "../assets/images/error-404.png"
import { useNavigate, useRouteError } from 'react-router-dom'
 
const Error = () => {
  const navigate=useNavigate()
  const error=useRouteError()
  console.log(error)
  return (
   
    <div className='errorWrapper'>
         <img src={image1} alt='pagenotfound' className='error'/>
         <div>
          <button onClick={()=>navigate(-1)}>Back</button>
          <p>{error.data ||error.message}</p>
          
         </div>
    </div>
  )
}

export default Error
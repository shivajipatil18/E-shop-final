import React, { useState } from 'react'

const ChangeAddress = ({setAddress,setIsModalOpen}) => {
  const [newAddress,setNewAddress]=useState("")
  // const handleonChange=(e)=>{
  //   setNewAddress(e.target.value)
  // }
  const onClose=()=>{
    setAddress(newAddress)
    setIsModalOpen(false)
  }
  return (
    <div>
        <input type="text" 
        placeholder=' enter new  address'
        className='border p-2 w-full mb-2'
        onChange={(e)=>setNewAddress(e.target.value)}
        />
        <div  className='flex justify-end'>
            <button className='bg-blue-500 text-white py-2 px-4 rounded mr-2 ' onClick={()=>setIsModalOpen(false)}>cancel</button>
            <button className='bg-blue-500 text-white py-2 px-4 rounded mr-2 ' onClick={onClose}>Save Address</button>
        </div>
    </div>
  )
}

export default ChangeAddress
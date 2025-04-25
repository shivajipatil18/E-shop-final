import React, { useState,useEffect } from 'react'
import axios from 'axios'

const UseEffectExample = () => {
    const [users,setUsers]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)

    const getUsers=async()=>{
        try {
            setLoading(true)
            const  response= await axios('https://jsonplaceholder.typicode.com/users')
            console.log(response)
            setUsers(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setError(error)
            setLoading(false)
        }
    }
    useEffect(()=>{
        getUsers()
    },[])

  return (
    <div>
 <h1 style={{ color: "green" }}>UseEffect Example </h1>
 {loading && <h1>Loading...</h1>}
{error && <h1>something went wrong...</h1>}
{users?.map((user)=>{
    return(
        <div key={user.id}>
            {user.name}
        </div>
    )
})}
    </div>
  )
}

export default UseEffectExample
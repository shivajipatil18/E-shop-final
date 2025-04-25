import React from 'react'
// import {getAllUsers} from "../Services/apiUsers"
import { useLoaderData } from 'react-router-dom'
import Card from "../Components/Card"

const User = () => {
  const users=useLoaderData()
  console.log(users)
  
  return (
    <div>
    {users?.results?.map((user) => <Card user={user} key={user.id} />)}
    </div>
  )
}
// export const Loader=async()=>{
//   const users= await getAllUsers()
//   return users
// }
export default User

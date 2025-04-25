import React from "react"
import { getSelectedUser } from "../Services/apiUsers"
import { useLoaderData } from "react-router-dom"

const UserDetail=()=>{
    const userDetail=useLoaderData()
    console.log(userDetail)
    return (
<>

      <h1></h1>
      <h1> Name:{userDetail.data.first}</h1>
      <h1>Email:{userDetail.data.email}</h1>
</>
    )
}
export const loader=async({params})=>{
    const userDetail=await getSelectedUser(params.id)
    return userDetail
}
export default UserDetail
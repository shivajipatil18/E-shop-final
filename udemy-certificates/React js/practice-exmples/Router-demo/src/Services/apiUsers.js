import axios from 'axios'

const BASE_URL='https://randomuser.me/api'

export const getAllUsers=async()=>{
try{
const {data}=await axios(BASE_URL)
return data
}catch(error){
    console.log(error)
}

}

export const getSelectedUser=async(id)=>{
    try{
    const {data}=await axios(`${BASE_URL}?id=${id}`)
    return data
    }catch(error){
        console.log(error)
    }
    
    }
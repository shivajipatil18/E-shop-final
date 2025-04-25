import React from 'react'
import { Outlet,useNavigation } from 'react-router-dom'
import Menu  from "../Components/Menu"
import Back from '../Components/Back'
import Loader from '../Components/Loader'

const AppLayout = () => {
  const  navigation=useNavigation()
  console.log(navigation)
  const isLoading=navigation.state==='loading'
  return (
    <div className='layoutWrapper'>
        <Menu/>
        {isLoading&&<Loader/>}
        <main className='mainWrapper'>
        <Outlet/>
        </main>
        <Back/>
    </div>
  )
}

export default AppLayout
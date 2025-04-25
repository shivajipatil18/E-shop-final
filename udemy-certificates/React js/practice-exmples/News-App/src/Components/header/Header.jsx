import React, { useState } from 'react'
import style from "./Header.module.css"
import Search from '../../pages/search/Search'
import Navbar from '../navbar/Navbar'
import styles from "../header/Header.module.css"
import { useNavigate } from 'react-router-dom'
const Header = () => {
    const [search,setSearch]=useState("")
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        navigate("/search",{state:search})
    }
  return (
    <div className={styles.container}>
        <div className={style.Top}>
            <h1>News App </h1>
            <form onSubmit={handleSubmit}>
                <input type='text'
                 placeholder='Search ...'
                  className={styles.search}
                 value={search}
                  onChange={(e)=>setSearch(e.target.value)}/>
                  <button type='Submit'> Search </button>
            </form>
          
        </div>
        <Navbar/>
    </div>
  )
}

export default Header
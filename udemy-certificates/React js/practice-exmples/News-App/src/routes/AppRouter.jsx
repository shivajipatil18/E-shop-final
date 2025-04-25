import React from 'react'
import {BrowserRouter,Routes, Route}  from "react-router-dom"
import Header from '../Components/header/Header'
import Search  from "../pages/search/Search"  
import Categories from "../pages/categories/Categories"
import Home from '../pages/home/Home'

const AppRouter = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/search" element={<Search/>} />
      <Route path="/categories" element={<Categories/>} />
    </Routes>
  </BrowserRouter>
  
  )
}

export default AppRouter
import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import styles from "./Home.module.css"
import Slider from "../../Components/slider/Slider"
import Spinner from "../../Components/spinner/Spinner"
import NewsCard from '../../Components/newscard/NewsCard'

import ThemeChange from '../../Components/themeChange/ThemeChange'
import useNews from '../../hooks/useNews'

const Home = () => {
const {news,loading,theme}=useNews("","us")
const darkmode=theme.state.darkmode
const SliderNews=news?.splice(0,3)

useEffect(()=>{},[darkmode])
  // const [news,setNews]=useState([])
  // const [loading,setLoading]=useState(false)
//   const theme=useContext(ThemeContext)
//   const darkmode=theme.state.darkmode
//   console.log(theme)
//   const apikey = process.env.REACT_APP_API_KEY;
//   const url =`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apikey}`

  
//   const getNews=async()=>{
//     setLoading(true)
// try {

//   const {data}=await axios(url)
//   console.log(data)
//   setNews(data.articles)
//   setLoading(false)
// } catch (error) {
//   console.log(error)
//   setLoading(false)
// }
//   }
//   useEffect(()=>{
//     getNews()
//   },[])
  // const SliderNews=news?.slice(0,3)
  return (
    <div className={styles.container} style={{backgroundColor:darkmode?"orange":"white"}}>
      <ThemeChange/>
      <div className={styles.slider}><Slider SliderNews={SliderNews}/></div>
      <div className={styles.news}>
        {loading && <Spinner/>}
        {news?.map((item,index)=>(
          <NewsCard key={index} {...item}/>
        ))}
      </div>
    </div>
  )
}

export default Home
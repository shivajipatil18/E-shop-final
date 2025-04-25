import React, { useState, useEffect } from "react";
import styles from "./Categories.module.css";
import { useLocation } from "react-router-dom";
import Spinner from "../../Components/spinner/Spinner";
import NewsCard from "../../Components/newscard/NewsCard";

import useNews from "../../hooks/useNews";
const Categories = () => {
  
  const { state } = useLocation();
  const {news,filter,setFilter,loading, handleSubmit,theme}=useNews(state.category)
const darkmode=theme.state.darkmode
  // const [news, setNews] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [filter, setFilter] = useState("");

  useEffect(()=>{},[darkmode])
  // const category = state?.category || "general";

  // const apikey = process.env.REACT_APP_API_KEY;
  // const baseUrl = "https://newsapi.org/v2/top-headlines";

  // const fetchNews = async (url) => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setNews(data.articles || []);
  //   } catch (error) {
  //     console.error("Error fetching news:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  
  // useEffect(() => {
  //   const url = `${baseUrl}?country=us&category=${category}&apiKey=${apikey}`;
  //   fetchNews(url);
  // }, [category]); 

  
  // const handleSubmit = (e) => {
  //   e.preventDefault(); 
  //   if (filter.trim() === "") return; 

  //   const filterUrl = `${baseUrl}?country=${filter}&category=${category}&apiKey=${apikey}`;
  //   fetchNews(filterUrl); 
  //   setFilter(""); 
  // };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Enter country code (e.g., us, gb, in)"
          />
          <button type="submit">Filter</button>
        </form>
      </div>
      <div className={styles.right}>
        {loading && <Spinner />} {/* ✅ Show spinner while loading */}
        {!loading && news.length === 0 && <p>No news available.</p>} {/* ✅ Handle no news case */}
        {news.map((item, index) => (
          <NewsCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Categories;

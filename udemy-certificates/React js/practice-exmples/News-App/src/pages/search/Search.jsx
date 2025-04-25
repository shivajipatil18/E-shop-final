import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NewsCard from "../../Components/newscard/NewsCard"
import styles from "../search/Search.module.css"

const Search = () => {
  const [news, setNews] = useState();
  const { state } = useLocation();
  const apikey = process.env.REACT_APP_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?q=${state}&apiKey=${apikey}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setNews(data.articles))
      .catch((error) => console.log(error));
  },[url]);

  return (
    <div className={styles.searchPage}>
      <h1>
        {" "}
         News About : <span>{state}</span>
      </h1>
      <div className={styles.searchnews}>
      {!news && <h1>The searched word did not match </h1>}
      {news && news?.map((items,index)=><NewsCard key={index} {...items}/>)}
      </div>
     
    </div>
  );
};

export default Search;

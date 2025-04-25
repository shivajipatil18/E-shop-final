import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";

const useNews = (initialCategory = "", initialCountry = "us") => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [country, setCountry] = useState(initialCountry);
  const theme = useContext(ThemeContext);

  const apikey = process.env.REACT_APP_API_KEY;
  const baseUrl = "https://newsapi.org/v2/top-headlines";

  const fetchNews = async (country, category) => {
    try {
      setLoading(true);
      const response = await axios.get(baseUrl, {
        params: {
          country,
          category,
          apiKey: apikey,
        },
      });
      setNews(response.data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(country, category);
  }, [category, country, theme.state.darkmode]); // ✅ Correct dependencies

  useEffect(() => {
    setCategory(initialCategory);
    setCountry(initialCountry);
  }, [initialCategory, initialCountry]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filter.trim() === "") return;

    setCountry(filter); // ✅ Updating state
    setFilter(""); // ✅ Clearing input
  };

  return { news, loading, filter, country, theme, setFilter, setCountry, handleSubmit, category };
};

export default useNews;

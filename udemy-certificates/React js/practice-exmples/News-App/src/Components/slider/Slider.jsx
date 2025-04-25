import React, { useState } from "react";
import styles from "./Slider.module.css";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import newsImg from "../../assets/news.jpg";

const Slider = ({ SliderNews }) => {
  const [current, setCurrent] = useState(0); // ✅ Fixed initialization
  const length = SliderNews.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1); 
  };

  if (!Array.isArray(SliderNews) || length <= 0) {
    return null;
  }

  return (
    <div className={styles.slider}>
      <FaArrowAltCircleLeft className={styles.left} onClick={prevSlide} />
      <FaArrowAltCircleRight className={styles.right} onClick={nextSlide} />
      {SliderNews?.map((item, index) => (
        <div key={index}>
          {index === current && (
            <div className={styles.container}>
               <img src={item.urlToImage?item.urlToImage :newsImg} alt="news" className={styles.image} /> 
              <h3>{item.title}</h3>
              <div className={styles.link}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  Detail
                </a>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Slider;

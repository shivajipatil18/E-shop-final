import React from "react";
import styles from "./NewsCard.module.css";
import newsImg from "../../assets/news.jpg";

const NewsCard = ({ title, urlToImage, content, url }) => {
  return (
    <div className={styles.card}>
      <img src={urlToImage ? urlToImage : newsImg} alt="news" />
      <div className={styles.cardDetail}>
        <h3>{title}</h3>
        <p>{content}</p>
        <div className={styles.a}>
          <button>
            {" "}
            <a
              href={url}
              rel="noreferrer"
              target="_blank "
              className={styles.link}
            />
            Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;

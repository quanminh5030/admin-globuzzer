import React, { useState, useEffect } from "react";
import styles from "./Articles.module.css";
import "./Articles.css";
import ArticleCard from "./ArticleCard";
import BlogHeader from "../../../components/TravelBlog/sectionHeader/SectionHeader";
import { ArticleDataDesk } from "../../../assets/Section/Articles/ArticleDataDesk";
import { ArticleDataMobile } from "../../../assets/Section/Articles/ArticleDataMobile";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { GetWindowDimension } from "../../../utils/GetWindowDimension";
import prev from "../../../assets/Section/Articles/prev.svg";
import { render } from "@testing-library/react";
const articlesPerPage = 4;
let arrayForHoldingArticles = [];
const Articles = () => {
  const { width } = GetWindowDimension();

  const ArticlesMobile = () => {
    const [articlesToShow, setArticlesToShow] = useState([]);
    const [next, setNext] = useState(4);

    const loopWithSlice = (start, end) => {
      const slicedArticles = ArticleDataMobile.slice(start, end);
      arrayForHoldingArticles = [...arrayForHoldingArticles, ...slicedArticles];
      setArticlesToShow(arrayForHoldingArticles);
    };

    useEffect(() => {
      loopWithSlice(0, articlesPerPage);
    }, []);

    const showArticlesHandler = () => {
      loopWithSlice(next, next + articlesPerPage);
      setNext(next + articlesPerPage);
    };

    return (
      <div className={styles.mobile}>
        <div className={styles.items}>
          <ArticleCard articlesToRender={articlesToShow} />
        </div>
        <button className={styles.moreBtn} onClick={showArticlesHandler}>
          View More
        </button>
      </div>
    );
  };

  const ArticlesDesk = () => {
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      className: "slider variable-width",
      variableWidth: true,
    };
    return (
      <div className='articles'>
      <Slider
        {...settings}
        className={styles.articles}
      >
        {ArticleDataDesk.map((data) => (
          <div className={styles.eachSlide}>
            <div className={styles.card} key={data.index}>
              <div
                className={styles.top}
                style={{ backgroundImage: `url(${data.img})` }}
              >
                <p className={styles.title}>{data.title}</p>
              </div>

              <div className={styles.bottom}>
                <div className={styles.author}>
                  <img src={data.author} alt="author" className={styles.img} />
                  <p className={styles.name}>{data.name}</p>
                </div>
                <div className={styles.likes}>
                  <img
                    src={data.heart}
                    alt="heart-button"
                    className={styles.heart}
                  />
                  <p className={styles.number}>{data.number}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      </div>

    );
  };
  return (
    <div
      className={styles.wrapper}
      style={{ display: "grid", gridGap: "30px" }}
    >
      <BlogHeader label="Top Articles to see" />
      {width >= 1100 ? <ArticlesDesk /> : <ArticlesMobile />}
    </div>
  );
};

export default Articles;

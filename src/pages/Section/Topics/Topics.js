import React, { useState, useEffect } from "react";
import styles from "./Topics.module.css";
import BlogHeader from "../../../components/TravelBlog/sectionHeader/SectionHeader";
import TopicCard from "./TopicCard";
import { TopicsData } from "../../../assets/Section/Topics/TopicsData";
import arrow from "../../../assets/Section/Topics/arrow-icon.svg";
import { Link } from "react-router-dom";
import { GetWindowDimension } from "../../../utils/GetWindowDimension";
const topicsPerPage = 6;
const topicsPerPageDesk = 9;
let arrayForHoldingTopics = [];
const Topics = () => {
  const { width } = GetWindowDimension();

  const TopicsMobile = () => {
    const [topicsToShow, setTopicsToShow] = useState([]);
    const [next, setNext] = useState(6);

    const loopWithSlice = (start, end) => {
      const slicedTopics = TopicsData.slice(start, end);
      arrayForHoldingTopics = [...arrayForHoldingTopics, ...slicedTopics];
      setTopicsToShow(arrayForHoldingTopics);
    };

    useEffect(() => {
      loopWithSlice(0, topicsPerPage);
    }, []);

    const showTopicsHandler = () => {
      loopWithSlice(next, next + topicsPerPage);
      setNext(next + topicsPerPage);
    };

    return (
      <div className={styles.wrapper}>
        <BlogHeader label="Top Topics to explore" />
        <div className={styles.container}>
          <TopicCard topicsToRender={topicsToShow} />
        </div>
        <button className={styles.moreBtn} onClick={showTopicsHandler}>
          View More
        </button>
        <div className={styles.moreDesk} onClick={showTopicsHandler}>
          <Link className={styles.moreLink}>See more topics</Link>
          <img src={arrow} alt="arrow-icon" className={styles.arrow} />
        </div>
      </div>
    );
  };

  const TopicsDesktop = () => {
    const [topicsToShow, setTopicsToShow] = useState([]);
    const [next, setNext] = useState(9);

    const loopWithSlice = (start, end) => {
      const slicedTopics = TopicsData.slice(start, end);
      arrayForHoldingTopics = [...arrayForHoldingTopics, ...slicedTopics];
      setTopicsToShow(arrayForHoldingTopics);
    };

    useEffect(() => {
      loopWithSlice(0, topicsPerPageDesk);
    }, []);

    const showTopicsHandlerDesk = () => {
      loopWithSlice(next, next + topicsPerPageDesk);
      setNext(next + topicsPerPageDesk);
    };
    return (
      <div className={styles.wrapper}>
        <BlogHeader label="Top Topics to explore" />
        <div className={styles.container}>
          <TopicCard topicsToRender={topicsToShow} />
        </div>
        <button className={styles.moreBtn} onClick={showTopicsHandlerDesk}>
          View More
        </button>
        <div className={styles.moreDesk} onClick={showTopicsHandlerDesk}>
          <Link className={styles.moreLink}>See more topics</Link>
          <img src={arrow} alt="arrow-icon" className={styles.arrow} />
        </div>
      </div>
    );
  };

  return <>{width > 1100 ? <TopicsDesktop /> : <TopicsMobile />}</>;
};

export default Topics;

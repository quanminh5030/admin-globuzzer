import React, { useState, useEffect } from "react";
import FeaturedArticle from "./FeaturedArticle";
import { firestore } from "../../utils/firebase.utils";
import "../../css/Home.css";
import { MdKeyboardArrowRight } from "react-icons/md";

const FeaturedArticlePage = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    firestore
      .collection("articles")
      .orderBy("title")
      .onSnapshot((snapshot) => {
        const newArticle = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArticles(newArticle);
      });
  }, []);
  return (
    <div>
      {articles.map(({ title, ...otherProps }) => (
        <FeaturedArticle key={title} title={title} {...otherProps} />
      ))}
      <div className="featured_articles_more">
        <a
          href="https://globuzzer.mn.co/feed?filters=articles"
          className="featured_articles_more_anchor"
        >
          SEE ALL ARTICLES
        </a>
        <MdKeyboardArrowRight className="featured_articles_more_icon" />
      </div>
    </div>
  );
};

export default FeaturedArticlePage;

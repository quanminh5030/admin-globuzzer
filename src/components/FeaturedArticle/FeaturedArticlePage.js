import React, { useState, useEffect } from "react";
import FeaturedArticle from "./FeaturedArticle";
import { firestore } from "../../utils/firebase.utils";
import "../../css/Home.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import ArticleForm from '../../pages/Admin/ArticleForm/ArticleForm';
const FeaturedArticlePage = () => {
  const [articles, setArticles] = useState([]);
  const [show, setShow] = useState(false);
  const initialArticleState = [
    {id: null, description:"", img:"", title:"", url:""},
  ]
  const [currentArticle, setCurrentArticle] = useState(initialArticleState);
  useEffect(() => {
    const unsubscribe = firestore
      .collection("articles")
      .orderBy("title")
      .onSnapshot((snapshot) => {
        const newArticle = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArticles(newArticle);
      });
      return () => unsubscribe();
  }, []);

  const openEditForm = (data) => {
    setShow(true);
    setCurrentArticle({
      id: data.id,
      description: data.description,
      title: data.title,
      img: data.img,
      url: data.url
    })
  };

  const updateArticle = (({currentArticle}, updatedArticle)=> {
    console.log("it sends item to the updated item function", updatedArticle, currentArticle.id);
    setShow(false);
    firestore.collection('articles').doc(currentArticle.id).update(updatedArticle);
  });

  return (
    <div>
      {articles.map((data) => (
        <FeaturedArticle key={data.id} data={data} editArticle={()=>openEditForm(data)}/>
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
      {show && <div>
        <ArticleForm setShow={setShow} currentArticle={currentArticle} updateArticle={updateArticle}/>
        </div>}
    </div>
  );
};

export default FeaturedArticlePage;

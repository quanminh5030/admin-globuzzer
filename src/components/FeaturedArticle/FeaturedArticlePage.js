import React, { useState, useEffect, useContext } from "react";
import FeaturedArticle from "./FeaturedArticle";
import { firestore, app } from "../../utils/firebase.utils";
import "../../css/Home.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import ArticleForm from '../../pages/Admin/ArticleForm/ArticleForm';
import { sizeTransform } from "../../utils/sizeTransform";
import { EditContext } from "../../contexts/editContext";

const FeaturedArticlePage = () => {
  const { editMode } = useContext(EditContext);
  const [articles, setArticles] = useState([]);
  const [show, setShow] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
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

  //validations
  const typeValidation = ["image/png",  "image/jpeg", "image/jpg"];
  const sizeValidation = 200000;
  const message = (file) => {
    return `The size of the image should be maximum ${sizeTransform(sizeValidation)}, and the format need to be PNG, JPG. You tried to upload a file format: ${file.type}, size: ${sizeTransform(file.size)}`;
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    
    if (file && typeValidation.includes(file.type) && file.size <= sizeValidation) 
    {
      const fileRef = storageRef.child(`articles/${file.name}`);
      await fileRef.put(file);
      setFileUrl(await fileRef.getDownloadURL());
    } else {
      alert(message(file))
    }     
  };

  const onSelectedArticle = (data, article) => {
    return (
      article.id === data.id &&
      editMode && show && <div>
        <ArticleForm 
          setShow={setShow} 
          currentArticle={currentArticle} 
          updateArticle={updateArticle}
          onFileChange={onFileChange}
          fileUrl={fileUrl}  
        />
        </div>
    );
  };

  return (
    <div style={{position: 'relative'}}>
      {articles.map((data, id) => (
        <div key={data.id}>
          <FeaturedArticle 
            data={data} 
            editArticle={()=>openEditForm(data)} 
            // onClick={onSelectedArticle()}
          />
          {onSelectedArticle(data, currentArticle)}
        </div>
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

import React, { useState, useEffect, useContext, Fragment, useRef } from "react";
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
import { firestore, app } from "../../../utils/firebase.utils";
import { EditContext } from "../../../contexts/editContext";
import heart from "../../../assets/Section/Articles/heart-button.svg";
import ArticlesForm from "./ArticlesForm";
import { sizeTransform } from "../../../utils/sizeTransform";

const Articles = ({ cityId }) => {
  const { width } = GetWindowDimension();
  const { editStyle, editMode } = useContext(EditContext)
  const [fileUrl, setFileUrl] = useState(null);
  const [currentCity, setFetchedCurrentCity] = useState({});
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [show, setShow] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({id: "", authImg: '', authName: '', coverImg: '', likes: ''});

  useEffect(() => {
    const getCurrentCity = async () => {
      const doc = await firestore.collection('section_items').doc(cityId).get();
      if (!doc.exists) {
        setLoading(true);
      } else {
        setFetchedCurrentCity(doc.data());
        setArticles(doc.data().articles)
        setLoading(false);
      }
    };
    getCurrentCity();
  }, [cityId, show]);

  const getCurrentArticle = (data) => {
    const article = articles.filter((m) => {
      return m.id === data.id;
    });
    setCurrentArticle(article[0]);
    setShow(true);
  };

  const updateMemberData = (({currentMember}, updatedMember) => {
    // setShowMembersForm(false);
    // firestore.collection('member_near').doc(currentMember.id).update(updatedMember)
  });

  // on form submit, the file url is set in firestore
  const onFileSubmit = async (data) => {
    // const getCollection = firestore.collection('member_near');
    // await getCollection.doc(currentMember.id).set({
    //   img: fileUrl || data.img,
    //   city: data.city,
    //   name: data.name
    // })
    // console.log("file saved:", fileUrl)
    // setShowMembersForm(false);
  }

  // validations for uploaded images
  const typeValidation = ["image/png",  "image/jpeg", "image/jpg"];
  const sizeValidation = 200000;
  const message = (file) => {
    return `The size of the image should be maximum ${sizeTransform(sizeValidation)}, and the format need to be PNG, JPG. You tried to upload a file format: ${file.type}, size: ${sizeTransform(file.size)}`;
  } 
  // manage the upload member picture form + type and size validation
  const onFileChange = async (e) => {
  const file = e.target.files[0];
  const storageRef = app.storage().ref();
  if (file && typeValidation.includes(file.type) && file.size <= sizeValidation) {
    const fileRef = storageRef.child(`section/articles/${file.name}`);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  } else {
    alert(message(file))
  }
}

  const ArticlesMobile = () => {
    return (
      <div className={styles.mobile}>
        <div className={styles.items}>
          Go on desktop for editing
        </div>
        <button className={styles.moreBtn} >
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
      <div className='articles' style={{position: "relative"}}>
      <Slider
        {...settings}
        className={styles.articles}
      >
        {articles.map((data) => (
          <div 
            className={styles.eachSlide}
            key={data.id}
            onClick={() => getCurrentArticle(data)}
          >
            <div className={styles.card} style={editStyle}>
              <div
                className={styles.top}
                style={{ backgroundImage: `url(${data.coverImg})` }}
              >
                <p className={styles.title}>{data.title}</p>
              </div>
              <div className={styles.bottom}>
                <div className={styles.author}>
                  <img src={data.authImg} alt="author" className={styles.img} />
                  <p className={styles.name}>{data.authName}</p>
                </div>
                <div className={styles.likes}>
                  <img
                    src={heart}
                    alt="heart-button"
                    className={styles.heart}
                  />
                  <p className={styles.number}>{data.likes}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      { editMode && 
      <Fragment>
        { show && 
          <ArticlesForm
          currentArticle={currentArticle}
          setShow={setShow}
          // updateMemberData={updateMemberData}
          // onFileSubmit={onFileSubmit}
          // onFileChange={onFileChange}
        />
        }
      </Fragment>
      }
      </div>
    );
  };
  return (
    <div
      className={styles.wrapper}
      style={{ display: "grid", gridGap: "30px" }}
    >
      <BlogHeader label="Top Articles to see" />
      {width >= 1100 ? ArticlesDesk() : ArticlesMobile()}
    </div>
  );
};

export default Articles;

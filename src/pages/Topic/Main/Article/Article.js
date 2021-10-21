import React, { useContext, useEffect, useState } from 'react'
import videos from "./video_articles.module.css";
import { BsSearch } from "react-icons/bs";
import { IconContext } from "react-icons";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { SiSkillshare } from "react-icons/si";
import {
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";
import ArticleCard from './ArticleCard';
import { app, firestore } from '../../../../utils/firebase.utils';
import playButton from '../../../../assets/Topic/Menu/playButton.png';
import Youtube from 'react-youtube';
import Slider from 'react-slick';
import { EditContext, TopicPathContext } from '../../../../contexts/editContext';
import VideoArticleServiceCard from '../../Service/VideoArticleServiceCard';
import { sizeTransform } from '../../../../utils/sizeTransform';
import { useParams } from 'react-router-dom';
import NewServiceCardForm from '../../Service/NewServiceCardForm';
import { sliceData } from '../../../../utils/sliceData';

const Article = () => {
  const { cityId } = useParams();
  const topicName = useContext(TopicPathContext);

  //for edit stuff
  const { editStyle, editMode } = useContext(EditContext);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [currentServiceCard, setCurrentServiceCard] = useState([]);
  const [fileUrl, setFileUrl] = useState('');
  const [userImgUrl, setUserImgUrl] = useState('');
  const [subImg, setSubImg] = useState('');

  //normal states
  const [title, setTitle] = useState('videos');
  const [input, setInput] = useState('')
  const [data, setData] = useState([]);

  const [videoData, setVideoData] = useState([]);
  const [articleData, setArticleData] = useState([]);

  //All videos state
  const [vid, setVid] = useState([]);
  const [video, setVideo] = useState({
    playVideo: false,
    videoId: "",

  });
  const [videoSize, SetVideoSize] = useState(8);
  const [firstVideos, setFirstVideos] = useState([]);
  const [secondVideos, setSecondVideos] = useState([]);

  //All article states
  const [article, setArticle] = useState([]);
  const [articleVideo, setArticleVideo] = useState({
    playVideo: false,
    videoId: "",
  });
  const [articleSize, SetArticleSize] = useState(8);
  const [firstArticles, setFirstArticles] = useState([]);
  const [secondArticles, setSecondArticles] = useState([]);

  //for checking row size when slicing
  const [rowSize, setRowSize] = useState(null);

  //slider state
  const [slideShow, setSlideShow] = useState([]);
  const [showNewServiceForm, setShowNewServiceForm] = useState(false);

  //for youtube
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  //for the right slider article
  const settings = {
    dots: true,
    dotsClass: "slider-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  useEffect(() => {
    getData()
  }, [showServiceForm, showNewServiceForm])

  useEffect(() => {
    const width = window.innerWidth;
    window.addEventListener("resize", handleSize);

    if (width <= 768) {
      SetVideoSize(4);
      SetArticleSize(4);
    }

    //setting rowSize on load
    if (width <= 500) setRowSize(1);
    if (width >= 517 && width < 774) setRowSize(2);
    if (width >= 774 && width < 900) setRowSize(3);
    if (width >= 900 && width < 1014) setRowSize(2);
    if (width >= 1014 && width < 1344) setRowSize(3);
    if (width >= 1344) setRowSize(4);
  }, [cityId]);

  const getData = async () => {
    const doc = await firestore.collection(topicName.admin).doc(cityId).get();

    if (!doc.exists) {
      console.log('no');
    } else {
      setData(doc.data().videoData)
      setVideoData(doc.data().videoData)
      setArticleData(doc.data().articleData)
      setSlideShow(doc.data().news)
    }
  }

  const handleSize = () => {
    //setting rowSize while resized
    const width = window.innerWidth;
    if (width <= 500) setRowSize(1);
    if (width >= 517 && width < 774) setRowSize(2);
    if (width >= 774 && width < 900) setRowSize(3);
    if (width >= 900 && width < 1014) setRowSize(2);
    if (width >= 1014 && width < 1344) setRowSize(3);
    if (width >= 1344) setRowSize(4);

    if (window.innerWidth <= 768) {
      SetVideoSize(4);
      SetArticleSize(4);
      return;
    }

    SetVideoSize(8);
    SetArticleSize(8);
  };

  const slicedData = sliceData(
    data,
    0,
    title === "videos" ? videoSize : articleSize
  );

  const render =
    input.length > 2
      ? data.filter(
        (article) =>
          article.title.toLocaleLowerCase().startsWith(input) ||
          article.title.toLocaleLowerCase().endsWith(input) ||
          article.title.toLocaleLowerCase().includes(input)
      )
      : slicedData;


  const articleLikes = ({ likes }) => {
    if (likes < 1) return "";
    if (likes > 999) {
      const render = likes % 1000;
      if (render > 99) return `${(likes / 1000).toFixed(1)}k`;
      return `${(likes / 1000).toFixed(0)}k`;
    }
    return likes;
  };

  const moreArticle = () => {
    if (title === "videos") {
      let size = videoSize + 4;
      if (videoSize >= data.length) {
        if (window.innerWidth <= 900) size = 4;
        else size = 8;
      }
      return SetVideoSize(size);
    }

    let size = articleSize + 4;

    if (articleSize >= data.length) {
      if (window.innerWidth <= 900) size = 4;
      else size = 8;
    }
    SetArticleSize(size);
  };

  const moreOrLess = () => {
    let render = "more";

    if (title === "videos" && videoSize >= data.length) render = "less";

    if (title === "articles" && articleSize >= data.length) render = "less";

    return `${render} ${title}`;
  };


  const heart = article => {
    const allData = [...data];

    const newArticle = allData.find(d => d.id === article.id);

    if (newArticle.liked) newArticle.likes -= 1;
    else newArticle.likes += 1;

    newArticle.liked = !newArticle.liked;
    setData(allData)

    // firestore.collection(topicName.admin).doc('cityId').update({})
  }

  const showArticle = (art, index) => {

    const arts = [...render];
    let newArts, secondArts;

    let newIndex = index + 1;
    let k = rowSize;
    if (newIndex > rowSize) {
      if (newIndex % rowSize === 0) {
        k = newIndex;
      } else {
        k = Math.floor(newIndex / rowSize) * rowSize + rowSize;
      }
    }
    newArts = arts.slice(0, k);
    secondArts = arts.slice(k);

    if (title === "videos") {
      if (firstVideos.length > 0) {
        const i = arts.indexOf(art);
        if (i > rowSize) {
          if (i % rowSize === 0) {
            k = i;
          } else {
            k = Math.floor(i / rowSize) * rowSize + rowSize;
          }
        }
        newArts = arts.slice(0, k);
        secondArts = arts.slice(k);
      }
      setFirstVideos(newArts);
      setSecondVideos(secondArts);
      setVid([art]);
      setVideo({ playVideo: false, videoId: "" });
      return;
    }

    if (firstArticles.length > 0) {
      const i = arts.indexOf(art);
      if (i > rowSize) {
        if (i % rowSize === 0) {
          k = i;
        } else {
          k = Math.floor(i / rowSize) * rowSize + rowSize;
        }
      }
      newArts = arts.slice(0, k);
      secondArts = arts.slice(k);
    }
    setFirstArticles(newArts);
    setSecondArticles(secondArts);
    setArticle([art]);
    setArticleVideo({ playVideo: false, videoId: "" });
  }

  const articleHover = art => {
    if (title === 'videos' && vid.length > 0) {
      setVid([art]);
      setVideo({ playVideo: false, videoId: '' });
    }

    if (title === "articles" && article.length > 0) {
      setArticle([art]);
      setArticleVideo({ playVideo: false, videoId: "" });
    }
  }

  const originalData = () => {
    const renderData = (
      <ArticleCard
        render={render}
        title={title}
        playButton={playButton}
        articleLikes={articleLikes}
        heart={heart}
        articleHover={articleHover}
        showArticle={showArticle}
        // artRef={artRef}
        setArticle={setArticle}

        editMode={editMode}
        openServiceEditForm={openServiceEditForm}
        onSelectedService={onSelectedService}
        currentServiceCard={currentServiceCard}
      />
    )

    if (title === "videos") {
      if (firstVideos.length < 1) return renderData;
    } else {
      if (firstArticles.length < 1) return renderData;
    }
  }

  const btnStyle = item => {
    if (item === "video") {
      return {
        background: title === "videos" && "#f24b6a",
        color: title === "videos" && "#fff",
      };
    } else {
      return {
        background: title === "articles" && "#f24b6a",
        color: title === "articles" && "#fff",
      };
    }
  }

  const handleClick = ({ target: btn }) => {
    if (btn.innerText.toLocaleLowerCase() === "video") {
      setData(videoData)
      setTitle("videos");
    } else {
      setData(articleData)
      setTitle("articles");
    }
  };

  const closeVid = () => {
    window.innerWidth <= 768 ? SetVideoSize(4) : SetVideoSize(8);
    if (window.innerWidth <= 515) SetVideoSize(4);
    setVid([]);
    setFirstVideos([]);
    setSecondVideos([]);
  };

  const closeVideo = () => {
    if (title === "videos") {
      const newVideo = { ...video };
      newVideo.playVideo = false;
      newVideo.videoId = "";

      return setVideo(newVideo);
    }

    const newVideo = { ...articleVideo };
    newVideo.playVideo = false;
    newVideo.videoId = "";

    setArticleVideo(newVideo);
  };

  const closeArticle = () => {
    window.innerWidth <= 768 ? SetArticleSize(4) : SetArticleSize(8);
    setArticle([]);
    setFirstArticles([]);
    setSecondArticles([]);
  }

  const onReady = (e) => {
    e.target.playVideo();
  };

  const playVideo = ({ videoId }) => {
    console.log(title)
    if (title === "videos") {
      console.log('video')
      console.log(title)
      const newVideo = { ...video };
      newVideo.playVideo = true;
      newVideo.videoId = videoId;

      return setVideo(newVideo);
    }

    const newVideo = { ...articleVideo };
    newVideo.playVideo = true;
    newVideo.videoId = videoId;

    setArticleVideo(newVideo);
  };


  //for edit functions
  const openServiceEditForm = item => {
    setShowServiceForm(true);

    if (item.article) {
      setCurrentServiceCard({
        id: item.id,
        title: item.title,
        imgPath: item.imgPath,
        name: item.name,
        likes: item.likes,
        userImg: item.userImg,
        link: item.link,
        article: item.article,
      })
    } else {
      setCurrentServiceCard({
        id: item.id,
        title: item.title,
        imgPath: item.imgPath,
        name: item.name,
        likes: item.likes,
        userImg: item.userImg,
        link: item.link,
      })
    }
  }

  const openNewServiceForm = item => {
    setShowNewServiceForm(true);

    setCurrentServiceCard({
      id: item.id,
      image: item.image,
      link: item.link,
      text: item.text
    })
  }

  const onSelectedNewService = () => {
    return (
      (showNewServiceForm && editMode) ?
        <div>
          <NewServiceCardForm
            title='News'
            uploadLabel='Image'
            uploadDescription=' (Image has to be below 200 KB and PNG/JPG format) '
            setShow={setShowNewServiceForm}
            currentFeatureCard={currentServiceCard}
            updateFeatureCard={updateNewCard}
            onFileChange={onFileChange}
          />
        </div>
        : undefined
    )
  }

  const onSelectedService = (item) => {
    return (
      (showServiceForm && editMode) ?
        <div>
          <VideoArticleServiceCard
            title={title}
            uploadLabel='Cover Image'
            textLabel='Title'
            uploadDescription=' (The image has to be below 200 KB and PNG/JPG format) '
            setShow={setShowServiceForm}
            currentFeatureCard={currentServiceCard}
            updateFeatureCard={updateServiceCard}
            onFileChange={onFileChange}
          />
        </div>
        : undefined
    )
  }

  const updateNewCard = updatedCard => {
    const updatedNews = slideShow.map(slide => slide.id === updatedCard.id ? { ...updatedCard, image: fileUrl || updatedCard.image } : slide)

    setUserImgUrl('');
    setFileUrl('');

    return firestore.collection(topicName.admin).doc(cityId).update({
      news: updatedNews
    })
  }


  const updateServiceCard = updatedCard => {
    const newVideoId = updatedCard.link.split('=')[1].split('&')[0];

    if (!updatedCard.article) {
      const updatedVideos = videoData.map(video =>
        video.id === updatedCard.id ? { ...updatedCard, imgPath: fileUrl || updatedCard.imgPath, userImg: userImgUrl || updatedCard.userImg, videoId: newVideoId } : video
      );
      setUserImgUrl('');
      setFileUrl('');

      return firestore.collection(topicName.admin).doc(cityId).update({
        videoData: updatedVideos
      })
    }

    else {
      const updatedArticles = articleData.map(article =>
        article.id === updatedCard.id ? { ...updatedCard, imgPath: fileUrl || updatedCard.imgPath, userImg: userImgUrl || updatedCard.userImg, videoId: newVideoId, [article.article.img.path]: subImg } : article
      );
      setUserImgUrl('');
      setFileUrl('');

      return firestore.collection(topicName.admin).doc(cityId).update({
        articleData: updatedArticles
      })
    }
  }


  //image handling stuff
  const typeValidation = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
  const sizeValidation = 200000;
  const message = (file) => {
    return `The size of the image should be maximum ${sizeTransform(sizeValidation)}, and the format need to be PNG, JPG. You tried to upload a file format: ${file.type}, size: ${sizeTransform(file.size)}`;
  }

  const onFileChange = async (e) => {
    const imgName = e.target.name;

    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    if (file && typeValidation.includes(file.type) && file.size <= sizeValidation) {
      const fileRef = storageRef.child(`topic/accomodation/${file.name}`);
      await fileRef.put(file);
      if (title === 'videos') {
        console.log('from videos')
        imgName === 'imgPath' ?
          setFileUrl(await fileRef.getDownloadURL()) :
          setUserImgUrl(await fileRef.getDownloadURL())
      } else {
        console.log('from article', imgName)
        imgName === 'imgPath' && setFileUrl(await fileRef.getDownloadURL());
        imgName === 'userImg' && setUserImgUrl(await fileRef.getDownloadURL());
        imgName === 'subImg' && setSubImg(await fileRef.getDownloadURL());
      }
    } else {
      alert(message(file))
    }
  }

  return (
    <section className={videos.article}>
      <div className={videos.articleLeft}>
        <div className={videos.btnGroup}>
          <button
            className={`${videos.btn} ${videos.btnVid}`}
            onMouseOver={handleClick}
            style={btnStyle("video")}
          >
            Video
          </button>

          <button
            className={`${videos.btn} ${videos.btnArt}`}
            onMouseOver={handleClick}
            style={btnStyle("article")}
          >
            Article
          </button>
        </div>

        <div className={videos.search}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Search ${title} here...`}
            id="search_input"
          />

          <IconContext.Provider value={{ className: "a-search" }}>
            <BsSearch className={videos.searchIcon} />
          </IconContext.Provider>
        </div>

        {/* original data */}
        <div className={videos.articleCardContainer}>
          {originalData()}

        </div>

        {/*Fist Articles after click */}
        <div className={videos.articleCardContainer}>
          <ArticleCard
            render={title === "videos" ? firstVideos : firstArticles}
            // artRef={artRef}
            articleHover={articleHover}
            showArticle={showArticle}
            playButton={playButton}
            title={title}
            heart={heart}
            articleLikes={articleLikes}
          />
        </div>

        {!video.playVideo && title === 'videos' && vid.map(v =>
          <div className={videos.vid} key={v.id}>
            <img src={v.imgPath} alt='img' id={videos['vidImg']} />
            <div className={videos.playVid} onClick={() => playVideo(v)}>
              <img src={playButton} alt='playButton' id={videos['playVid']} />
            </div>

            <div onClick={closeVid}>
              <IconContext.Provider value={{ className: " vidClose" }}>
                <AiOutlineCloseCircle className={videos.vidClose} />
              </IconContext.Provider>
            </div>
          </div>
        )}

        {title === "videos" && video.playVideo && (
          <div className={videos.video}>
            <span
              onClick={closeVideo}
            >
              <IconContext.Provider value={{ className: "icon" }}>
                <AiOutlineCloseCircle className={videos.icon} />
              </IconContext.Provider>
            </span>
            <Youtube videoId={video.videoId} opts={opts} onReady={onReady} />
          </div>
        )}


        {/* article */}
        {title === "articles" && articleVideo.playVideo && (
          <div className={videos.video}>
            <span onClick={closeVideo}>
              <IconContext.Provider value={{ className: "icon" }}>
                <AiOutlineCloseCircle className={videos.icon} />
              </IconContext.Provider>
            </span>
            <Youtube
              videoId={articleVideo.videoId}
              opts={opts}
              onReady={onReady}
            />
          </div>
        )}

        {!articleVideo.playVideo &&
          title === "articles" &&
          article.map((a) => (
            <div className={videos.helsinki} key={a.id}>
              <div className={videos.helsinkileft}>
                <img src={a.article.img.path} alt="helsinki" id={videos['helsinki']} />

                <div className={videos.helsinkidesc}>
                  <span onClick={() => playVideo(a)}>
                    <img src={playButton} alt="playButton" id={videos['play']} />
                  </span>

                  <p>{a.article.img.title}</p>

                </div>
              </div>

              <div className={videos.helsinkiright}>
                <header>
                  <p>{a.title}</p>
                  <p onClick={closeArticle}>
                    <IconContext.Provider
                      value={{ className: "icon helsinki-close" }}
                    >
                      <AiOutlineCloseCircle />
                    </IconContext.Provider>
                  </p>
                </header>

                <div className={videos.para}>
                  <p>{a.article.content}</p>
                </div>

                <div className={`${videos.listmore} ${videos.listMoreArticle}`}>
                  <a href={a.article.articleLink}>
                    View more details{" "}
                    <IconContext.Provider
                      value={{ className: "icon arrow-right" }}
                    >
                      <IoIosArrowForward />
                    </IconContext.Provider>
                  </a>

                  <p>
                    share this video
                    <IconContext.Provider
                      value={{ className: "icon share article-share" }}
                    >
                      <SiSkillshare className={videos.share} />
                    </IconContext.Provider>
                  </p>
                </div>

                {/*Second Articles after click*/}
                <div className={videos.articleCardContainer}>
                  <ArticleCard
                    render={title === "videos" ? secondVideos : secondArticles}
                    // artRef={artRef}
                    articleHover={articleHover}
                    showArticle={showArticle}
                    setArticle={setArticle}
                    playButton={playButton}
                    title={title}
                    heart={heart}
                    articleLikes={articleLikes}
                  />
                </div>

                <div className={videos.moreArticles} onClick={moreArticle}>
                  <p>
                    <IconContext.Provider value={{ className: "arrow-down" }}>
                      {moreOrLess().includes("less") ? (
                        <IoIosArrowUp className={videos.arrowDown} />
                      ) : (
                        <IoIosArrowDown className={videos.arrowDown} />
                      )}
                    </IconContext.Provider>
                    {moreOrLess()}
                  </p>

                  <p>
                    see more{" "}
                    <IconContext.Provider value={{ className: "arrow-down" }}>
                      <IoIosArrowDown />
                    </IconContext.Provider>
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>


      {/* article right  */}
      <div
        className={videos.articleRight}
      >
        <div
          className={videos.articleRightTop}
          style={{ ...editStyle }}
        >
          <Slider {...settings}>
            {slideShow.map((s) => (
              <div
                className={videos.slide} key={s.id}
                onClick={editMode ? () => openNewServiceForm(s) : () => window.open(s.link, '_blank')}
              >
                <img src={s.image} alt="mask" />
                <div className={videos.slideItems}>
                  <p>{s.text}</p>
                  {window.innerWidth <= 900 && <p>{s.text}</p>}
                </div>
              </div>
            ))}
          </Slider>

          <div>
            {onSelectedNewService()}
          </div>
        </div>

        <div className={videos.articleRightBottom}>
          <header>What are you looking for ?</header>

          <div className={videos.articleRightForm}>
            <select>
              <option>Discover Helsinki</option>
            </select>

            <p className={videos.formselect}>
              <IconContext.Provider value={{ className: "dropIcon" }}>
                <TiArrowSortedDown />
              </IconContext.Provider>
            </p>
          </div>

          <div className={videos.articleRightForm}>
            <select>
              <option>Topic: Accomodation</option>
            </select>

            <p className={videos.formselect}>
              <IconContext.Provider value={{ className: "dropIcon" }}>
                <TiArrowSortedDown />
              </IconContext.Provider>
            </p>
          </div>

          <div className={videos.articleRightForm}>
            <input type="text" placeholder="Search anything you want" />
            <p className={videos.formsearch}>
              <IconContext.Provider value={{ className: "search-icon" }}>
                <BsSearch />
              </IconContext.Provider>
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Article

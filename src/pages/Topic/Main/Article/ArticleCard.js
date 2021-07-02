import React, { useContext } from "react";
import videos from "./video_articles.module.css";
import { IconContext } from "react-icons";
import { RiShareForwardBoxFill } from "react-icons/ri";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { EditContext } from "../../../../contexts/editContext";

const ArticleCard = ({
  render,
  artRef,
  articleHover,
  showArticle,
  playButton,
  title,
  heart,
  articleLikes,
  openServiceEditForm,
  onSelectedService,
  currentServiceCard
}) => {

  const { editMode, editStyle } = useContext(EditContext);

  return render.map((article, index) => (
    <>
      <div
        className={!editMode ? videos.articleCard : videos.articleCardEdit}
        key={article.id}
        onMouseOver={() => articleHover(article)}
        style={{...editStyle}}
      // ref={artRef}

      >
        <span
          onClick={() => {
            !editMode ?
              showArticle(article, index)
              : openServiceEditForm(article)
          }}
        >
          <img src={article.imgPath} alt={article.title} id="article-card-img" />
        </span>
        <IconContext.Provider value={{ className: "forward" }}>
          <RiShareForwardBoxFill className={videos.forward} />
        </IconContext.Provider>

        <div
          className={videos.play}
          style={{ display: title === "videos" && "block" }}
          onClick={() => showArticle(article, index)}
        >
          <img src={playButton} alt="playButton" className={videos.playImg} />
        </div>

        <div className={videos.desc}>
          <header>{article.title}</header>

          <div className={videos.descItems}>
            <div className={videos.descLeft}>
              <img src={article.userImg} alt={article.title} id="article-card-img" style={{ width: 40 }} />
              <p>{article.name}</p>
            </div>

            <div className={videos.descRight}>
              <span
                onClick={() => heart(article)}
              >
                {article.liked ? (
                  <IconContext.Provider value={{ className: "heart" }}>
                    <BsHeartFill className={videos.heart} />
                  </IconContext.Provider>
                ) : (
                  <IconContext.Provider value={{ className: "heart" }}>
                    <BsHeart className={videos.heart} />
                  </IconContext.Provider>
                )}
              </span>
              {articleLikes(article)}

            </div>
          </div>
        </div>

        {currentServiceCard && (article.id == currentServiceCard.id) ?
          <div>
            {onSelectedService(article)}
          </div>
          : undefined
        }
      </div>

    </>
  ));
}

export default ArticleCard

import React, { useContext, useRef, useState } from 'react';
import './styles.css';
import PlayVideo from './PlayVideo';
import { IconContext } from "react-icons";
import { AiOutlineCloseCircle, AiOutlinePlayCircle } from "react-icons/ai";
import DeleteVideo from '../../pages/Section/TopVideos/DeleteVideo';
import { EditContext } from '../../contexts/editContext';

const CarouselCard = (props) => {
  const {
    item,
    currentSlide,
    slideIndex,
    videos,
    cityId,
    showDeleteForm,
    setShowVideoForm
  } = props;
  const [playVideo, setPlayVideo] = useState(false);
  const videoFrameRef = useRef();
  const { editMode } = useContext(EditContext);

  const initialState = {
    video: null,
    play: false
  };
  const [about, setAbout] = useState(initialState);

  const playMe = () => {
    const target = videoFrameRef.current;
    return target.classList.remove('video-disabled');
  };

  const closeMe = () => {
    setAbout(initialState);
    const target = videoFrameRef.current;
    return target.classList.add('video-disabled')
  };

  const centerStyle = () => {
    if (currentSlide === slideIndex) {
      return {
        transform: 'scale(1.08)',

      }
    }
  };

  return (
    <>
    <div className="slider center">
     <div className="slide" style={centerStyle()}>
       {editMode && 
        <DeleteVideo
          item={item}
          videos={videos}
          cityId={cityId}
          showDeleteForm={showDeleteForm}
          setShowVideoForm={setShowVideoForm}
        />
        }
        <p>{item.text}</p>
        <div 
        className="cl"
        style={{backgroundImage: `linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.5)), url(${item.coverImg})`}}
        >
          <div className="video-frame video-disabled" ref={videoFrameRef}>
      <div className="video-player" id="video-player">
        <p onClick={closeMe}>
          <IconContext.Provider value={{ className: "gr-close" }}>
            <AiOutlineCloseCircle />
          </IconContext.Provider>
        </p>
          <PlayVideo video={about.video}  />
      </div>
    </div>
          <div className="flexbox-centering"> 
            <div onClick={() => {setAbout({video: item.url, play: true}); playMe()} }>
              <AiOutlinePlayCircle />
            </div>
          </div>
        </div>
        <p>" "</p>
      </div>
    </div>
    </>
  );
};

export default CarouselCard;
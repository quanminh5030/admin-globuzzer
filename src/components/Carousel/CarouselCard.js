import React, { useRef, useState } from 'react';
import './styles.css';
import PlayVideo from './PlayVideo';
import { IconContext } from "react-icons";
import { AiOutlineCloseCircle, AiOutlinePlayCircle } from "react-icons/ai";

const CarouselCard = ({ item, currentSlide, slideIndex }) => {
  const [playVideo, setPlayVideo] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState('');
  const videoFrameRef = useRef();

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
        transform: 'scale(1.09)',

      }
    }
  };

  return (
    <>
    <div className="slider center">
     <div className="slide" style={centerStyle()}>
        <p>{item.name}</p>
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
      </div>
    </div>
    </>
  );
};

export default CarouselCard;
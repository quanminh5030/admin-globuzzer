import React, { useRef, useState } from 'react';
import PlayVideo from './PlayVideo';
import { IconContext } from "react-icons";
import { AiOutlineCloseCircle } from "react-icons/ai";

const CarouselCard = ({ item }) => {
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

  return (
    <>
    <div className="slider center">
     <div className="slide">
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
              <i className="fa fa-play-circle"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CarouselCard;
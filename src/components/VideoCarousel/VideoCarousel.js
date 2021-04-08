import React, { useState } from "react";
import ReactPlayer from "react-player";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./style.css";
import {GoPlay} from 'react-icons/go'


const VideoCarousel = ({videos, editMode, editStyle, getCurrentVideo}) => {

  const YoutubeSlide = (data) => {
    console.log(data)
  return (
    <ReactPlayer url={data.url} width="100%" height="540px"/>
  );
  };
    const settings = {
    // className: "center",
    centerMode: true,
    centerPadding: '80px',
    slidesToShow: 3,
    focusOnSelect:true,
    dots: true,
    infinite: true,
    responsive: [
      {
      breakpoint: 768,
      settings: {
          dots: true,
          infinite: true,
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3,
      }
      },
      {
      breakpoint: 480,
      settings: {
          dots: true,
          infinite: true,
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
      }
      }
    ]
    };

    // const settings = {
    //   className: "center slider variable-width",
    //   centerMode: true,
    //   infinite: true,
    //   centerPadding: "90px",
    //   slidesToShow: 3,
    //   speed: 500,
    //   swipeToSlide: true,
    // };
    const hideTitle = (e, data) => {
      console.log(e.target, data)
    };
  return (
    <div className="video">
      <Slider 
      {...settings}
      >
      {videos.map((videoData) => (
        <div key={videoData.id}>
          <p className="videoTitle">{videoData.text}</p> 
          {/* <div 
              class="flexbox-centering" 
              style={{ backgroundImage: `linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.5)), url(${videoData.coverImg})`, ...editStyle }}
          >
              <GoPlay onClick={() => YoutubeSlide(videoData)} />
          </div> */}
          <ReactPlayer light={videoData.coverImg} url={videoData.url} width="100%" height="269px" />
        </div>
      ))}
    </Slider>
    </div>
      
  );
};
export default VideoCarousel;
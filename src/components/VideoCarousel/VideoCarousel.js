import React from "react";
import {Carousel} from "react-responsive-carousel";
import ReactPlayer from "react-player";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style.css";

const videos = [
    {
        id: 1,
        url: "https://www.youtube.com/embed/mOdmi9SVeWY",
        description: "empty"
    },
    {
        id: 1,
        url: "https://www.youtube.com/embed/mOdmi9SVeWY",
        description: "empty"
    },
    {
        id: 1,
        url: "https://www.youtube.com/embed/mOdmi9SVeWY",
        description: "empty"
    }
];
const YoutubeSlide = (props) => {
    const {videoData} = props;
    const {id, url, description} = videoData;
    return (
        <div>
            <ReactPlayer url={url} width="100%" height="540px" key={id} />
            <p className="legend">{description}</p>
        </div>
    );
};
export const VideoCarousel = () => (
    <Carousel showArrows={false} className="carousel_container" showThumbs={false}>
        {videos.map((videoData, index) => (
            <YoutubeSlide videoData={videoData} key={index} />
        ))}
    </Carousel>
);

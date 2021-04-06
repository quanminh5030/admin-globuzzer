import React, { useRef } from "react";
import {Carousel} from "react-responsive-carousel";
import ReactPlayer from "react-player";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style.css";

const YoutubeSlide = (props) => {
    const {videoData, key, editMode, editStyle, getCurrentVideo } = props;
    const { url, text, coverImg, id } = videoData;
    return (
        <div style={editStyle} onClick={() => getCurrentVideo(id)}>
            <ReactPlayer url={url} width="100%" height="540px" key={key} />
            <p className="legend">{text}</p>
        </div>
    );
};
export const VideoCarousel = ({videos, editMode, editStyle, getCurrentVideo}) => {

    return (
        <Carousel 
            showArrows={false} 
            className="carousel_container" 
            showThumbs={false}
            dynamicHeight={true}
        >
        {videos.map((videoData) => (
            <div>
                <YoutubeSlide videoData={videoData} key={videoData.id} editMode={editMode} editStyle={editStyle} getCurrentVideo={getCurrentVideo}/>
            </div>
        ))}
    </Carousel>
    );

};

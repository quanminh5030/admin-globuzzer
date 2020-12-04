import React from "react";
import "./style.css";
import {AiFillPlayCircle} from "react-icons/ai";
import {GetWindowDimension} from "../../../../utils/GetWindowDimension";

const Mobile = () => (
    <section className="own_header">
        <p id="own_header_title">START YOUR TRAVEL BLOG WITH GLOBUZZER</p>
        <p id="own_header_description">
            Everything you need to begin sharing your travel experiences, reach a broader audience
            and gain profit
        </p>

        <div className="own_video_container">
            <video
                width="100%"
                autoPlay
                loop
                poster="https://www.mightynetworks.com/wp-content/themes/_mn2018/img/video-home-page-poster-new.png"
                className="own_video"
            >
                <source
                    src="https://www.mightynetworks.com/wp-content/uploads/2019/04/HomePageVideoOptimized-1.mp4"
                    type="video/mp4"
                />
                <track kind="captions" />
            </video>
        </div>
        <button type="button" className="own_button_start">
            Get started
        </button>
    </section>
);
const Desktop = () => (
    <section className="own_header">
        <div className="own_header_text_container">
            <p id="own_header_title">START YOUR TRAVEL BLOG WITH GLOBUZZER</p>
            <p id="own_header_description">
                Everything you need to begin sharing your travel experiences, reach a broader
                audience and gain profit
            </p>
            <div className="own_header_buttons_container">
                <button type="button" className="own_button_start">
                    Get started
                </button>
                <div id="own_watch_demo_button">
                    <AiFillPlayCircle id="own_watch_demo_icon" />
                    <p>Watch the demo</p>
                </div>
            </div>
        </div>
        <div className="own_video_container">
            <video
                width="100%"
                autoPlay
                loop
                poster="https://www.mightynetworks.com/wp-content/themes/_mn2018/img/video-home-page-poster-new.png"
                className="own_video"
            >
                <source
                    src="https://www.mightynetworks.com/wp-content/uploads/2019/04/HomePageVideoOptimized-1.mp4"
                    type="video/mp4"
                />
                <track kind="captions" />
            </video>
        </div>
    </section>
);
export const Header = () => {
    const {width} = GetWindowDimension();
    return <>{width >= 1100 ? <Desktop /> : <Mobile />}</>;
};

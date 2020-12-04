import React from "react";
import "./style.css";
import {AiOutlineHeart} from "react-icons/ai";

export const PricingWhyContent = ({content}) => (
    <div className="why_content_container">
        <div style={{backgroundImage: `url(${content})`}} className="content_img" />
        <p className="content_title">Helsinki design district</p>
        <div className="content_info_container" id="content_bottom">
            <p className="content_name">sofia</p>
            <div className="content_info_container_2">
                <AiOutlineHeart className="content_icon" />
                <p className="content_name">15K</p>
            </div>
        </div>
    </div>
);

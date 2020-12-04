import React from "react";
import "./style.css";

export const HomeValue = (props) => {
    const {
        src, alt, imgCaption, imgDescription
    } = props;
    return (
        <div className="home_value">
            <img src={src} alt={alt} className="value_img" type="image/svg+xml" />
            <div>
                <p className="value_caption">{imgCaption}</p>
                <p className="value_description">{imgDescription}</p>
            </div>
        </div>
    );
};

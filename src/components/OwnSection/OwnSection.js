import React from "react";
import logo from "../../assets/Footer/globe 1.svg";
import "./style.css";

export const OwnSection = () => (
    <div className="own_section_container">
        <img alt="logo" src={logo} className="gb_logo" />
        <div>
            <p id="own_title">
                Become a part of our global community!
                <br /> Apply to start your own travel blog
            </p>

            <a href="https://globuzzer.com/travel-blog.php" id="start_own_now" className="button_submit">
                Start now
            </a>
        </div>
    </div>
);

import React from "react";
import "./style.css";
import {IoIosArrowDropright} from "react-icons/io";

export const Blogger = (props) => {
    const {blogger} = props;
    const {
        ava, name, detail, citySection
    } = blogger;
    return (
        <div className="blogger_container">
            <img src={ava} alt="ava" className="blogger_ava" />
            <p id="blogger_name">{name}</p>
            <p id="blogger_detail">{detail}</p>
            <button type="button" className="blogger_to_section_button">
                See {citySection} section
                <IoIosArrowDropright className="blogger_to_section_button_icon" />
            </button>
        </div>
    );
};

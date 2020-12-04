import React from "react";
import "./style.css";

export const SectionHeader = (props) => {
    const {header} = props;
    return (
        <>
            <p className="header_text">{header}</p>
            <div className="divider" />
        </>
    );
};

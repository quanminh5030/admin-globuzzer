import React from "react";
import "./style.css";

export const MemberNearYou = (props) => {
    const {memberData} = props;
    const {name, img} = memberData;
    return (
        <div className="member_container">
            <img src={img} alt="member_ava" className="member_near_ava" />
            <p>{name}</p>
        </div>
    );
};

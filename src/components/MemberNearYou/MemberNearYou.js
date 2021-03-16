import React from "react";
import "./style.css";

export const MemberNearYou = (props) => {
    const { memberData, getCurrentMember } = props;
    const { name, img, id } = memberData;
    return (
        <div className="member_container" onClick={getCurrentMember}>
            <img src={img} alt="member_ava" className="member_near_ava" id={id} />
            <p>{name}</p>
        </div>
    );
};

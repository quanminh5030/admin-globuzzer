import React from "react";
import styles from "./MemberCard.module.css";

export const MemberCard = (props) => {
    const {memberData} = props;
    const {name, img} = memberData;
    return (
        <div className={styles.container}>
            <img src={img} alt="member-ava" className={styles.img} />
            <p>{name}</p>
        </div>
    );
};

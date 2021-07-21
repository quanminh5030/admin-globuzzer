import React, { useRef } from "react";
import styles from "./Members.module.css";

export const MemberCard = ({ memberData, getCurrentMember }) => {
    const memberRef = useRef();
    return (
        <div className={styles.memberContainer} onClick={() => getCurrentMember(memberRef)} ref={memberRef} id={memberData.id}>
            <img src={memberData.image} alt="ava" className={styles.ava} />
            <p className={styles.name}>{memberData.name}</p>
            <p className={styles.city}>{memberData.flags}</p>
        </div>
    );
};

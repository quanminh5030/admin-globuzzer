import React from "react";
import styles from "./RelatedInfo.module.css";

const RelatedInfo = ({text}) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default RelatedInfo;

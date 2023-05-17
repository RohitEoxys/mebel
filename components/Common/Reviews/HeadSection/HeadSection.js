import React from "react";
import styles from "./HeadSection.module.scss";

const HeadSection = ({ reviews }) => {
  return (
    <div className={styles["alrvwhdng"]}>
      <div className={styles["alrvwhdr"]}>All Reviews</div>
      <div className={styles["alrvwnm"]}>({reviews} Reviews)</div>
    </div>
  );
};

export default HeadSection;

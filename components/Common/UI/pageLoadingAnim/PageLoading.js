import React from "react";
import styles from "./pageLoading.module.scss";

const PageLoading = () => {
  return (
    <div className={styles["loading-container"]}>
      <div className={styles["loading"]}></div>
      <div id={styles["loading-text"]}>loading</div>
    </div>
  );
};

export default PageLoading;

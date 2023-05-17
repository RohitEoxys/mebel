import React from "react";
import styles from "./Loader.module.scss";

const LoaderSpiner = () => {
  return (
    <div className={styles["loading"]}>
      <span className={styles["loader"]}></span>
    </div>
  );
};

export default LoaderSpiner;

import React from "react";
import styles from "./switchbtn.module.scss";

const SwitchBtn = () => {
  return (
    <label htmlFor="next-switch" className={styles["switch"]}>
      <input
        type="checkbox"
        id="next-switch"
        className={styles["switch-input"]}
      />
      <span
        className={styles["switch-label"]}
        data-on="On"
        data-off="Off"
      ></span>
      <span className={styles["switch-handle"]}></span>
    </label>
  );
};

export default SwitchBtn;

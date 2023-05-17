import React from "react";
import styles from "./Template2.module.scss";

const Template2 = () => {
  return (
    <div className={styles["tmplt"]}>
      <div className={styles["nm_ptnt"]}>Hello Rohit Kumar</div>
      <div className={styles["apnt_dt"]}>
        your appointment is successfully done
      </div>
      <div className={styles['al_dtls']}>Your All details </div>
    </div>
  );
};

export default Template2;

import React from "react";
import styles from "./NameAndDetails.module.scss";

const NameAndDetails = () => {
  let data = {
    name: "Rohit",
    Age: 25,
    Sex: "Male",
    Dte: "12 sept 2022",
  };
  return (
    <div className={styles["nm_dtls"]}>
      <div className={styles["nm_dtls_sc1"]}>
        <div className={styles["ttl"]}>Name</div>
        <div className={styles["smcln"]}>:</div>
        <div className={styles["dta"]}>{data.name}</div>
      </div>
      <div className={styles["nm_dtls_sc1"]}>
        <div className={styles["age"]}>
          <div className={styles["ttl"]}>Age</div>
          <div className={styles["smcln"]}>:</div>
          <div className={styles["dta"]}>{data.Age}</div>
        </div>
        <div className={styles["gndr"]}>
          <div className={styles["ttl"]}>Sex</div>
          <div className={styles["smcln"]}>:</div>
          <div className={styles["dta"]}>{data.Sex}</div>
        </div>
      </div>
      <div className={styles["nm_dtls_sc1"]}>
        <div className={styles["ttl"]}>Date:</div>
        <div className={styles["smcln"]}>:</div>
        <div className={styles["dta"]}>{data.Dte}</div>
      </div>
    </div>
  );
};

export default NameAndDetails;

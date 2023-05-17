import React from "react";
import styles from "./bodybarcard.module.scss";
import Image from "next/image";

const BodybarCard = (props) => {
  return (
    <div className={styles["msg_crd"]}>
      <div className={styles["hr_dt"]}>
        <div className={styles["hr_ln"]}></div>
        <div className={styles["dt_sec"]}>Today</div>
        <div className={styles["hr_ln"]}></div>
      </div>

      <div className={styles["bd_br_crd"]}>
        <div className={styles["crd"]}>
          <div className={styles["img_sec"]}>
            <div className={styles["img"]}>
              <Image src={props?.data1?.item?.img} />
            </div>
          </div>
          <div className={styles["nm_tm_sc"]}>
            <div className={styles["name"]}>{props?.data1?.item?.name}</div>
            <div className={styles["tme"]}>{props?.data1?.item?.Time}</div>
          </div>
        </div>
      </div>
      <div className={styles["disply_msg"]}>{props?.data1?.item?.msg}</div>
    </div>
  );
};

export default BodybarCard;

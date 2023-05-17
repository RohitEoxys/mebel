import React from "react";
import styles from "./Card.module.scss";
import Image from "next/image";
import Images from "@/components/Images/Images";

const Card = (props) => {
 
  for(var i=0;i<=Number(Object.values.length);i++){
      return (
        <div className={styles["card"]}>
        <div className={styles["crd_hdr"]}>{Object.values(props.data.at(i))}</div>
        <div className={styles["crd_dta"]}>
          <div className={styles["pdf_img"]}>
            <Image src={Images.pdf} />
          </div>
          <div className={styles['crd_nm']}>{Object.values(props.data.at(i))}</div>
          <div>
            <Image src={Images.download} />
          </div>
        </div>
      </div>
      )
  }
 
};

export default Card;

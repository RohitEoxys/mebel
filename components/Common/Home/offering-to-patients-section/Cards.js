// import Image from "next/image";
// import React from "react";

import styles from "./Cards.module.scss";

const Cards = ({ title, subTitle, imagePath }) => {
  return (
    <div className={styles[""]}>
      {/* <div className={styles["main_container_content"]}> */}
        {/* <div className={styles["card_img_div"]}>
          <Image src={imagePath} alt="cardimg" />
        </div> */}
        {/* <h3>{title}</h3> */}
        {/* <h6>{subTitle}</h6> */}
      {/* </div> */}
    </div>
  );
};

export default Cards;

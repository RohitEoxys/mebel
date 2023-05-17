import React from "react";

import styles from "./card.module.scss";

const Card = (props) => {
  return (
    <div
      className={` row justify-content-center  ${styles["card_container"]} ${props.className}`}
      style={props.style}
    >
      <div className={`col-12`}>{props.children}</div>
    </div>
  );
};

export default Card;

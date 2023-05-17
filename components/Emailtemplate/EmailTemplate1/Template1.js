import React from "react";
import styles from "./Template1.module.scss";
import Image from "next/image";
import Images from "@/components/Images/Images";
import Card from "./Card/Card";

const Template1 = () => {
  const data =[
    {cardName: "Prescription Report"},
  {cardName:'Certificate'}
] 
  return (
    <div className={styles["tmp_lt_1"]}>
      <div className={`mt-3 ${styles["grn_tck"]}`}>
        <Image src={Images.greenCheckMark} />
      </div>
      <div className={styles["thnk_u"]}>Thank You</div>
      <div className={styles["thnks_fr_vst"]}>Thanks For The Visit</div>
      <div className={styles["msg_dt"]}>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout.
      </div>
      <div className={styles["card_prt"]}>
        <Card data={data} />  
      </div>
      <div className={styles['rvw_btn']}>Leave Review</div>
    </div>
  );
};

export default Template1;

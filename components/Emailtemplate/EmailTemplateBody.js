import React from "react";
import styles from "./EmailTemplate.module.scss";
import Image from "next/image";
import Images from "../Images/Images";
import Template1 from "./EmailTemplate1/Template1";


const EmailTemplateBody = () => {
  
  return (
    <div className={styles["email_tmp_design"]}>
      <div className={styles["orng_bg"]}>
        <div className={styles["logo_ml_tmp"]}>
          <Image src={Images.Home_logo} />
        </div>
        <div className={styles["upr_bg_dt"]}>
    <Template1/>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateBody;

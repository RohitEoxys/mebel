import React from "react";
import styles from "./EmailTemplate.module.scss";
import Image from "next/image";
import Images from "../Images/Images";
import Template2 from "./Template2/Template2";


const EmailTemplateBody = () => {
  return (
    <div className={styles["email_tmp_design"]}>
      <div className={styles["orng_bg"]}>
        <div className={styles["logo_ml_tmp"]}>
        <Image src={Images.Home_logo} />
        </div>
        <div className={styles["upr_bg_dt"]}>
          <Template2/>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateBody;

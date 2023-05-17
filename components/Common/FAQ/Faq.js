import React from "react";
import styles from "./Faq.module.scss";

const Faq = () => {
  return (
    <div className={styles["about_back_img"]}>
      <div className="container">
        <div className={styles["about_us_div"]}>
          <div className={styles["about_us_heading"]}>
            Frequently Ask <span style={{ color: "#ED7B30" }}>Question</span>
          </div>
          <div className={styles["about_us_subhead"]}>
            We have all the frequently asked questions (FAQs) about the credit
            repair industry and how to repair your credit score. We over 14
            years of experience helping clients win back their financial freedom
            we have seen it all and know what questions and concerns our clients
            have about their credit reports and their overall credit score.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;

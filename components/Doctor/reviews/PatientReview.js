import React from "react";
import styles from "./PatientReview.module.scss";
import StarRating from "@/components/Common/Rating/Rating";
import Image from "next/Image";
import Review from "@/components/Common/Reviews/Review";
import Images from "@/components/Images/Images";

const PatientReview = () => {
  return (
    <div className={styles["main_container"]}>
      <Image src={Images.bg_arc3} alt="bg" className={styles["bg_design"]} />
      <div className={`container ${styles["container"]}`}>
        <div className={`${styles["row"]}`}>
          <div className={`${styles["col"]}`}>
            <div className={styles["card"]}>
              <div className={styles["img-prt"]}>
                <Image src={Images.dr_review_dp} alt="doctor_dp" />
              </div>
              <div className={styles["nm_hdr"]}>Dr.Sunil Choudhary</div>
              <div className={styles["prftn"]}>Sr. Psychologist</div>

              <div className={styles["str_rvw"]}>
                <div className={styles["str_rtng"]}>
                  <StarRating rating={"4"} />
                </div>
                <div className={styles["nmbr_rvw"]}>(20 reviews)</div>
              </div>
            </div>
          </div>
          <div className={`${styles["col"]}`}>
            <div className={styles["qr_code"]}>
              <div className={styles["qr_code_img"]}>
                <Image src={Images.qrCodeimg} alt="qr_code" />
              </div>
              <div className={styles["qr_msg"]}>
                Leave review on phone scan the QR code
              </div>
            </div>
          </div>
        </div>
        <div className={styles["allrvw_sec"]}>
          <Review />
        </div>
      </div>
    </div>
  );
};

export default PatientReview;

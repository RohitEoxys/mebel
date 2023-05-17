import Image from "next/image";
import React from "react";
import styles from "./Template2.module.scss";
import Images from "@/components/Images/Images";

const Template2 = () => {
  return (
    <div className={styles["tmplt_2"]}>
      <div className={styles["nm_scn"]}>Hello Julian</div>
      <div className={`mt-2 ${styles["msg_scn"]}`}>
        your appointment is successfully done.
      </div>
      <div className={`mt-2 ${styles["all_dtls_hdr"]}`}>Your All details </div>
      <div className={styles["dtls_crd"]}>
        <div className={styles["apntmt_dtls"]}>
          <div className={styles["apntmt_id_dtls"]}>Appointment ID: </div>
          <div className={styles["apnt_id_id"]}>#2587410</div>
        </div>
        <div className={styles["apntmt_dtls"]}>
          <div className={styles["apntmt_id_dtls"]}>Pin Number: </div>
          <div className={styles["apnt_id_id"]}>32012</div>
        </div>
        <div className={styles["apntmt_dtls"]}>
          <div className={styles["apntmt_id_dtls"]}>Date : </div>
          <div className={styles["apnt_id_id"]}>02 Jan 2023</div>
        </div>
        <div className={styles["apntmt_dtls"]}>
          <div className={styles["apntmt_id_dtls"]}>Time :</div>
          <div className={styles["apnt_id_id"]}>10 : 20 AM</div>
        </div>
      </div>
      <div className= {styles["qr_prt"]}>
        <div className={styles["qr_code"]}>
          <Image src={Images.Qrfrem} />
        </div>
        <div className={styles["msg_qr"]}>your appointment QR Code</div>
      </div>
    </div>
  );
};

export default Template2;

import React from "react";
import styles from './Footer.module.scss';

const Footer = () => {
  return (
  <div className={styles["ftr_dt"]}>
<div className={styles['ftr_dtsc_1']} >
  <div className={styles['ftr_dtsc_ttl']}>Address</div>
  <div className={styles['smcln']}>:</div>
  <div className={styles['ftr_dtsc_dt']}>Vaisali Nagar, jaipur, rajsthan, india</div>
</div>
<div className={styles['ftr_dtsc_2']} >
  <div className={styles["phne_nm_dt"]}>
<div className={styles["phn_nm_ttl"]}>Phone</div>
<div className={styles['smcln']}>:</div>
<div className={styles["ph_nm_dta"]}>+919101018239</div>
  </div>

  <div className={styles["email_dt"]}>
  <div className={styles["phn_nm_ttl"]}>Email</div>
<div className={styles['smcln']}>:</div>
<div className={styles["ph_nm_dta"]}>Hello@lllmka.com</div>
  </div>
</div>
  </div>)
  ;
};

export default Footer;

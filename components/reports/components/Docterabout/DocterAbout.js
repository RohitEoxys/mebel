import React from 'react';
import styles from './DocterAbout.module.scss';

const DocterAbout = () => {
  return (
    <div className={styles['dtcr_sign']}>
           <div className={styles['dtcr_abt1']}>
        <div className={styles['dctr_nm']}>Dr. Vishnu Pareek</div>
        <div className={styles['dctr_prftn']}>Dental Surgeon</div>
    </div>
           <div className={styles['dtcr_abt2']}>
        <div className={styles['dctr_nm']}>Dr. Vishnu Pareek</div>
        <div className={styles['dctr_prftn']}>Dental Surgeon</div>
    </div>
    </div>
  )
}

export default DocterAbout
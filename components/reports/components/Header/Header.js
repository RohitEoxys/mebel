import React from 'react';
import Image from 'next/image';
import Images from '@/components/Images/Images';
import styles from './Header.module.scss';


const Header = () => {
  return (
    <div className={styles['hdr_img']}>
   <Image src={Images.reportHeader} />    
    <div className={styles['logo']}>
    <Image src={Images.Home_logo}/>
    </div>
    </div>
  )
}

export default Header;
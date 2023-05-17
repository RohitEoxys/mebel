import React,{useState} from "react";
import styles from "./ConsultCard.module.scss";
import Image from 'next/image'
import Images from "@/components/Images/Images";

const ConsultCard = (props) => {
const[show,setShow]=useState(false);

const clickHandeler=(e)=>{
    setShow(!show)
}
  return (
    <div>
    
        <>
          {props.queans?.map((item, key) => (
            <div className={styles['que-ans-crd']}>
              <div className={styles["question"]}>
                <div className={styles["qstn-part"]}>
                <span className={styles['slno']}>{item.slno}</span>
                <span className={styles['dot']}>.</span>
                <span className={styles['que-data']}>{item.que}</span>
               
                </div>
                <div className={styles['arrow']} onClick={(e)=>clickHandeler(item.slno)}>
                    <Image src={Images.downArrowo}/>
                 </div>
              </div>

                {show?<> <div className={styles["answer"]}>
                <span className={styles['ans-head']}>Answer</span>
                <span className={styles['semi-colon']}>:</span>
                <span className={styles['ans-details']}>
                 {item.ans}
                </span>
              </div></>:<></>}
             
            </div>
          ))}
        </>
     
    </div>
  );
};

export default ConsultCard;

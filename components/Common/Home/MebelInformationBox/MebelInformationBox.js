import React from "react";
import styles from "./MebelInformation.module.scss";
import Image from "next/image";
import Images from "@/components/Images/Images";

const MebelInformationBox = ({ getHomePageData }) => {
  // const appDetails = [
  //   {
  //     img: Images.setting5,
  //     head: "Easy setup for patent & Doctor",
  //     label:
  //       "There are many variations of passages of Lorem Ipsum available, but the .",
  //   },
  //   {
  //     img: Images.lock6,
  //     head: "Fast & secure",
  //     label:
  //       "There are many variations of passages of Lorem Ipsum available, but the There are many variations of passages.",
  //   },
  //   {
  //     img: Images.office5,
  //     head: "24/7 Customer support",
  //     label:
  //       "There are many variations of passages of Lorem Ipsum available, but the There are many variations of passages.",
  //   },
  // ];
  return (
    <>
      <div className={styles["home_box_div"]}>
        {/* {appDetails.map((list, key) => ( */}
        <div
          // className={styles["home_box2"]}
          dangerouslySetInnerHTML={{
            __html: getHomePageData?.content?.service_content_left,
          }}
        ></div>
        
        {/* <div className={styles["box_images"]}>
            <Image src={list.img} alt="lock icon" />
          </div>
          <div className={styles["head_para"]}>
            <div className={styles["box_head"]}> {list.head} </div>
            <div className={styles["box_para"]}>{list.label}</div>
          </div> */}
        {/* ))} */}
      </div>
    </>
  );
};

export default MebelInformationBox;

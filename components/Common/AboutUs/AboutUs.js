import React, { useContext, useEffect, useState } from "react";
import styles from "./AboutUs.module.scss";
import Images from "@/components/Images/Images";
import Image from "next/image";
import { SliderCarosal } from "../Home/SliderCarosal/SliderCarosal";
import CollageWithContent from "./collageWithContent/CollageWithContent";
import FetchDataContext from "@/store/api-Context";
import LoaderSpiner from "../Loader/LoaderSpiner";

export const AboutUs = () => {
  const [loading, setLoading] = useState(true);
  const contextData = useContext(FetchDataContext);
  const getAboutPageData = contextData?.getHomePageData;

  useEffect(() => {
    contextData.getPagesData("About", setLoading);
  }, []);

  const mabelHistory = [
    {
      count: "90K",
      label: "Happy Patient",
      secLabel:
        "There are many variations of passages of Lorem Ipsum available.",
    },
    {
      count: "12+",
      label: "Years Of Experience",
      secLabel:
        "There are many variations of passages of Lorem Ipsum available.",
    },
    {
      count: "290+",
      label: "Number Of Doctor",
      secLabel:
        "There are many variations of passages of Lorem Ipsum available.",
    },
  ];

  return (
    <>
      <div className={styles["about_us"]}>
        <div className={styles["about_back_img"]}>
          <div className="container">
            <div className={styles["about_us_div"]}>
              <div className={styles["about_us_heading"]}>About Us</div>
              <div className={styles["about_us_subhead"]}>
                Providing compassionate and expert care to our patients
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container">
          <div></div>
          <CollageWithContent titleHead={"About Mebel"} />
          <div className={styles["our_vision_img"]}>
            <Image src={Images.our_vision} alt="our vision image" />
          </div>
          <div className={styles["our_story_head"]}>Our Story & Vison</div>
          <div className={styles["our_story_content1"]}>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going tocted humour
          </div>
          <div className={styles["our_story_content2"]}>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsu There
            are many variations of passages of Lorem Ipsum available, but the
            majority have suffered alteration in some form, by injected humour
          </div>
          <div className={styles["strong_mabel_div"]}>
            <div className={styles["left_content"]}>
              We Are Strong Together{" "}
              <span className={styles["mabel"]}>Mebel</span>
            </div>
            <div className={styles["right_content"]}>
              <div className={styles["first_div_content"]}>
                There are many variations of passages of Lorem Ipsum available,
                but the ajority have suffered alteration in some form, by
                injected humour, or randomised words.
              </div>
              <div className={styles["second_div_content"]}>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsu
              </div>
              <div className={styles["third_div_content"]}>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsu
              </div>
            </div>
          </div>
          <div className={styles["about_mabel_history_div"]}>
            {mabelHistory.map((item, key) => (
              <div className={styles["about_mabel_history"]} key={key}>
                <div className={styles["happy_count"]}>{item.count}</div>
                <div className={styles["happy_patient"]}>{item.label}</div>
                <div className={styles["happy_content"]}>{item.secLabel}</div>
              </div>
            ))}
          </div>
        </div> */}

        <CollageWithContent content={getAboutPageData?.content?.content} />
        {/* <div
          dangerouslySetInnerHTML={{
            __html: ,
          }}
        ></div> */}
        <div>
          <SliderCarosal />
        </div>
      </div>
      {loading ? <LoaderSpiner /> : null}
    </>
  );
};

import Image from "next/image";
import React from "react";
import styles from "./easySteps.module.scss";
import SlickCarousel from "./slick-carousel/SlickCarousel";
import Images from "@/components/Images/Images";
import { useRouter } from "next/router";

const EasySteps = ({ getHomePageData }) => {
  const router = useRouter();

  const goToCunsltPatientPage = () => {
    router.push("/patient/signup");
  };

  const goToCunslDoctortPage = () => {
    router.push("/doctor/signup");
  };
  return (
    <div className={styles["main_container"]}>
      {/* <div className={styles["zigzag_div"]}>
        <Image src={Images.zigzagline} alt="zigzag line" />
      </div> */}
      <div className={styles["main_container_content"]}>
        <div className={styles["main_bg"]}>
          <div className={styles["left-heading"]}>
            {/* <h2>Easy Steps To Get Your Solution</h2> */}
            <h2>{getHomePageData?.content?.section_4_title}</h2>
          </div>
          <div className={styles["middle-heading"]}>
            {/* <h5>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical.
            </h5> */}
            <h5>{getHomePageData?.content?.section_4_description}</h5>
          </div>
          <div className={styles["right-heading"]}>
            <div className={styles["right-heading-buttons"]}>
              <button
                className={styles["getConsulationBtn"]}
                id="getConsulationBtn"
                onClick={goToCunsltPatientPage}
              >
                Get Consultation
              </button>
              <button
                className={styles["doConsulationBtn"]}
                id="doConsulationBtn"
                onClick={goToCunslDoctortPage}
              >
                Do Consultation
              </button>
            </div>
          </div>
        </div>
        <div className="remove_dots">
          <SlickCarousel getHomePageData={getHomePageData} />
        </div>
      </div>
    </div>
  );
};

export default EasySteps;

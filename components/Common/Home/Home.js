import Images from "@/components/Images/Images";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EasySteps from "./easy-steps-section/EasySteps";
import Offering from "./offering-to-patients-section/Offering";
import Download from "./download-section/download";
import { SliderCarosal } from "./SliderCarosal/SliderCarosal";
import MebelInformationBox from "./MebelInformationBox/MebelInformationBox";
import Router from "next/router";
import FetchDataContext from "@/store/api-Context";
import LoaderSpiner from "../Loader/LoaderSpiner";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const contextData = useContext(FetchDataContext);
  const getHomePageData = contextData?.getHomePageData;

  useEffect(() => {
    contextData.getPagesData("Home", setLoading);
  }, []);


  const orderList = [
    {
      img: Images.Orange_tick,
      label: "Top Specialist Docotor",
    },
    {
      img: Images.Orange_tick,
      label: "State Of The Art Doctor Services Medical ",
    },
    {
      img: Images.Orange_tick,
      label: "Discount For All Medical Treatment",
    },
    {
      img: Images.Orange_tick,
      label: "Discount For All Medical Treatment Top Specialist",
    },
  ];

  const homeBtnForRedirctSignupPatient = () => {
    Router.push("/patient/signup");
  };
  const homeBtnForRedirctSignupDoctor = () => {
    Router.push("/doctor/signup");
  };

  const [hydrated, setHydrated] = React.useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (
    <>
      <div className={styles["first_body_div"]}>
        <div className={styles["pink_body_div"]}>
          <Image src={Images.first_home} alt="doctor background" />
        </div>
        <div className="container">
          <div className={styles["first_body_content"]}>
            <div
              className={styles["doctor_contant"]}
              dangerouslySetInnerHTML={{
                __html: getHomePageData?.content?.top_content,
              }}
            ></div>
            {/* <div className={styles["doctor_contant"]}>
              <div className={styles["welcome_mebel"]}>
                <div> Welcome in mebel </div>
                <div className={styles["minus_div"]}>
                  <div className={styles["minus"]}> </div>
                  <div className={styles["minus"]}> </div>
                  <div className={styles["minus_long"]}> </div>
                </div>
              </div>
              <p className={styles["feel_better"]}>
                Feel better about finding
                <span className={styles["health_care"]}> Healthcare </span>
              </p>
              <div className={styles["better_para_one"]}>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour.
              </div>
              <div className={` mt-3 ${styles["better_para_one"]}`}>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour.
              </div>
            </div> */}
            <div className={styles["image_circle"]}>
              <div className={styles["doctor_image"]}>
                <img
                  src={
                    getHomePageData
                      ? getHomePageData?.content?.top_content_banner_image
                      : Images.circle_icon_owner
                  }
                  alt="doctor image"
                  // width={500}
                  // height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["div_with_heart"]}>
        <div className="container">
          <div className={styles["screenshot_div"]}>
            <div className={styles["screenshot_div_right"]}>
              <div className={styles["doct_img_two"]}>
                <img
                  src={
                    getHomePageData
                      ? getHomePageData?.content?.middle_content_banner_image
                      : Images.back_img1
                  }
                  alt="doctor image"
                />
              </div>
              <div className={styles["doct_img_three"]}>
                <Image src={Images.try1} alt="group of doctors" />
              </div>
              <div className={styles["doct_img_four"]}>
                <Image src={Images.regular_ch} alt="regular checkup" />
              </div>
            </div>
            <div className={styles["swip_with_content"]}>
              <div
                dangerouslySetInnerHTML={{
                  __html: getHomePageData?.content?.middle_content,
                }}
              >
                {/* <div className={styles["swip_with_content-heading"]}>
                <h6>Why us different from others</h6>
              </div>

              <div className={styles["follow_up_head"]}>
                We Are Always Ensure Best Medical Treatment For Your Health
              </div>
              {orderList.map((list, key) => (
                <div className={styles["checkbox_content"]} key={key}>
                  <div>
                    <Image src={list.img} alt="checkbox icon" />
                  </div>
                  <div className={styles["checkbox_para"]}>{list.label}</div>
                </div>
              ))}

            */}
              </div>
              <div className={styles["swip_with_btn"]}>
                <button
                  className={styles["makeAppointment_btn"]}
                  id="makeappointment"
                  onClick={homeBtnForRedirctSignupPatient}
                >
                  Make An Appointment
                </button>
                <button
                  className={styles["doctor_btn"]}
                  id="areyoudoctor"
                  onClick={homeBtnForRedirctSignupDoctor}
                >
                  Are You a Doctor
                </button>
              </div>
            </div>
            <div className={styles["hand_with_heart"]}>
              <Image src={Images.hand_heart} alt="heart_icon" />
            </div>
          </div>
          <div className={styles["home_info_boxes"]}>
            <MebelInformationBox getHomePageData={getHomePageData} />
          </div>
        </div>
      </div>
      <div className={styles["back_zigzag"]}>
        <div className="container">
          <EasySteps getHomePageData={getHomePageData} />
        </div>
      </div>
      <Offering getHomePageData={getHomePageData} />
      <div className="container">
        <Download getHomePageData={getHomePageData} />
      </div>
      <div className={styles["carosal_comma_left"]}>
        <SliderCarosal />
      </div>
      {loading ? <LoaderSpiner /> : null}
    </>
  );
};

export default Home;

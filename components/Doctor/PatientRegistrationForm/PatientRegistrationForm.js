import Images from "@/components/Images/Images";
import Image from "next/image";
import React, { useState } from "react";
import PersonalDetails from "./components/PersonalDetails/PersonalDetails";
import styles from "./PatientRegistrationForm.module.scss";
import MedicalDetails from "./components/MedicalDetails/MedicalDetails";
import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";

const PatientRegistrationForm = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="container">
        <div className={styles["background-design-1"]}>
          <Image src={Images.bg_arc3} alt="icon" />
        </div>
        <div className={`row ${styles["registration_div"]}`}>
          <div className={`col-12 col-md-6  ${styles["reg-details"]}`}>
            <div className={styles["reg_img"]}>
              <Image src={Images.doctor_signup_main} alt="hospital images" />
            </div>
            <div className={styles["registration_img_res"]}>
              <Image src={Images.doctor_register_res} alt="hospital images" />
            </div>
          </div>
          <div className={`col-12 col-md-6 ${styles["reg-details2"]}`}>
            <div className={styles["registration_form"]}>
              <div className={styles["patient_form_head"]}>
                Patient Registration Form
              </div>
              <div className={styles["enter_details"]}>
                Enter your details below to get stared.
              </div>
            </div>
            <div className={styles["tabs"]}>
              <div
                className={`${styles["personal"]} ${
                  currentTab === 1 && styles["activeText"]
                }`}
                onClick={() => setCurrentTab(1)}
              >
                Personal Details
                <div
                  className={`${currentTab === 1 && styles["slider"]} ${
                    currentTab === 2 && styles["reviewTabActive"]
                  }`}
                ></div>
                <div
                  className={`${currentTab === 2 && styles["light_slider"]} ${
                    currentTab === 2 && styles["reviewTabActive"]
                  }`}
                ></div>
              </div>
              <div
                className={`${styles["medical"]} ${
                  currentTab === 2 && styles["activeText"]
                }`}
                onClick={() => setCurrentTab(2)}
              >
                Medical Details
                <div
                  className={`${currentTab === 2 && styles["slider"]} ${
                    currentTab === 2 && styles["reviewTabActive"]
                  }`}
                ></div>
                <div
                  className={`${currentTab === 1 && styles["light_slider"]} ${
                    currentTab === 2 && styles["reviewTabActive"]
                  }`}
                ></div>
              </div>
            </div>
            {currentTab === 1 && (
              <PersonalDetails setCurrentTab={setCurrentTab} />
            )}
            {currentTab === 2 && (
              <MedicalDetails
                setCurrentTab={setCurrentTab}
                setLoading={setLoading}
              />
            )}
          </div>
        </div>
      </div>
      {loading && <LoaderSpiner />}
    </>
  );
};

export default PatientRegistrationForm;

//   <div className={styles["slider"]}></div>
//  <div className={styles["light_slider"]}></div>

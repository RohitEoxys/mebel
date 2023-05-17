import Router from "next/router";
import React, { useState } from "react";
import Image from "next/image";

import Images from "@/components/Images/Images";
import styles from "./dropdownForPatient.module.scss";
import CustomDropdown from "@/components/Common/UI/Dropdown/Custom/CustomDropdown";
import CustomModal from "@/components/Common/UI/Modal/Modal";
import Popup from "@/components/Common/UI/pop-ups/Popup";

const newPatient = () => {
  Router.replace("/doctor/patient-register");
};

// const setQuestionForPatient = () => {
//   Router.push("./question-to-patients");
// };

const DropdownForPatient = () => {
  const [pinPopup, setPinPopup] = useState(false);

  const modalState = (state) => {
    setPinPopup(state);
  };

  const followUpPatient = () => setPinPopup(true);
  const popupAddClickHandler = () => setPinPopup(false);

  const items = [
    {
      label: "New Patient",
      icon: <Image src={Images.rightArrow} alt="flag" />,
      method: newPatient,
    },
    {
      label: "Follow Up Patient",
      icon: <Image src={Images.rightArrow} alt="flag" />,
      method: followUpPatient,
    },
    // {
    //   label: "Set Question For Patient",
    //   icon: <Image src={Images.rightArrow} alt="flag" />,
    //   method: setQuestionForPatient,
    // },
  ];

  const element = (
    <div className={styles["siginDropdown_container"]}>
      {items.map((e, index) => (
        <div key={index}>
          <div
            className={styles["signinDropdown_container_content"]}
            onClick={e.method}
          >
            <span className={styles["signinDropdown_container_content-label"]}>
              {e.label}
            </span>
            <span
              className={`${styles["signinDropdown_container_content-icon"]} `}
            >
              {e.icon}
            </span>
          </div>
          <div
            className={`${
              e.label === "New Patient" ? `${styles["signinhrTag"]}` : ""
            } `}
          ></div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {pinPopup && (
        <CustomModal open={pinPopup} modalState={modalState}>
          <Popup
            title="Pin Number"
            subHeading="Ask pin number to patient for access"
            input
            inputLabel="Pin Number"
            inputPlaceholder="Enter pin number"
            buttonName={"Next"}
            mainBtnClass={styles["add_btn"]}
            btnOnClick={popupAddClickHandler}
            mainInputClass={styles["medicalStudiesPopupInput"]}
          />
        </CustomModal>
      )}
      <CustomDropdown
        divider={true}
        selectMenu={element}
        type="select"
        arrow={true}
        placeholder="For Patient"
        placeholderClass={styles["singupPlaceholder"]}
        mainClass={styles["signupMainClass"]}
        boxClass={styles["CustomBoxClass"]}
        startDropClass={styles["signupStartDropClass"]}
        arrowColor="#ffffff"
        fillArrow
        arrowupAllign={"41%"}
      />
    </>
  );
};

export default DropdownForPatient;

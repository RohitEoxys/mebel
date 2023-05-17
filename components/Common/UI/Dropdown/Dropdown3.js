import React from "react";
import styles from "./Dropdown.module.scss";
import Images from "@/components/Images/Images";
import Image from "next/image";
import CustomDropdown from "./Custom/CustomDropdown";
import Router from "next/router";

const patientSignupClickHandler = () => {
  Router.push("/patient/signup");
};
const doctorSignupClickHandler = () => {
  Router.push("/doctor/signup");
};

const items = [
  {
    label: "Sign Up As Patient",
    icon: <Image src={Images.rightArrow} alt="flag" />,
    method: patientSignupClickHandler,
  },
  {
    label: "Sign Up As Doctor",
    icon: <Image src={Images.rightArrow} alt="flag" />,
    method: doctorSignupClickHandler,
  },
];

const Dropdown3 = () => {
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
              e.label === "Sign Up As Patient" ? `${styles["signinhrTag"]}` : ""
            } `}
          ></div>
        </div>
      ))}
    </div>
  );

  return (
    <CustomDropdown
      divider={true}
      selectMenu={element}
      type="select"
      arrow={true}
      placeholder="Sign Up"
      placeholderClass={styles["singupPlaceholder"]}
      mainClass={styles["signupMainClass"]}
      boxClass={styles["lngBoxClass"]}
      startDropClass={styles["signupStartDropClass"]}
      arrowColor="#ffffff"
    />
  );
};

export default Dropdown3;

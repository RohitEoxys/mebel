import React, { useEffect, useState } from "react";
import styles from "./Dropdown.module.scss";
import Images from "@/components/Images/Images";
import Image from "next/image";
import CustomDropdown from "./Custom/CustomDropdown";
import Router from "next/router";

const patientSigninClickHandler = () => {
  Router.push("/patient/login");
};
const doctorSigninClickHandler = () => {
  Router.push("/doctor/login");
};

const items = [
  {
    label: "Log In As Patient",
    icon: <Image src={Images.rightArrow} alt="flag" />,
    method: patientSigninClickHandler,
  },
  {
    label: "Log In As Doctor",
    icon: <Image src={Images.rightArrow} alt="flag" />,
    method: doctorSigninClickHandler,
  },
];

const Dropdown2 = () => {
  const [selectedValue, setSelectedValue] = useState("hey");

  const defaultPlaceholder = (
    <div className={styles["defaultSelect"]}>
      <span className={styles["defaultSelect-label"]}>Eng</span>
      <span className={`${styles["defaultSelect-icon"]} `}>
        <Image src={Images.EnglishFlag} alt="flag" />
      </span>
    </div>
  );

  useEffect(() => {
    setSelectedValue(defaultPlaceholder);
  }, []);

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
              e.label === "Log In As Patient" ? `${styles["signinhrTag"]}` : ""
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
      placeholder="Log In"
      placeholderClass={styles["signinPlaceholder"]}
      mainClass={styles["signinMainClass"]}
      boxClass={styles["lngBoxClass"]}
      startDropClass={styles["siginStartDropClass"]}
      arrowColor="#ED7B30"
    />
  );
};

export default Dropdown2;

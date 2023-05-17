import React, { useEffect, useState } from "react";
import styles from "./Dropdown.module.scss";
import Images from "@/components/Images/Images";
import Image from "next/image";
import CustomDropdown from "./Custom/CustomDropdown";

const items = [
  { label: "Eng", icon: <Image src={Images.EnglishFlag} alt="flag" /> },
  { label: "Spa", icon: <Image src={Images.SpainFlag} alt="flag" /> },
];

const Dropdown1 = () => {
  const [selectedValue, setSelectedValue] = useState("hey");

  const defaultPlaceholder = (
    <div className={styles["defaultSelect"]}>
      <span className={`${styles["defaultSelect-icon"]} `}>
        <Image src={Images.EnglishFlag} alt="flag" />
      </span>
      <span className={styles["defaultSelect-label"]}>Eng</span>
    </div>
  );

  useEffect(() => {
    setSelectedValue(defaultPlaceholder);
  }, []);

  const element = (
    <div className={styles["lanDropdown_container"]}>
      {items.map((e, index) => (
        <div key={index}>
          <div className={styles["lanDropdown_container_content"]}>
            <span
              className={`${styles["lanDropdown_container_content-icon"]} `}
            >
              {e.icon}
            </span>
            <span className={styles["lanDropdown_container_content-label"]}>
              {e.label}
            </span>
          </div>
          <div
            className={`${e.label === "Eng" ? `${styles["hrTag"]}` : ""} `}
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
      placeholder="Select Language"
      defaultPlaceholder={selectedValue}
      placeholderClass={styles["languagePlaceholder"]}
      mainClass={styles["lanMainClass"]}
      boxClass={styles["lngBoxClass"]}
      startDropClass={styles["startlngBoxClass"]}
      arrowColor="black"
    />
  );
};

export default Dropdown1;

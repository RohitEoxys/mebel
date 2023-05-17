import React, { useState, useEffect } from "react";

import Image from "next/image";
import Images from "@/components/Images/Images";
import styles from "./dropdownToday.module.scss";
import CustomDropdown from "@/components/Common/UI/Dropdown/Custom/CustomDropdown";

const items = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DropdownToday = () => {
  const [selectedValue, setSelectedValue] = useState("Sun");

  const defaultPlaceholder = (
    <div className={styles["defaultSelect"]}>
      <span className={`${styles["defaultSelect-icon"]} `}>
        <Image src={Images.calenderIcon} alt="flag" />
      </span>
      <span className={styles["defaultSelect-label"]}>{selectedValue}</span>
    </div>
  );

  // useEffect(() => {
  //   setSelectedValue(defaultPlaceholder);
  // }, []);

  const element = (
    <div className={styles["lanDropdown_container"]}>
      {items.map((e, index) => (
        <div key={index}>
          <div
            className={styles["selectBoxItems"]}
            onClick={() => setSelectedValue(e)}
          >
            <span className={styles["lanDropdown_container_content-label"]}>
              {e}
            </span>
          </div>
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
      defaultPlaceholder={defaultPlaceholder}
      placeholderClass={styles["languagePlaceholder"]}
      mainClass={styles["lanMainClass"]}
      boxClass={styles["lngBoxClass"]}
      startDropClass={styles["startlngBoxClass"]}
      arrowColor="black"
      fillArrow
      arrowupAllign={"41%"}
      overFlowHide
    />
  );
};

export default DropdownToday;

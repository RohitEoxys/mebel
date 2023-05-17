import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

import styles from "./customDropdown.module.scss";
import Input from "../../Input/Input";

const CustomDropdown = ({
  placeholder,
  dropdownTitle,
  arrow,
  checkbox,
  selectMenu,
  boxClass,
  mainClass,
  type,
  divider,
  defaultPlaceholder,
  placeholderClass,
  startDropClass,
  arrowColor,
  fillArrow,
  arrowupAllign,
  onChange,
  multipleSelect,
  errorText,
  arrowDownAllign,
  overFlowHide,
  searchBox,
  iconPath,
  iconClass,
  inputClassName,
  inputChange,
  mainInputClass,
  searchResults,
}) => {
  const boxRef = useRef(null);
  const dropdownRef = useRef(null);
  const selectMenuRef = useRef(null);

  const [open, setOpen] = useState(false);

  const selectOptionClickHandler = () => {
    if (!multipleSelect) {
      setOpen(false);
    }
  };
  const element =
    type === "checkbox" ? (
      checkbox
    ) : (
      <div
        className={styles["select_container"]}
        style={overFlowHide ? {} : { overflowY: "auto" }}
        ref={selectMenuRef}
        onClick={selectOptionClickHandler}
      >
        {selectMenu}
      </div>
    );

  useEffect(() => {
    {
      open &&
        gsap.fromTo(
          dropdownRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, duration: 0.4, ease: "easeOut" }
        );
    }

    const checkIfClickedOutside = (e) => {
      if (open && boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  });

  const boxClickHandler = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className={`${styles["main_container"]} ${mainClass}`} ref={boxRef}>
        <div
          className={`${styles["box"]} ${boxClass}`}
          onClick={boxClickHandler}
        >
          {
            <span
              className={`${styles["box-placeHolder"]} ${placeholderClass}`}
              onChange={onChange}
            >
              {defaultPlaceholder || placeholder}
            </span>
          }

          {arrow && !open && (
            <i
              className={`${
                fillArrow ? "fa-solid fa-sort-down" : "fa-solid fa-chevron-down"
              }`}
              style={{
                color: `${arrowColor ? arrowColor : "#7E83A7"}`,
                top: `${arrowDownAllign}`,
              }}
            ></i>
          )}
          {arrow && open && (
            <i
              className={`${
                fillArrow ? "fa-solid fa-sort-up" : "fa-solid fa-chevron-up"
              }`}
              style={{
                color: `${arrowColor ? arrowColor : "#7E83A7"}`,
                top: `${arrowupAllign}`,
              }}
            ></i>
          )}
        </div>
        <div
          className={`${styles["box_dropdown"]} ${startDropClass}`}
          style={{ display: `${open ? "flex" : "none"}` }}
          ref={dropdownRef}
        >
          {searchBox && (
            <>
              <Input
                icon
                path={iconPath}
                iconClass={iconClass}
                className={inputClassName}
                onInputChange={inputChange}
                mainInputClass={mainInputClass}
              />
              {searchResults}
            </>
          )}
          {divider ? "" : <h6 style={{ marginLeft: 8 }}>{dropdownTitle}</h6>}

          {divider ? (
            ""
          ) : (
            <span className={styles["box_dropdown-border"]}></span>
          )}

          {element}
        </div>
      </div>
      {errorText && <p className={styles["errorText"]}>{errorText}</p>}
    </>
  );
};

export default CustomDropdown;

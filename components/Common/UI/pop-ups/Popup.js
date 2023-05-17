import React from "react";

import Card from "../Card/Card";
import styles from "./pop.module.scss";
import Input from "../Input/Input";
import { Button } from "../Button/Button";

const Popup = ({
  title,
  inputLabel,
  textAreaLabel,
  inputPlaceholder,
  buttonName,
  textArea,
  rows,
  input,
  btnOnClick,
  subHeading,
  textAreaPlaceHolder,
  buttonContainerClass,
  mainBtnClass,
  inputClassName,
  mainDivClass,
  noOfButtons,
  buttonName_2,
  btnOnClick_2,
  buttonContainerClass_2,
  mainBtnClass_2,
  btnsMainDiv,
  mainInputClass,
  onInputChange,
  name,
  type,
  maxLength,
  errorText,
  inputContainer,
  mainTextareClass,
}) => {
  return (
    <div className="row justify-content-center  ">
      <div className={`col-12 ${styles["main_contatiner"]} ${mainDivClass}`}>
        <div className={styles.main_contatiner_heading}>
          <h1>{title}</h1>
        </div>
        {subHeading && (
          <h6 className={styles.main_contatiner_subHeading}>{subHeading}</h6>
        )}
        <div className={styles.main_contatiner_middle}>
          {input && (
            <Input
              label={inputLabel}
              placeholder={inputPlaceholder}
              mainInputClass={mainInputClass}
              onInputChange={onInputChange}
              maxChar={maxLength}
              type={type}
              errorText={errorText}
              inputContainer={inputContainer}
            />
          )}
          {textArea && (
            <Input
              name={name}
              element="textarea"
              label={textAreaLabel}
              placeholder={textAreaPlaceHolder}
              rows={rows}
              mainInputClass={`${styles["main_contatiner"]} ${mainInputClass}`}
              onInputChange={onInputChange}
              mainTextareClass={mainTextareClass}
            />
          )}
        </div>
        {noOfButtons === 2 ? (
          <div
            className={`${styles["main_contatiner_bottom_buttons"]}  ${btnsMainDiv}`}
          >
            <Button
              name={buttonName}
              onClick={btnOnClick}
              mainDiv={buttonContainerClass}
              className={mainBtnClass}
            />
            <Button
              name={buttonName_2}
              onClick={btnOnClick_2}
              mainDiv={buttonContainerClass_2}
              className={mainBtnClass_2}
            />
          </div>
        ) : (
          <div className={styles.main_contatiner_bottom}>
            <Button
              name={buttonName}
              onClick={btnOnClick}
              mainDiv={buttonContainerClass}
              className={mainBtnClass}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;

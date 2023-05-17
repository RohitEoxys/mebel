//if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength)

import Image from "next/image";
import classes from "./input.module.scss";
import { useState, useReducer, useEffect } from "react";
import { validate } from "../../utils/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [displayIcon, setDisplayIcon] = useState(true);

  // let maxLength = props?.value?.length > props.maxLength;
  // maxLength = props.value = props?.value?.slice(0, this.maxLength);

  const element =
    props.element === "textarea" ? (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onInputChange}
        className={props.mainTextareClass}
      />
    ) : (
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        style={{ width: `${props.length || "100%"}` }}
        className={`${props.className || null} ${props.mainInputClass}`}
        onWheel={(e) => e.target.blur(e)}
        onChange={props.onInputChange}
        value={props.value}
        ref={props.inputRefs}
        onInput={() => props.value?.slice(0, props.maxLength)}
        maxLength={props.maxChar}
        pattern={props.pattern}
        disabled={props.disabled}
      />
    );

  return (
    <div className={`${classes["form-control"]}`}>
      <div
        className={`${classes["input_container"]} ${props.className || null}  ${
          props.inputContainer
        }`}
      >
        <label htmlFor={props.id}>{props.label}</label>

        {element}
        {props.icon && (
          <Image
            src={props.path}
            style={{
              ...props.iconStyle,
              display: `${!displayIcon ? "none" : ""}`,
            }}
            alt="icon"
            className={props.iconClass}
          />
        )}

        <p>{props.errorText}</p>
      </div>
    </div>
  );
};

export default Input;

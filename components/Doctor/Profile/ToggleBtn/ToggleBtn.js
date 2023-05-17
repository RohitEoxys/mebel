import React from "react";
import Switch from "react-switch";
import { useState } from "react";

const ToggleBtn = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => setChecked(!checked);

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      handleDiameter={23}
      offColor="#DDF1E6"
      onColor="#DDF1E6"
      offHandleColor="#000000"
      onHandleColor="#4BCA0C"
      height={33}
      width={75}
      borderRadius={100}
      uncheckedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 12,
            color: "#4BCA0C",
            paddingLeft: 8,
            fontFamily: "inherit",
            fontWeight: 500,
          }}
        >
          ON
        </div>
      }
      checkedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 12,
            color: "#452C25",
            paddingRight: 8,
            fontFamily: "inherit",
            fontWeight: 500,
          }}
        >
          OFF
        </div>
      }
      uncheckedHandleIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "#ffffff",
            fontSize: 12,
            fontFamily: "inherit",
            fontWeight: 500,
          }}
        >
          OFF
        </div>
      }
      checkedHandleIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "#ffffff",
            fontSize: 12,
            fontFamily: "inherit",
            fontWeight: 500,
          }}
        >
          ON
        </div>
      }
      className="react-switch"
      id="small-radius-switch"
    />
  );
};

export default ToggleBtn;

import React, { useState } from "react";
import { Checkbox, Select } from "antd";

import styles from "./checkSelect.module.scss";

const CheckSelect = (props) => {
  const [selectedOptions, setSelectedOptions] = useState(["john"]);
  const [dirty, setDirty] = useState(false);

  const handleChange = (value) => {
    setSelectedOptions(value);
    setDirty(true);
  };
  return (
    <Select
      defaultValue="john"
      onChange={handleChange}
      showArrow
      placeholder="2days"
      showsearch="false"
      onMouseDown={(e) => {
        setDirty(false);
        e.stopPropagation();
      }}
      className={`${styles["select"]} ${props.userClass}`}
      mode="multiple"
      options={[
        {
          value: "john",
          label: (
            <Checkbox
              onClick={(e) => {
                if (dirty) {
                  e.stopPropagation();
                }
                setDirty(false);
              }}
              checked={selectedOptions.includes("john")}
            >
              John
            </Checkbox>
          ),
        },
        {
          value: "jim",
          label: (
            <Checkbox
              onClick={(e) => {
                if (dirty) {
                  e.stopPropagation();
                }
                setDirty(false);
              }}
              checked={selectedOptions.includes("jim")}
            >
              Jim
            </Checkbox>
          ),
        },
        {
          value: "johhny",
          label: (
            <Checkbox
              onClick={(e) => {
                if (dirty) {
                  e.stopPropagation();
                }
                setDirty(false);
              }}
              checked={selectedOptions.includes("johhny")}
            >
              Johhny
            </Checkbox>
          ),
        },
      ]}
    />
  );
};

export default CheckSelect;

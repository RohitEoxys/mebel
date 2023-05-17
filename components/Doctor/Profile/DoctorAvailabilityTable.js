import Table from "react-bootstrap/Table";
import { Checkbox, Select } from "antd/lib";

import styles from "./doctorAvailabilityTable.module.scss";
import React, { useEffect, useState } from "react";
import { Option } from "antd/lib/mentions";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const hours = [
  {
    label: "01:00:00",
    value: "1",
  },
  {
    label: "02:00:00",
    value: "2",
  },
  {
    label: "03:00:00",
    value: "3",
  },
  {
    label: "04:00:00",
    value: "4",
  },
  {
    label: "05:00:00",
    value: "5",
  },
  {
    label: "06:00:00",
    value: "6",
  },
  {
    label: "07:00:00",
    value: "7",
  },
  {
    label: "08:00:00",
    value: "8",
  },
  {
    label: "09:00:00",
    value: "9",
  },
  {
    label: "10:00:00",
    value: "10",
  },
  {
    label: "11:00:00",
    value: "11",
  },
  {
    label: "12:00:00",
    value: "12",
  },
  {
    label: "13:00:00",
    value: "13",
  },
  {
    label: "14:00:00",
    value: "14",
  },
  {
    label: "15:00:00",
    value: "15",
  },
  {
    label: "16:00:00",
    value: "16",
  },
  {
    label: "17:00:00",
    value: "17",
  },
  {
    label: "18:00:00",
    value: "18",
  },
  {
    label: "19:00:00",
    value: "19",
  },
  {
    label: "20:00:00",
    value: "20",
  },
  {
    label: "21:00:00",
    value: "21",
  },
  {
    label: "22:00:00",
    value: "22",
  },
  {
    label: "23:00:00",
    value: "23",
  },
];

const DoctorAvailabilityTable = ({
  doctorAvailability,
  tableValues,
  setChecked,
  setDocAvlTimes,
  checked,
  docAvlTimes,
}) => {
  const defaultValues = [
    { status: 0, start_time: "09:00:00", end_time: "05:00:00" },
    { status: 0, start_time: "09:00:00", end_time: "05:00:00" },
    { status: 0, start_time: "09:00:00", end_time: "05:00:00" },
    { status: 0, start_time: "09:00:00", end_time: "05:00:00" },
    { status: 0, start_time: "09:00:00", end_time: "05:00:00" },
    { status: 0, start_time: "09:00:00", end_time: "05:00:00" },
    { status: 0, start_time: "09:00:00", end_time: "05:00:00" },
  ];
  const [values, setValues] = useState(defaultValues);

  useEffect(() => {
    setChecked([]);
    setDocAvlTimes([]);
    setValues(defaultValues);

    let data = [...values];
    values?.map((item, key) => {
      data[key] = {
        status: doctorAvailability
          ? doctorAvailability[key]?.status
          : item.status,
        start_time: doctorAvailability
          ? doctorAvailability[key]?.start_time
          : item.start_time,
        end_time: doctorAvailability
          ? doctorAvailability[key]?.end_time
          : item.end_time,
      };
      setValues(data);
    });

    doctorAvailability?.map((item, key) => {
      setChecked((prev) => {
        return [...prev, item.status];
      });

      setDocAvlTimes((prev) => {
        return [
          ...prev,
          { start_time: item.start_time, end_time: item.end_time },
        ];
      });
    });
  }, [doctorAvailability]);

  useEffect(() => {
    setDocAvlTimes(docAvlTimes);
  }, [docAvlTimes]);

  const onChangeHandler = (value, key, name) => {
    const data = [...values];
    data[key][name] = value;
    setValues(data);
  };

  useEffect(() => {
    tableValues(values);
  }, [values]);

  return (
    <div className={styles["main_container"]}>
      <Table bordered className={styles["main_container"]} responsive>
        <thead>
          <tr>
            <th className={styles["th_1"]}>Days</th>
            <th className={styles["th_2"]}>Time</th>
            {/* <th className={styles["th_3"]}>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {days?.map((item, key) => {
            return (
              <tr key={key}>
                <td className="d-flex align-items-center">
                  <React.Fragment>
                    <Checkbox
                      onChange={(e) =>
                        onChangeHandler(e.target.checked ? 1 : 0, key, "status")
                      }
                      value={item?.status}
                      checked={checked[key] === 1}
                      onClick={(e) => {
                        e?.target?.checked
                          ? setChecked((prev) => {
                              prev[key] = 1;
                              return prev;
                            })
                          : setChecked((prev) => {
                              prev[key] = 0;
                              return prev;
                            });
                      }}
                    >
                      {item}
                    </Checkbox>
                  </React.Fragment>
                </td>
                <td className="Time_section">
                  <div className={styles["options"]}>
                    <div className={styles["options-box-1"]}>
                      <Select
                        showArrow
                        size="large"
                        value={values[key]?.start_time ?? "09:00:00"}
                        className={styles["options-box-1_select"]}
                        onChange={(e) => onChangeHandler(e, key, "start_time")}
                      >
                        {hours.map((item, index) => (
                          <Option
                            key={index}
                            value={item.label}
                            id={index}
                            className={styles["selectoptions"]}
                          >
                            {item.label}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <span>-</span>
                    <div className={styles["options-box-1"]}>
                      <Select
                        showArrow
                        size="large"
                        value={values[key]?.end_time ?? "09:00:00"}
                        className={styles["options-box-1_select"]}
                        onChange={(e) => onChangeHandler(e, key, "end_time")}
                      >
                        {hours.map((item, index) => (
                          <Option key={index} value={item.label}>
                            {item.label}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </td>
                {/* <td>
                    <div className={styles["icons"]}>
                      <Image
                        src={Images.edit_table_btn}
                        alt="edit"
                        id={days.id}
                      />
                    </div>
                  </td> */}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default DoctorAvailabilityTable;

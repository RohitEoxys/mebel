import { useForm } from "@/components/Common/hooks/form-hook";
import { Button } from "@/components/Common/UI/Button/Button";
import Input from "@/components/Common/UI/Input/Input";
import Options from "@/components/Common/UI/Options/Options";
import Images from "@/components/Images/Images";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./DoctorFormPopup.module.scss";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

const option = [
  {
    label: "rohit",
    value: "rohi",
  },
];

const DoctorFormPopup = () => {
  const [showHour, setShowHour] = useState(false);
  const [showMinute, setShowMinute] = useState(false);
  const [showEndHour, setShowEndHour] = useState(false);
  const [showEndMinute, setEndShowMinute] = useState(false);

  const [formState, inputHandler] = useForm(
    {
      doc_signup_name: {
        value: "",
        isValid: false,
      },
      doc_signup_email: {
        value: "",
        isValid: false,
      },
      doc_signup_mobileNumber: {
        value: "",
        isValid: false,
      },
      doc_signup_exequaturNumber: {
        value: "",
        isValid: false,
      },
      doc_signup_experience: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleHour = () => {
    setShowHour(!showHour);
  };
  const handleMinute = () => {
    setShowMinute(!showMinute);
  };
  const handleEndHour = () => {
    setShowEndHour(!showEndHour);
  };
  const handleEndMinute = () => {
    setEndShowMinute(!showEndMinute);
  };

  let minutes = [];
  for (let i = 1; i <= 60; i++) {
    minutes.push(i);
  }

  let hours = [];
  for (let i = 1; i <= 24; i++) {
    hours.push(i);
  }

  return (
    <>
      <div className={styles["doctor_form_popup_background"]}>
        <div className={styles["doctor_form_popup"]}>
          <div className="container">
            <div className={styles["doctor_form"]}>
              <div className={styles["input_form_list"]}>
                <div className={styles["Input_div"]}>
                  <Input
                    placeholder="Enter doctor name"
                    type="text"
                    label="Doctor Name"
                    labelClassName={styles.labelHead}
                    onInput={inputHandler}
                  />
                </div>
                <div className={styles["first_dropdown_div"]}>
                  <div className={styles["doctor_spac"]}>
                    Doctor Specialty
                  </div>
                  <Options
                    placeHolder="Select doctor by specialty"
                    option={option}
                  />
                </div>
                <div className={styles["first_dropdown_div"]}>
                  <div className={styles["doctor_spac"]}> Hospital Name </div>
                  <Options
                    placeHolder="Select doctor by hospital "
                    option={option}
                  />
                </div>
              </div>
              <div className={styles["day_time"]}>
                <div className={styles["day_div"]}>
                  <div className={styles["doctor_spac"]}> Day </div>
                  <Options placeHolder="Monday" option={option} />
                </div>
                {/* ============= start date ========== */}
                <div className={styles["day_div"]}>
                  <div className={styles["doctor_list_box_lebel"]}>
                    Start Time
                  </div>
                  <div className={styles["start_time_div"]}>
                    <span className={styles["hours"]} onClick={handleHour}>
                      02 Hour &nbsp; <Icon />
                    </span>
                    <span className={styles["divider"]}></span>
                    <span className={styles["minutes"]} onClick={handleMinute}>
                      50 Min &nbsp; <Icon />
                    </span>
                  </div>
                  {showHour ? (
                    <div className={styles["hours_drop"]}>
                      {hours.map((item, key) => (
                        <span className={styles["drop_hour"]} key={key}>
                          {" "}
                          {item} hour
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {showMinute ? (
                    <div className={styles["minutes_drop"]}>
                      {minutes.map((item, key) => (
                        <span className={styles["drop_time"]} key={key}>
                          {" "}
                          {item} min
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
                {/* ============== End date ============= */}
                <div className={styles["day_div"]}>
                  <div className={styles["doctor_list_box_lebel"]}>
                    {" "}
                    End Time{" "}
                  </div>
                  <div className={styles["start_time_div"]}>
                    <span className={styles["hours"]} onClick={handleEndHour}>
                      02 Hour &nbsp; <Icon />
                    </span>
                    <span className={styles["divider"]}></span>
                    <span
                      className={styles["minutes"]}
                      onClick={handleEndMinute}
                    >
                      50 Min &nbsp; <Icon />
                    </span>
                  </div>
                  {showEndHour ? (
                    <div className={styles["hours_drop"]}>
                      {hours.map((item, key) => (
                        <span className={styles["drop_hour"]} key={key}>
                          {item} hour
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {showEndMinute ? (
                    <div className={styles["minutes_drop"]}>
                      {minutes.map((item, key) => (
                        <span className={styles["drop_time"]} key={key}>
                          {" "}
                          {item} min
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className={styles["day_div"]}>
                  <div className={styles["btn_div"]}>
                    <Button name="Search" className={styles.doctorSeacrhBtn} />
                    <div className={styles["circle_cross"]}>
                      <Image src={Images.search_cross} alt="close icon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorFormPopup;

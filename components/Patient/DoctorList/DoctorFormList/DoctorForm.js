import { Button } from "@/components/Common/UI/Button/Button";
import Input from "@/components/Common/UI/Input/Input";
import Options from "@/components/Common/UI/Options/Options";
import Images from "@/components/Images/Images";
import Image from "next/image";
import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "./DoctorForm.module.scss";
import { useForm } from "@/components/Common/hooks/form-hook";
import FetchDataContext from "@/store/api-Context";
import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

const day = [
  {
    name: "Sunday",
    value: 1,
  },
  {
    name: "Monday",
    value: 2,
  },
  {
    name: "Tuesday",
    value: 3,
  },
  {
    name: "Wednesday",
    value: 4,
  },
  {
    name: "Thrusday",
    value: 5,
  },
  {
    name: "Friday",
    value: 6,
  },
  {
    name: "Sataurday",
    value: 7,
  },
];

const DoctorForm = ({ searchValues, setPage }) => {
  const contextData = useContext(FetchDataContext);
  const [showHour, setShowHour] = useState(false);
  const [showMinute, setShowMinute] = useState(false);
  const [showEndHour, setShowEndHour] = useState(false);
  const [showEndMinute, setEndShowMinute] = useState(false);
  const [value, setValue] = useState({});
  const specialty = contextData.specialityList;
  const hospital = contextData.hospitalList;

  useEffect(() => {
    contextData.getApiData("get-specialities", "specialityList");
  }, []);
  useEffect(() => {
    contextData.getApiData("get-hospitals", "hospitalList");
  }, []);

  const inputChangeHandler = (e) => {
    setValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

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
  for (let i = 0; i <= 59; i++) {
    minutes.push(i.toString().padStart(2, "0"));
  }

  let hours = [];
  for (let i = 0; i <= 23; i++) {
    hours.push(i.toString().padStart(2, "0"));
  }

  const selectRef = useRef();
  const optionRef = useRef(null);

  useEffect(() => {
    // Add event listener to handle click outside of dropdown
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      optionRef.current &&
      !optionRef.current.contains(event.target) &&
      selectRef.current &&
      !selectRef?.current?.contains(event.target)
    ) {
      setShowHour(false);
      setShowMinute(false);
      setShowEndHour(false);
      setEndShowMinute(false);
    }
  };

  const searchFilterHandler = () => {
    setPage(1);
    setValue((prev) => {
      return {
        ...prev,
      };
    });
    searchValues(value);
  };

  const clearAllData = () => {
    setValue(null);
    searchValues(null);
  };

  return (
    <>
      <div className="container">
        <div className={styles["doctor_form"]}>
          <div className={styles["input_form_list"]}>
            <div className={styles["Input_div"]}>
              <Input
                placeholder="Enter doctor name"
                type="text"
                name="doctor_name"
                label="Doctor Name"
                value={value?.doctor_name || ""}
                labelClassName={styles.labelHead}
                onInputChange={inputChangeHandler}
              />
            </div>
            <div className={styles["first_dropdown_div"]}>
              <div className={styles["doctor_spac"]}> Doctor Specialty </div>
              <Options
                setValue={setValue}
                name="specialty"
                placeHolder={
                  value?.specialty
                    ? JSON.parse(value?.specialty).name
                    : "Select doctor by specialty"
                }
                option={specialty?.data?.map((item) => {
                  return {
                    name: item?.name,
                    value: item?.id,
                  };
                })}
              />
            </div>
            <div className={styles["first_dropdown_div"]}>
              <div className={styles["doctor_spac"]}> Hospital Name </div>
              <Options
                setValue={setValue}
                name="hospital"
                placeHolder={
                  value?.hospital
                    ? JSON?.parse(value?.hospital).name
                    : "Select doctor by hospital"
                }
                option={hospital?.data?.map((item) => {
                  return {
                    name: item?.name,
                    value: item?.id,
                  };
                })}
              />
            </div>
          </div>
          <div className={styles["day_time"]}>
            <div className={styles["day_div"]}>
              <div className={styles["doctor_spac"]}> Day </div>
              <Options
                setValue={setValue}
                name="day"
                placeHolder={
                  value?.day ? JSON.parse(value?.day).name : "Select A Day"
                }
                option={day?.map((item) => {
                  return {
                    name: item?.name,
                    value: item?.value,
                  };
                })}
              />
            </div>
            {/* ============= start date ========== */}
            <div className={styles["day_div"]}>
              <div className={styles["doctor_list_box_lebel"]}>Start Time</div>
              <div className={styles["start_time_div"]}>
                <span
                  className={styles["hours"]}
                  onClick={handleHour}
                  ref={selectRef}
                >
                  {value?.start_hours || "00"} Hour &nbsp; <Icon />
                </span>
                <span className={styles["divider"]}></span>
                <span className={styles["minutes"]} onClick={handleMinute}>
                  {value?.start_minutes || "00"} Min &nbsp; <Icon />
                </span>
              </div>
              {showHour ? (
                <div className={styles["hours_drop"]} ref={optionRef}>
                  {hours?.map((item, key) => (
                    <span
                      className={styles["drop_hour"]}
                      key={key}
                      onClick={() => {
                        setValue((prev) => {
                          return {
                            ...prev,
                            start_hours: item,
                          };
                        });
                        setShowHour(false);
                      }}
                    >
                      {item} hour
                    </span>
                  ))}
                </div>
              ) : null}
              {showMinute ? (
                <div className={styles["minutes_drop"]} ref={optionRef}>
                  {minutes?.map((item, key) => (
                    <span
                      className={styles["drop_time"]}
                      key={key}
                      onClick={() => {
                        setValue((prev) => {
                          return {
                            ...prev,
                            start_minutes: item,
                          };
                        });
                        setShowMinute(false);
                      }}
                    >
                      {item} min
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            {/* ============== End date ============= */}
            <div className={styles["day_div"]}>
              <div className={styles["doctor_list_box_lebel"]}> End Time </div>
              <div className={styles["start_time_div"]}>
                <span className={styles["hours"]} onClick={handleEndHour}>
                  {value?.end_hours || "00"} Hour&nbsp; <Icon />
                </span>
                <span className={styles["divider"]}></span>
                <span className={styles["minutes"]} onClick={handleEndMinute}>
                  {value?.end_minutes || "00"} Min&nbsp; <Icon />
                </span>
              </div>
              {showEndHour ? (
                <div className={styles["hours_drop"]} ref={optionRef}>
                  {hours?.map((item, key) => (
                    <span
                      className={styles["drop_hour"]}
                      key={key}
                      onClick={() => {
                        setValue((prev) => {
                          return {
                            ...prev,
                            end_hours: item,
                          };
                        });
                        setShowEndHour(false);
                      }}
                    >
                      {" "}
                      {item} hour
                    </span>
                  ))}
                </div>
              ) : null}
              {showEndMinute ? (
                <div className={styles["minutes_drop"]} ref={optionRef}>
                  {minutes?.map((item, key) => (
                    <span
                      className={styles["drop_time"]}
                      key={key}
                      onClick={() => {
                        setValue((prev) => {
                          return {
                            ...prev,
                            end_minutes: item,
                          };
                        });
                        setEndShowMinute(false);
                      }}
                    >
                      {" "}
                      {item} min
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            <div className={styles["day_div"]}>
              <div className={styles["btn_div"]}>
                <Button
                  name="Search"
                  className={styles.doctorSeacrhBtn}
                  onClick={searchFilterHandler}
                />
                <div
                  className={styles["circle_cross"]}
                  onClick={value && clearAllData}
                >
                  <Image src={Images.search_cross} alt="close icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorForm;

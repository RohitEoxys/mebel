import { useRouter } from "next/router";
import { useContext, useEffect, useState, useRef } from "react";
import { DatePicker } from "antd";
import Image from "next/image";
import styles from "./signup.module.scss";
import Images from "@/components/Images/Images";
import FetchDataContext from "@/store/api-Context";
import SucessPopup from "../../Popup/SucessPopup";
import LoaderSpiner from "../../Loader/LoaderSpiner";
import TostifyContainer from "../../TostifyContainer/TostifyContainer";
import CustomDropdown from "../../UI/Dropdown/Custom/CustomDropdown";
import dayjs from "dayjs";

const Icon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.6668 2.66683H11.3335V2.00016C11.3335 1.82335 11.2633 1.65378 11.1382 1.52876C11.0132 1.40373 10.8436 1.3335 10.6668 1.3335C10.49 1.3335 10.3204 1.40373 10.1954 1.52876C10.0704 1.65378 10.0002 1.82335 10.0002 2.00016V2.66683H6.00016V2.00016C6.00016 1.82335 5.92992 1.65378 5.8049 1.52876C5.67988 1.40373 5.51031 1.3335 5.3335 1.3335C5.15668 1.3335 4.98712 1.40373 4.86209 1.52876C4.73707 1.65378 4.66683 1.82335 4.66683 2.00016V2.66683H3.3335C2.80306 2.66683 2.29436 2.87754 1.91928 3.25262C1.54421 3.62769 1.3335 4.1364 1.3335 4.66683V12.6668C1.3335 13.1973 1.54421 13.706 1.91928 14.081C2.29436 14.4561 2.80306 14.6668 3.3335 14.6668H12.6668C13.1973 14.6668 13.706 14.4561 14.081 14.081C14.4561 13.706 14.6668 13.1973 14.6668 12.6668V4.66683C14.6668 4.1364 14.4561 3.62769 14.081 3.25262C13.706 2.87754 13.1973 2.66683 12.6668 2.66683ZM13.3335 12.6668C13.3335 12.8436 13.2633 13.0132 13.1382 13.1382C13.0132 13.2633 12.8436 13.3335 12.6668 13.3335H3.3335C3.15668 13.3335 2.98712 13.2633 2.86209 13.1382C2.73707 13.0132 2.66683 12.8436 2.66683 12.6668V8.00016H13.3335V12.6668ZM13.3335 6.66683H2.66683V4.66683C2.66683 4.49002 2.73707 4.32045 2.86209 4.19542C2.98712 4.0704 3.15668 4.00016 3.3335 4.00016H4.66683V4.66683C4.66683 4.84364 4.73707 5.01321 4.86209 5.13823C4.98712 5.26326 5.15668 5.3335 5.3335 5.3335C5.51031 5.3335 5.67988 5.26326 5.8049 5.13823C5.92992 5.01321 6.00016 4.84364 6.00016 4.66683V4.00016H10.0002V4.66683C10.0002 4.84364 10.0704 5.01321 10.1954 5.13823C10.3204 5.26326 10.49 5.3335 10.6668 5.3335C10.8436 5.3335 11.0132 5.26326 11.1382 5.13823C11.2633 5.01321 11.3335 4.84364 11.3335 4.66683V4.00016H12.6668C12.8436 4.00016 13.0132 4.0704 13.1382 4.19542C13.2633 4.32045 13.3335 4.49002 13.3335 4.66683V6.66683Z"
        fill="#2A2E51"
      />
    </svg>
  );
};

const genderSelect = [
  { label: "Select", value: "default" },
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Non Binary", value: "Non binary" },
];

const maritalStatusValues = [
  { label: "Married", value: "married" },
  { label: "Unmarried", value: "unmarried" },
  ,
];

export default function Signup() {
  const contextData = useContext(FetchDataContext);

  const router = useRouter();
  const [values, setValues] = useState();
  const [name, setName] = useState(null);
  const [dateValues, setDateValues] = useState(null);
  const [errors, setErrors] = useState({});
  const [gender, setGender] = useState(false);
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [maritalStatusValue, setMaritalStatusValue] = useState(null);
  const [errorDisplay, setErrorDisplay] = useState(true);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        gender &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setGender(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  });

  const handelOpen = () => {
    setPopup(
      <SucessPopup
        setPopup={setPopup}
        messageHead="Congratulations!"
        message="Your registration was successfully done"
      />
    );
  };

  console.log(errors);

  const onInputChange = (e, maxLength) => {
    if (e.target.name === "firstName" || e.target.name === "lastName") {
      setName((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });

      setErrors((prev) => {
        return {
          ...prev,
          [e.target.name]: false,
        };
      });
    } else {
      setValues((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value.slice(0, maxLength),
        };
      });
      setErrors((prev) => {
        return {
          ...prev,
          [e.target.name]: false,
        };
      });
    }

    // if (e.target.name === "firstName" || e.target.name === "lastName") {
    //   Object.keys(name).forEach((key) => {
    //     if (name[key] === "") {
    //       delete name[key];
    //     }
    //   });
    // } else {
  };

  if (values) {
    Object.keys(values).forEach((key) => {
      if (values[key] === "") {
        delete values[key];
      }
    });
  }

  if (name) {
    Object.keys(name).forEach((key) => {
      if (name[key] === "") {
        delete name[key];
      }
    });
  }

  const dateChangeHandler = (date, dateString) => {
    setDateValues(dateString);
    setErrors((prev) => {
      return {
        ...prev,
        dob: false,
      };
    });
  };

  console.log(dateValues);

  const signupBtnClickHandler = (e) => {
    e.preventDefault();
    let errorExist = false;
    let errorsObject = {};

    if (
      name?.firstName === "" ||
      name?.firstName === null ||
      name?.firstName === undefined
    ) {
      errorsObject.firstName = "Please enter your firstname";
      errorExist = true;
    } else if (!/^((?=.*[a-zA-Z])[a-zA-Z0-9\s]+)$/.test(name?.firstName)) {
      errorsObject.firstName = "Please enter valid firstname";
      errorExist = true;
    }

    if (!/^((?=.*[a-zA-Z])[a-zA-Z0-9\s]+)$/.test(name?.lastName)) {
      errorsObject.lastName = "Please enter valid lastname";
      errorExist = true;
    }

    if (
      values?.email === "" ||
      values?.email === null ||
      values?.email === undefined
    ) {
      errorsObject.email = "Please enter your email";
      errorExist = true;
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values?.email)
    ) {
      errorsObject.email = "Please type a valid email address";
      errorExist = true;
    }

    if (
      values?.insurance_number === "" ||
      values?.insurance_number === null ||
      values?.insurance_number === undefined
    ) {
      errorsObject.insurance_number = "Please enter your insurance number";
      errorExist = true;
    }

    if (
      values?.number === "" ||
      values?.number === null ||
      values?.number === undefined
    ) {
      errorsObject.number = "Please enter your mobile number";
      errorExist = true;
    } else if (values?.number?.length < 8) {
      errorsObject.number = "Mobile number should be minimum 8";
      errorExist = true;
    } else if (values?.number?.length > 12) {
      errorsObject.number = "Mobile number should be maximum 12";
    }

    if (values?.emergency_contact?.length < 8) {
      errorsObject.emergency_contact = "Emergency should be minimum 8";
      errorExist = true;
    } else if (values?.emergency_contact?.length > 12) {
      errorsObject.emergency_contact = "Emergency should be maximum 12";
    }

    if (!dateValues) {
      errorsObject.dob = "Please select DOB";
      errorExist = true;
    }

    if (errorExist) {
      setErrors(errorsObject);
      return false;
    }

    setLoading(true);
    // ===== api call and send the all data ======
    contextData.postAPI(
      "sign-up",
      {
        ...values,
        marital_status: maritalStatusValue
          ? maritalStatusValue.value
          : "married",
        dob: dateValues && dateValues,
        name: name?.firstName,
        last_name: name?.lastName,
        user_type: "patient",
      },
      handelOpen,
      setLoading
    );
  };

  const moveToSignIn = () => {
    router.push("/patient/login");
  };

  if (contextData.errorMsg) {
    setTimeout(() => {
      setErrorDisplay(false);
    }, 5000);
  }

  const maritalStatusItemClickHandler = (item) => {
    setMaritalStatusValue(item);
  };

  const maritalStatus = maritalStatusValues.map((item) => {
    return (
      <div
        className={styles["maritalStatus"]}
        onClick={(e) => maritalStatusItemClickHandler(item)}
        key={item.label}
      >
        <span>{item.label}</span>
      </div>
    );
  });

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > dayjs().endOf("day");
  };

  return (
    <>
      <TostifyContainer />
      <div className={styles["main"]}>
        <div className="container">
          <div className={styles["main-div"]}>
            <div className={styles["signup_div_cornor"]}>
              <Image src={Images.bg_arc3} alt="icon" />
            </div>
            <div className={styles["patient_signup"]}>
              <div className={styles["signup_left"]}>
                <Image
                  src={Images.patient_signup_main}
                  alt="patient login form"
                />
              </div>
              <div className={styles["signup_right"]}>
                <div className={styles["signup_head"]}>Sign Up</div>
                <div className={styles["signup_content"]}>
                  Enter your details below to get stared.
                </div>
                <div className={styles["number_form_inp"]}>
                  <div className={styles["number_inp"]}>
                    <div className={styles["firstName"]}>
                      <label
                        className={styles["number_form_label"]}
                        htmlFor="patientSignupName"
                      >
                        First Name
                      </label>

                      <input
                        type="text"
                        placeholder="Enter Your First Name"
                        id="patientSignupName"
                        name="firstName"
                        onChange={onInputChange}
                        value={values?.firstName}
                        className={styles["input"]}
                      />
                      <span className="erors_message">
                        {errors.firstName && errors.firstName}
                      </span>
                    </div>

                    <div className={styles["lastName"]}>
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        placeholder="Enter Your Last Name"
                        id="lastName"
                        name="lastName"
                        onChange={onInputChange}
                        value={values?.lastName}
                        className={styles["input"]}
                      />
                      <span className="erors_message">
                        {errors.lastName && errors.lastName}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles["your_otp_form"]}>
                  <div className={styles["number_inp"]}>
                    <div className={styles["email"]}>
                      <label
                        className={styles["your_otp_label"]}
                        htmlFor="patientSignupEmail"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter Your Email Id"
                        id="patientSignupEmail"
                        name="email"
                        onChange={onInputChange}
                        value={values?.email}
                        className={styles["input"]}
                      />

                      <span className="erors_message">
                        {errors.email && errors.email}
                      </span>
                    </div>
                    <div className={styles["insurance"]}>
                      <label
                        className={styles["your_otp_label"]}
                        htmlFor="insurance"
                      >
                        Insurance Number
                      </label>
                      <input
                        type="number"
                        placeholder="Enter Insurance Number"
                        id="insurance"
                        name="insurance_number"
                        onChange={(e) => onInputChange(e, 15)}
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        value={values?.insurance_number}
                        className={styles["input"]}
                      />

                      <span className="erors_message">
                        {errors.insurance_number && errors.insurance_number}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles["your_otp_form"]}>
                  <div className={styles["number_inp"]}>
                    <div className={styles["mobile"]}>
                      <label
                        className={styles["your_otp_label"]}
                        htmlFor="patientSignupNumber"
                      >
                        Mobile Number
                      </label>
                      <input
                        type="number"
                        placeholder="Enter Your Mobile Number"
                        id="patientSignupNumber"
                        name="number"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        onChange={(e) => onInputChange(e, 12)}
                        value={values?.number}
                        onWheel={(e) => e.target.blur(e)}
                        className={styles["input"]}
                      />

                      <span className="erors_message">
                        {errors.number && errors.number}
                      </span>
                    </div>
                    <div className={styles["emergencyContact"]}>
                      <label
                        className={styles["your_otp_label"]}
                        htmlFor="emergencyNumber"
                      >
                        Emergency Contact
                      </label>
                      <input
                        type="number"
                        placeholder="Enter Emergency Contact"
                        id="emergencyNumber"
                        name="emergency_contact"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        onChange={(e) => onInputChange(e, 12)}
                        value={values?.emergency_contact}
                        onWheel={(e) => e.target.blur(e)}
                        className={styles["input"]}
                      />
                      <span className="erors_message">
                        {errors.emergency_contact && errors.emergency_contact}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles["your_otp_form"]}>
                  <div className={styles["number_inp"]}>
                    <div className={styles["birthPicker"]}>
                      <div className={styles["birthLabel"]}>Date of birth</div>
                      <DatePicker
                        id="birthPickerId"
                        placeholder="Enter Your Date-of-birth"
                        onChange={dateChangeHandler}
                        suffixIcon={<Icon />}
                        className={styles["mainDatePicker"]}
                        disabledDate={disabledDate}
                      />
                      <span className="erors_message">
                        {errors.dob && errors.dob}
                      </span>
                    </div>
                    <div className={styles["mobile"]}>
                      <label
                        className={styles["your_otp_label"]}
                        htmlFor="Cedula"
                      >
                        Cedula
                      </label>
                      <input
                        type="number"
                        placeholder="Enter Your Cedula"
                        className={styles["input"]}
                        id="Cedula"
                        name="cedula"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        onChange={(e) => onInputChange(e, 15)}
                        value={values?.cedula}
                        onWheel={(e) => e.target.blur(e)}
                      />
                    </div>
                  </div>
                  <span className="erors_message">
                    {errors.cedula && errors.cedula}
                  </span>
                </div>
                {/* <div className={styles["age_gender_div"]}>
                  <div className={styles["age_div"]}>
                    <div className={styles["age_with_label"]}>Your Age *</div>
                    <div className={styles["age_inp"]}>
                      <input
                        type="text"
                        placeholder="Enter Your Age"
                        id="patientSignupAge"
                        name="age"
                        maxLength={3}
                        onKeyPress={(e) => {
                          const charCode = e.which ? e.which : e.keyCode;
                          if (charCode < 48 || charCode > 57) {
                            e.preventDefault();
                          }
                        }}
                        onChange={onInputChange}
                        value={values?.age}
                      />
                    </div>
                    <span className="erors_message">
                      {errors.age && errors.age}
                    </span>
                  </div>
                  <div className={styles["gender_div"]}>
                    <div className={styles["gender_label"]}>Sex *</div>

                    <div ref={dropdownRef}>
                      <div
                        className={`${
                          !gender.show
                            ? styles["drop_gender"]
                            : styles["bordered"]
                        } `}
                        onClick={() => {
                          setGender(!gender);
                        }}
                      >
                        <div className={styles["gender_name"]}>
                          {values.sex}
                        </div>
                        <div>
                          <Icon />
                        </div>
                      </div>
                      <span className="erors_message">
                        {errors.sex && errors.sex}
                      </span>
                      {gender ? (
                        <div className={styles["option_genders"]}>
                          {genderSelect.map((item, key) =>
                            item.value != "default" ? (
                              <div
                                className={styles["male_option"]}
                                value={item.value}
                                key={key}
                                onClick={(e) => {
                                  setValues((prev) => {
                                    return {
                                      ...prev,
                                      sex: item.value,
                                    };
                                  });
                                  setGender(false);
                                  setErrors((prev) => {
                                    return {
                                      ...prev,
                                      sex: false,
                                    };
                                  });
                                }}
                              >
                                {item.label}
                              </div>
                            ) : null
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div> */}
                <div className={styles["maritalStatusLabel"]}>
                  Marital Status
                </div>
                <CustomDropdown
                  arrow
                  placeholder={
                    maritalStatusValue ? maritalStatusValue.label : "Married"
                  }
                  selectMenu={maritalStatus}
                  startDropClass={styles["startDropClass"]}
                  divider
                  overFlowHide
                  placeholderClass={
                    maritalStatusValue && styles["speciality_placeholder"]
                  }
                  boxClass={styles["boxClass"]}
                />

                <div className={styles["your_otp_form"]}>
                  <div className={styles["number_inp"]}>
                    <div className={styles["address"]}>
                      <label
                        className={styles["your_otp_label"]}
                        htmlFor="Address"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Address"
                        id="Address"
                        name="address"
                        onChange={onInputChange}
                        value={values?.address}
                        onWheel={(e) => e.target.blur(e)}
                        className={styles["input"]}
                      />
                    </div>
                  </div>
                  <span className="erors_message">
                    {errors.address && errors.address}
                  </span>
                </div>

                <div className={styles["sign_btn_div"]}>
                  <button
                    className={styles["sign_btn"]}
                    onClick={signupBtnClickHandler}
                    id="patientSignup"
                  >
                    Sign Up
                  </button>
                </div>
                <div className={styles["account_do_not"]}>
                  Already have an account?
                  <span
                    className={styles["signup_link"]}
                    onClick={moveToSignIn}
                  >
                    &nbsp;Sign In
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {popup}
      {loading ? <LoaderSpiner /> : null}
    </>
  );
}

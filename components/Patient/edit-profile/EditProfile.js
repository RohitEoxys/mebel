import Images from "@/components/Images/Images";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useRouter } from "next/router";

import styles from "./EditProfile.module.scss";
import { Button } from "@/components/Common/UI/Button/Button";
import FetchDataContext from "@/store/api-Context";
import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";
import EditPresetQuestions from "./preset-questions/EditPresetQuestions";
import { DatePicker } from "antd";
import CustomDropdown from "@/components/Common/UI/Dropdown/Custom/CustomDropdown";
import dayjs from "dayjs";
import moment from "moment";

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

const maritalStatusValues = [
  { label: "Married", value: "married" },
  { label: "Unmarried", value: "unmarried" },
];

const EditProfile = () => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState();
  const [file, setFile] = useState([]);
  const [image, setImage] = useState(null);
  const [maritalStatusValue, setMaritalStatusValue] = useState(null);
  const [values, setValues] = useState({});
  const [defaultDate, setDefaultDate] = useState();

  const [dateValues, setDateValues] = useState(null);

  const contextData = useContext(FetchDataContext);
  const patientProfile = contextData?.patientProfile?.data;

  useEffect(() => {
    if (patientProfile) {
      setValues({
        ...patientProfile,
      });
    }
  }, [patientProfile]);

  useEffect(() => {
    if (values) {
      setDefaultDate(values?.dob);
      setDateValues(values?.dob);
    }
  }, [values]);

  useEffect(() => {
    contextData.getApiData("get-patient-profile", "patientProfile", setLoading);
  }, []);

  const onInputChange = (e, id) => {
    const updateValues = e.target.value;
    const existingValues = values;
    setValues({
      ...existingValues,
      [e.target.name]: updateValues,
    });
    setErrors((prev) => {
      return {
        ...prev,
        [e.target.name]: false,
      };
    });
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > dayjs().endOf("day");
  };
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

  const dateFormat = "YYYY-MM-DD";

  const saveBtnClickHandler = (e) => {
    e.preventDefault();
    let errorExist = false;
    let errorsObject = {};

    if (!/^(?=.*[a-z])(?=.*[^A-Z]).{1,}$/.test(values?.name)) {
      errorsObject.name = "Please enter valid firstName";
      errorExist = true;
    } else if (!/^((?=.*[a-zA-Z])[a-zA-Z0-9\s]+)$/.test(values?.name)) {
      errorsObject.name = "Please enter valid firstname";
      errorExist = true;
    }

    if (!/^(?=.*[a-z])(?=.*[^A-Z]).{1,}$/.test(values?.last_name)) {
      errorsObject.last_name = "Please enter valid lastName";
      errorExist = true;
    } else if (!/^((?=.*[a-zA-Z])[a-zA-Z0-9\s]+)$/.test(values?.last_name)) {
      errorsObject.last_name = "Please enter valid firstname";
      errorExist = true;
    }

    if (!/^(?=.*[a-z])(?=.*[^A-Z]).{1,}$/.test(values?.last_name)) {
      errorsObject.last_name = "Please enter valid lastName";
      errorExist = true;
    }

    if (values?.insurance_number?.length < 15) {
      errorsObject.insurance_number = "Minimum 15 digits";
      errorExist = true;
    } else if (values?.insurance_number.length > 15) {
      errorsObject.insurance_number = "Max 15 digits";
      errorExist = true;
    }

    if (values?.emergency_contact?.length < 12) {
      errorsObject.emergency_contact = "Minimum 12 digits";
      errorExist = true;
    } else if (values?.emergency_contact?.length > 12) {
      errorsObject.emergency_contact = "Max 12 digits";
      errorExist = true;
    }

    if (values?.cedula?.length < 15) {
      errorsObject.cedula = "Minimum 15 digits";
      errorExist = true;
    } else if (values?.cedula?.length > 15) {
      errorsObject.cedula = "Max 15 digits";
      errorExist = true;
    }

    if (!dateValues) {
      errorsObject.dob = "Enter valid date";
      errorExist = true;
    }

    if (errorExist) {
      setErrors(errorsObject);
      return false;
    }

    // ===== api call and send the all data ======
    const formData = new FormData();

    if (file?.name) formData.append("profile_image", file);

    if (values?.name) {
      formData.append("name", values?.name);
    }
    if (values?.last_name) {
      formData.append("last_name", values?.last_name);
    }

    if (values?.address) {
      formData.append("address", values?.address);
    }

    if (values?.insurance_number) {
      formData.append("insurance_number", values?.insurance_number);
    }

    if (values?.emergency_contact) {
      formData.append("emergency_contact", values?.emergency_contact);
    }

    if (values?.cedula) {
      formData.append("cedula", values?.cedula);
    }

    formData.append("dob", dateValues ? dateValues : defaultDate);

    if (maritalStatusValue) {
      formData.append(
        "marital_status",
        maritalStatusValue ? maritalStatusValue.value : values?.marital_status
      );
    }

    setLoading(true);

    contextData.updatePatientProfile(
      "update-patient-profile",
      formData,
      setLoading
    );

    router.push("./profile");
  };

  const makeAppointmentClickhandler = () => {
    router.push("./doctor-list");
  };

  const onImageChange = (e) => {
    let img = e.target.files[0];

    let errorExists = false;
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(img?.type)) {
      setShowError("Image type must be JPG, PNG, JPEG.");
      errorExists = true;
    }
    if (errorExists) {
      return false;
    }
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (img.size > maxSize) {
      setShowError("File size must be less than 5 MB.");
      errorExists = true;
    }
    if (errorExists) {
      return false;
    }

    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(img);
    setShowError("");
  };

  const dateChangeHandler = (date, dateString) => {
    setDateValues(dateString);
  };

  return (
    <div className={styles["main_container"]}>
      <div className={styles["background-design-1"]}>
        <Image src={Images?.background_arc_design.src} alt="icon" />
      </div>
      <Container>
        <Row>
          <Col md={4}>
            <div className={styles["main_container-top-left"]}>
              <div className={styles["background-design-2"]}>
                <Image
                  src={Images.doc_profile_bg.src}
                  style={{ width: "100%" }}
                  alt="bg"
                />
              </div>
              <div className={styles["main_container-top-left-icon"]}>
                <Image
                  src={`  ${!image ? patientProfile?.profile_image : image}`}
                  alt="patient_profile_icon"
                  className={styles["profile_icon"]}
                />
                <label htmlFor="editIcon">
                  <Image
                    src={Images.profile_edit_icon.src}
                    alt="patient_edit_icon"
                    className={styles["patient_edit_icon"]}
                    // onClick={onEditIconClickHandler}
                  />
                </label>
                <input
                  type="file"
                  id="editIcon"
                  style={{ display: "none" }}
                  onChange={(e) => onImageChange(e)}
                />
              </div>
              <h1
                className={styles["fullName"]}
              >{`${patientProfile?.name} ${patientProfile?.last_name}`}</h1>
              <h6>Mobile Number : {patientProfile?.number}</h6>
              <h6>Email ID : {patientProfile?.email}</h6>

              <Button
                name="Make an Appointment"
                width="80%"
                className={styles["make_appointment_btn"]}
                onClick={makeAppointmentClickhandler}
              />
            </div>
          </Col>
          <Col md={8} className={styles["right_col"]}>
            <div className={styles["right"]}>
              <div className={styles["number_form_inp"]}>
                <div className={styles["number_inp"]}>
                  <div className={styles["firstName"]}>
                    <label
                      className={styles["number_form_label"]}
                      htmlFor="name"
                    >
                      First Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter Your First Name"
                      id="name"
                      name="name"
                      onChange={(e) => onInputChange(e)}
                      value={values?.name}
                      className={styles["input"]}
                    />

                    <span className="erors_message">
                      {errors.name && errors.name}
                    </span>
                  </div>

                  <div className={styles["lastName"]}>
                    <label htmlFor="last_name">Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter Your Last Name"
                      id="last_name"
                      name="last_name"
                      onChange={onInputChange}
                      value={values?.last_name}
                      className={styles["input"]}
                    />
                    <span className="erors_message">
                      {errors.last_name && errors.last_name}
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
                      disabled
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
                      disabled
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
                    {defaultDate ? (
                      <DatePicker
                        id="birthPickerId"
                        onChange={dateChangeHandler}
                        suffixIcon={<Icon />}
                        className={styles["mainDatePicker"]}
                        defaultValue={dayjs(defaultDate, dateFormat)}
                        format={dateFormat}
                        disabledDate={disabledDate}
                      />
                    ) : null}
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
                    <span className="erors_message">
                      {errors.cedula && errors.cedula}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles["maritalStatusLabel"]}>Marital Status</div>
              <CustomDropdown
                arrow
                placeholder={
                  maritalStatusValue
                    ? maritalStatusValue.label
                    : values?.marital_status
                }
                selectMenu={maritalStatus}
                startDropClass={styles["startDropClass"]}
                divider
                overFlowHide
                placeholderClass={styles["speciality_placeholder"]}
                boxClass={styles["boxClass"]}
                mainClass={styles["mainClass"]}
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
              <div className={styles["btnDiv"]}>
                <Button
                  name="Save Profile"
                  className={styles["save_profile_main"]}
                  mainDiv={styles["save_profile"]}
                  onClick={saveBtnClickHandler}
                />
                <div className={styles["erors_message"]}>{showError}</div>
              </div>
            </div>
            <div className={styles["presetQuestions_section"]}>
              <EditPresetQuestions setLoading={setLoading} />
            </div>
          </Col>
        </Row>
      </Container>
      {loading ? <LoaderSpiner /> : null}
    </div>
  );
};

export default EditProfile;

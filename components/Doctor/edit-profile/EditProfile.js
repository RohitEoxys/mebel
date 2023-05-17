import Images from "@/components/Images/Images";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useRouter } from "next/router";

import styles from "./editProfile.module.scss";
import { Button } from "@/components/Common/UI/Button/Button";
import FetchDataContext from "@/store/api-Context";
import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";
import Link from "next/link";
import Input from "@/components/Common/UI/Input/Input";
import CustomDropdown from "@/components/Common/UI/Dropdown/Custom/CustomDropdown";
import { Checkbox } from "antd";
import StarRating from "@/components/Common/Rating/Rating";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

const EditProfile = () => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState();
  const [file, setFile] = useState([]);
  const [forSubmitValues, setForSubmitValues] = useState([]);

  const [specialityName, setSpecialityName] = useState([]);
  const [educationName, setEducationName] = useState([]);
  const [hospitalName, setHospitalName] = useState([]);

  const [specialityValue, setSpecialityValue] = useState([]);
  const [educationValue, setEducationValue] = useState([]);
  const [hospitalValue, setHospitalValue] = useState([]);

  const contextData = useContext(FetchDataContext);
  const educationList = contextData.educationList;
  const specialityList = contextData.specialityList;
  const hospitalList = contextData.hospitalList;

  useEffect(() => {
    contextData.getApiData("get-educations", "educationList");
  }, []);

  useEffect(() => {
    contextData.getApiData("get-specialities", "specialityList");
  }, []);

  useEffect(() => {
    contextData.getApiData("get-hospitals", "hospitalList");
  }, []);

  const doctorProfile = contextData?.doctorProfile || [];

  const [values, setValues] = useState({
    label: doctorProfile ? doctorProfile?.sex : "select",
  });

  useEffect(() => {
    setLoading(true);
    contextData.getApiData("get-doctor-profile", "doctorProfile", setLoading);
  }, []);

  const onInputChange = (e) => {
    setForSubmitValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    setErrors((prev) => {
      return {
        ...prev,
        [e.target.name]: false,
      };
    });
  };

  const saveBtnClickHandler = (e) => {
    e.preventDefault();
    let errorExist = false;
    let errorsObject = {};

    if (!/^(?=.*[a-z])(?=.*[^A-Z]).{1,}$/.test(forSubmitValues?.name)) {
      errorsObject.name = "Please enter valid name";
      errorExist = true;
    }

    if (forSubmitValues?.age > 150) {
      errorsObject.age = "Age should be maximum 150";
      errorExist = true;
    }

    if (values.sex === "Select") {
      errorsObject.sex = "Please select option";
      errorExist = true;
    }
    if (errorExist) {
      setErrors(errorsObject);
      return false;
    }

    // ===== api call and send the all data ======
    const formData = new FormData();

    if (file?.name) formData.append("profile_image", file);

    if (forSubmitValues?.name && forSubmitValues?.name.length > 0) {
      formData.append("name", forSubmitValues?.name);
    }
    if (forSubmitValues?.age && forSubmitValues?.age.length > 0) {
      formData.append("age", Number(forSubmitValues?.age));
    }
    if (values?.sex && values?.sex !== "default") {
      formData.append("sex", values?.sex);
    }

    // setLoading(true);

    // contextData.updatePatientProfile(
    //   "update-patient-profile",
    //   formData,
    //   setLoading
    // );
  };

  const specialitySelectedValues = (item) => {
    if (specialityValue.includes(item)) {
      setSpecialityValue((prevState) =>
        prevState.filter((existing) => existing !== item)
      );
    } else {
      setSpecialityValue((prevState) => [item, ...prevState]);
    }
  };

  const specialitySelectedNames = (item) => {
    if (specialityName.includes(item)) {
      setSpecialityName((prevState) =>
        prevState.filter((existing) => existing !== item)
      );
    } else {
      setSpecialityName((prevState) => [item, ...prevState]);
    }
  };

  const educationSelectedValues = (item) => {
    if (educationValue.includes(item)) {
      setEducationValue((prevState) =>
        prevState.filter((existing) => existing !== item)
      );
    } else {
      setEducationValue((prevState) => [item, ...prevState]);
    }
  };

  const educationSelectedNames = (item) => {
    if (educationName.includes(item)) {
      setEducationName((prevState) =>
        prevState.filter((existing) => existing !== item)
      );
    } else {
      setEducationName((prevState) => [item, ...prevState]);
    }
  };

  const hospitalSelectedValues = (item) => {
    if (hospitalValue.includes(item)) {
      setHospitalValue((prevState) =>
        prevState.filter((existing) => existing !== item)
      );
    } else {
      setHospitalValue((prevState) => [item, ...prevState]);
    }
  };
  const hospitalSelectedNames = (item) => {
    if (hospitalName.includes(item)) {
      setHospitalName((prevState) =>
        prevState.filter((existing) => existing !== item)
      );
    } else {
      setHospitalName((prevState) => [item, ...prevState]);
    }
  };

  const specialityChangeHandler = (e) => {
    specialitySelectedValues(e.target.id);
    specialitySelectedNames(e.target.value);
  };

  const hospitalChangeHandler = (e) => {
    hospitalSelectedValues(e.target.id);
    hospitalSelectedNames(e.target.value);
  };

  const educationChangeHandler = (e) => {
    educationSelectedValues(e.target.id);
    educationSelectedNames(e.target.value);
  };

  const askforReveiwBtnClickHandler = () => {
    router.push("/doctor/reviews");
  };

  const specialityCheckbox = specialityList?.data?.map((e, index) => (
    <Checkbox
      key={index}
      className={styles["checkboxtypo"]}
      onChange={specialityChangeHandler}
      value={e.name}
      id={e.id}
    >
      {e.name}
    </Checkbox>
  ));

  const hospitalCheckbox = hospitalList?.data?.map((e, index) => (
    <Checkbox
      key={index}
      className={styles["checkboxtypo"]}
      onChange={hospitalChangeHandler}
      value={e.name}
      id={e.id}
    >
      {e.name}
    </Checkbox>
  ));

  // const educationSelect = educationList?.data?.map((e, index) => (
  //   <option
  //     className={styles["selectHover"]}
  //     key={index}
  //     onClick={educationChangeHandler}
  //     value={e.name}
  //     id={e.id}
  //   >
  //     {e.name}
  //   </option>
  // ));

  const educationSelect = educationList?.data?.map((e, index) => (
    <Checkbox
      key={index}
      className={styles["checkboxtypo"]}
      onChange={educationChangeHandler}
      value={e.name}
      id={e.id}
    >
      {e.name}
    </Checkbox>
  ));

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
    setFile(img);
    setShowError("");
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
                  src={doctorProfile?.profile_image}
                  alt="patient_profile_icon"
                  className={styles["profile_icon"]}
                  roundedCircle
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
              <h1>{doctorProfile?.name}</h1>
              <h6>{doctorProfile?.specialities?.join(", ")}</h6>
              <h6>Exequatur No. :{doctorProfile?.exequatur_no}</h6>

              <div className={styles["left_star_section"]}>
                <span className={styles["left_star_section-stars"]}>
                  <StarRating rating={doctorProfile?.ratings} />
                </span>
                <span className={styles["left_star_section-text"]}>
                  ({doctorProfile?.ratings} Of {doctorProfile?.review_count}
                  &nbsp;Review)
                </span>
              </div>

              <div className={styles["subscribe_section"]}>
                <div className={styles["subscribe_section_text"]}>
                  <h5 className={styles["subscribe_section_text_left"]}>
                    Subscribed Plan :
                  </h5>
                  <h5 className={styles["subscribe_section_text_right"]}>
                    $10/month
                  </h5>
                </div>
                <div className={styles["subscribe_section_bottom"]}>
                  <Link href="#">Upgrade plan</Link>
                </div>
              </div>

              <div className={styles["review_btn"]}>
                <Button
                  name="Ask For Review"
                  className={styles["review_btn-button"]}
                  inlineStyle={{ paddingLeft: "45px", position: "relative" }}
                  onClick={askforReveiwBtnClickHandler}
                />
                <Image src={Images.btn_star_icon.src} alt="star_icon" />
              </div>
            </div>
          </Col>
          <Col md={8} className={styles["right_col"]}>
            <div className={styles["right"]}>
              <h1>Personal information</h1>

              <div style={{ marginBottom: 15 }}>
                <label className={styles["field-label"]}> Your Name </label>
                <Input
                  className={styles["input-field-1"]}
                  type="text"
                  placeholder="Enter Your Name"
                  length="100%"
                  id="doc_signup_name"
                  value={values?.doc_signup_name}
                  onInputChange={onInputChange}
                  errorText={errors.doc_signup_name}
                />
              </div>
              <div style={{ marginBottom: 15 }}>
                <label className={styles["field-label"]}>Email ID </label>
                <Input
                  type="text"
                  className={styles["input-field-3"]}
                  placeholder="Enter Your E-Mail ID"
                  length="100%"
                  id="doc_signup_email"
                  value={values?.doc_signup_email}
                  onInputChange={onInputChange}
                  errorText={errors.doc_signup_email}
                  disabled
                />
              </div>
              <label className={styles["field-label"]}>Phone Number</label>
              <div style={{ marginBottom: 15 }}>
                <Input
                  type="number"
                  className={styles["input-field-2"]}
                  placeholder="Enter Your Mobile Number"
                  length="100%"
                  id="doc_signup_mobile"
                  value={values?.doc_signup_mobile}
                  onInputChange={(e) => onInputChange(e, 10)}
                  errorText={errors.doc_signup_mobile}
                  maxLength={10}
                  disabled
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  className={styles["field-label"]}
                  style={{ marginBottom: "7px" }}
                >
                  Education
                </label>

                <CustomDropdown
                  placeholder={
                    educationName?.map((item) => item).join(", ") ||
                    "Select your education"
                  }
                  placeholderClass={
                    educationName.length > 0 && styles["speciality_placeholder"]
                  }
                  selectedItems={educationSelect}
                  dropdownTitle="Select your Specialty"
                  arrow={true}
                  checkbox={educationSelect}
                  mainClass={styles["input_speciality"]}
                  boxClass={styles["input_box"]}
                  type="checkbox"
                  errorText={educationValue?.length > 0 ? "" : errors.education}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  className={styles["field-label"]}
                  style={{ marginBottom: "7px" }}
                >
                  Speciality
                </label>
                <CustomDropdown
                  placeholder={
                    specialityName?.map((item) => item).join(", ") ||
                    "Select your Specialty"
                  }
                  selectedItems={specialityName}
                  dropdownTitle="Select your Specialty"
                  arrow={true}
                  checkbox={specialityCheckbox}
                  mainClass={styles["input_speciality"]}
                  boxClass={styles["input_box"]}
                  type="checkbox"
                  errorText={
                    specialityValue?.length > 0 ? "" : errors.speciality
                  }
                  placeholderClass={
                    specialityName.length > 0 &&
                    styles["speciality_placeholder"]
                  }
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  className={styles["field-label"]}
                  style={{ marginBottom: "7px" }}
                >
                  Hospital Name
                </label>
                <CustomDropdown
                  placeholder={
                    hospitalName?.map((item) => item).join(", ") ||
                    "Select your Hospital Name"
                  }
                  placeholderClass={
                    hospitalName.length > 0 && styles["speciality_placeholder"]
                  }
                  dropdownTitle="Select your Hospital "
                  arrow={true}
                  checkbox={hospitalCheckbox}
                  mainClass={styles["input_speciality"]}
                  boxClass={styles["input_box"]}
                  type="checkbox"
                  errorText={hospitalValue?.length > 0 ? "" : errors.hospital}
                />
              </div>
              <div className={styles["exequatorNumberInput"]}>
                <label className={styles["field-label"]}>
                  Exequatur Number
                </label>
                <Input
                  type="text"
                  className={styles["input-field-2"]}
                  placeholder="Select Exequatur Number"
                  length="100%"
                  id="doc_signup_exequatur"
                  value={values?.doc_signup_exequatur}
                  onInputChange={(e) => onInputChange(e, 8)}
                  errorText={errors.doc_signup_exequatur}
                  maxChar={8}
                  disabled
                />
              </div>

              <div>
                <label className={styles["field-label"]}>Experience</label>
                <Input
                  type="number"
                  className={styles["input-field-2"]}
                  placeholder="Enter Your Experience"
                  length="100%"
                  mainInputClass={styles["mainInput"]}
                  inputContainer={styles["main_input"]}
                  id="doc_signup_experience"
                  value={values?.doc_signup_experience}
                  onInputChange={(e) => onInputChange(e, 2)}
                  errorText={errors.doc_signup_experience}
                  disabled
                />
              </div>
              <div>
                <label className={styles["field-label"]}>Bio</label>
                <Input
                  type="text"
                  className={styles["input-field-2"]}
                  placeholder="Enter about yourself"
                  length="100%"
                  mainInputClass={styles["mainInput"]}
                  inputContainer={styles["main_input"]}
                  id="doc_signup_experience"
                  value={values?.doc_signup_experience}
                  onInputChange={(e) => onInputChange(e, 2)}
                  errorText={errors.doc_signup_experience}
                />
              </div>
            </div>
          </Col>
        </Row>
        <div className={styles["btnDiv"]}>
          <Button
            name="Save Profile"
            className={styles["save_profile_main"]}
            mainDiv={styles["save_profile"]}
            onClick={saveBtnClickHandler}
          />
          <div className={styles["erors_message"]}>{showError}</div>
        </div>
      </Container>
      {loading ? <LoaderSpiner /> : null}
    </div>
  );
};

export default EditProfile;

import Image from "next/image";
import { useRouter } from "next/router";
import { Checkbox } from "antd";
import Link from "next/link";
import styles from "./registerasdoctor.module.scss";
import Input from "../../Common/UI/Input/Input";
import Images from "@/components/Images/Images";
import { Button } from "../../Common/UI/Button/Button";
import CustomDropdown from "@/components/Common/UI/Dropdown/Custom/CustomDropdown";
import { useContext, useEffect, useState } from "react";
import FetchDataContext from "@/store/api-Context";
import SucessPopup from "@/components/Common/Popup/SucessPopup";
import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";
import TostifyContainer from "@/components/Common/TostifyContainer/TostifyContainer";

function Signup() {
  const router = useRouter();
  const [values, setValues] = useState("");

  const [specialityValue, setSpecialityValue] = useState([]);
  const [educationValue, setEducationValue] = useState([]);
  const [hospitalValue, setHospitalValue] = useState([]);

  const [specialityName, setSpecialityName] = useState([]);
  const [educationName, setEducationName] = useState([]);
  const [hospitalName, setHospitalName] = useState([]);
  const [hospitalSearchItem, setHospitalSearchItem] = useState(null);

  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handelOpen = () => {
    setPopup(
      <SucessPopup
        setPopup={setPopup}
        messageHead="Congratulations!"
        message="Your registration was successfully done"
      />
    );
  };

  const [errors, setErrors] = useState({});
  const contextData = useContext(FetchDataContext);
  const educationList = contextData.educationList;
  const specialityList = contextData.specialityList;
  let hospitalList = contextData.hospitalList || [];

  useEffect(() => {
    contextData.getApiData("get-educations", "educationList");
  }, []);

  useEffect(() => {
    contextData.getApiData("get-specialities", "specialityList");
  }, []);

  useEffect(() => {
    contextData.getApiData("get-hospitals", "hospitalList");
  }, []);
  // useEffect(() => {
  //   hospitalChangeHandler();
  // }, [hospitalList]);

  const onInputChange = (e, maxLength) => {
    if (e.target.id === "doc_signup_exequatur") {
      let instValue = e.target.value.replace(/[^\d-]/g, "");
      if (e.target.value.length > 4) {
        if (instValue.length > 5) {
          instValue =
            instValue.slice(0, 4) +
            "-" +
            instValue.slice(5, 10).replace(/[^\d]/g, "");
        } else {
          instValue = instValue.slice(0, 4) + "-" + instValue.slice(5, 10);
        }
      } else if (instValue.indexOf("-") + 1) {
        return false;
      }
      setValues({
        ...values,
        [e.target.id]: instValue,
      });
    } else {
      setValues({
        ...values,
        [e.target.id]: e.target.value.slice(0, maxLength),
        education: [...educationValue],
        speciality: [...specialityValue],
        hospital: [...hospitalValue],
      });
      setErrors({ ...errors, [e.target.id]: false });
    }
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

  const searchInputChange = (e) => {
    document
      .querySelectorAll(".registerasdoctor_hospitalListDropClass__WhF66 label")
      .forEach(function (target) {
        let hospitalName = target?.innerText;
        if (e?.target?.value) {
          if (
            hospitalName
              ?.toUpperCase()
              .indexOf(e?.target?.value?.toUpperCase()) + 1
          ) {
            target.style.display = "inline-flex";
          } else {
            target.style.display = "none";
          }
        } else {
          target.style.display = "inline-flex";
        }
      });
  };

  let hospitalData = [];
  const setselectedHospital = (e, item) => {
    let checkedHospital = [];
    document
      .querySelectorAll(".registerasdoctor_hospitalListDropClass__WhF66 label")
      .forEach(function (target) {
        let hospitalName = target?.innerText;
        if (target?.children[0]?.children[0]?.checked) {
          checkedHospital.push(hospitalName);
        }
      });
    let stringNames = checkedHospital.join(", ");
    document.querySelector(
      ".hospitalSelection .customDropdown_box-placeHolder__poOFC"
    ).innerHTML = stringNames ? `${stringNames}` : "Select your Hospital Name";

    hospitalData.push(item);
  };

  let hospitalCheckbox = hospitalList?.data?.map((e, index) => (
    <Checkbox
      key={index}
      className={styles["hospitalList"]}
      value={e.name}
      onChange={(element) => setselectedHospital(element, e)}
      id={e.id}
    >
      {e.name}
    </Checkbox>
  ));

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

  const educationChangeHandler = (e) => {
    educationSelectedValues(e.target.id);
    educationSelectedNames(e.target.value);
  };

  const onSubmitClickHandler = (e) => {
    e.preventDefault();
    let selectedData = [];
    document
      .querySelectorAll(".hospitalSelection input:checked")
      .forEach((e) => {
        selectedData.push(e?.id);
      });
    let errorsObject = {};
    let errorExist = false;

    if (
      values?.doc_signup_name === "" ||
      values?.doc_signup_name === null ||
      values?.doc_signup_name === undefined
    ) {
      errorsObject.doc_signup_name = "Please enter your name";
      errorExist = true;
    } else if (
      !/^((?=.*[a-zA-Z])[a-zA-Z0-9\s]+)$/.test(values?.doc_signup_name)
    ) {
      errorsObject.doc_signup_name = "Please enter valid name";
      errorExist = true;
    }
    // } else if (/[\W_]/.test(values?.doc_signup_name)) {
    //   errorsObject.doc_signup_name = "Please enter valid name";
    //   errorExist = true;
    // }

    if (
      values?.doc_signup_email === "" ||
      values?.doc_signup_email === null ||
      values?.doc_signup_email === undefined
    ) {
      errorsObject.doc_signup_email = "Please enter your email";
      errorExist = true;
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        values?.doc_signup_email
      )
    ) {
      errorsObject.doc_signup_email = "Please enter valid email";
      errorExist = true;
    }

    if (
      values?.doc_signup_mobile === "" ||
      values?.doc_signup_mobile === null ||
      values?.doc_signup_mobile === undefined
    ) {
      errorsObject.doc_signup_mobile = "Please enter your mobile number";
      errorExist = true;
    } else if (values?.doc_signup_mobile?.length > 10) {
      errorsObject.doc_signup_mobile = "Max 10 characters";
      errorExist = true;
    } else if (values?.doc_signup_mobile?.length < 10) {
      errorsObject.doc_signup_mobile = "Enter atleast 10 characters";
      errorExist = true;
    }

    // if (educationValue?.length === 0) {
    //   errorsObject.education = "Please select atleast one";
    //   errorExist = true;
    // }

    if (specialityValue?.length === 0) {
      errorsObject.speciality = "Please select atleast one";
      errorExist = true;
    }
    // if (hospitalValue?.length === 0) {
    //   errorsObject.hospital = "Please select atleast one";
    //   errorExist = true;
    // }

    if (
      values?.doc_signup_exequatur === "" ||
      values?.doc_signup_exequatur === null ||
      values?.doc_signup_exequatur === undefined
    ) {
      errorsObject.doc_signup_exequatur = "Please enter your exequatur number";
      errorExist = true;
    } else if (values?.doc_signup_exequatur?.length < 8) {
      errorsObject.doc_signup_exequatur = "Please enter atleast 7 characters";
      errorExist = true;
    } else if (values?.doc_signup_exequatur?.length > 8) {
      errorsObject.doc_signup_exequatur = "Max 7 characters ";
      errorExist = true;
    }

    // if (
    //   values?.doc_signup_experience === "" ||
    //   values?.doc_signup_experience === null ||
    //   values?.doc_signup_experience === undefined
    // ) {
    //   errorsObject.doc_signup_experience = "Please enter your experience";
    //   errorExist = true;
    // } else if (values?.doc_signup_experience?.length < 1) {
    //   errorsObject.doc_signup_experience = "Please enter atleast 7 characters";
    //   errorExist = true;
    // } else if (values?.doc_signup_experience?.length > 2) {
    //   errorsObject.doc_signup_experience = "Max 7 characters ";
    //   errorExist = true;
    // }

    if (errorExist) {
      setErrors(errorsObject);
      return false;
    }

    const submitValues = {
      name: values?.doc_signup_name,
      email: values?.doc_signup_email,
      number: values?.doc_signup_mobile,
      // education: values?.education?.map((item) => item).toString(),
      speciality: specialityValue.toString(),
      hospital: selectedData.toString(),
      // hospital: values?.hospital?.map((item) => item).toString(),
      exequatur_number: values?.doc_signup_exequatur,
    };

    setLoading(true);
    // ===== api call and send the all data ======
    contextData.postAPI(
      "sign-up",
      {
        ...submitValues,
        user_type: "doctor",
      },
      handelOpen,
      setLoading
    );

    // router.push("/doctor/login");
  };

  const specialityCheckbox = specialityList?.data?.map((e, index) => (
    <Checkbox
      key={index}
      className={styles["checkboxtypo"]}
      onChange={specialityChangeHandler}
      value={e.name}
      id={e.id}
      defaultChecked={e?.is_selected}
    >
      {e.name}
    </Checkbox>
  ));

  // const educationSelect = educationList?.data?.map((e, index) => (
  //   <Checkbox
  //     key={index}
  //     className={styles["checkboxtypo"]}
  //     onChange={educationChangeHandler}
  //     value={e.name}
  //     id={e.id}
  //   >
  //     {e.name}
  //   </Checkbox>
  // ));

  return (
    <div>
      <TostifyContainer />
      <div className="container">
        <div className={styles["main-div"]}>
          <div className={styles["background-design-1"]}>
            <Image src={Images.bg_arc3} alt="icon" />
          </div>
          <div className={styles["div-left"]}>
            <Image
              src={Images.doctor_signup_main}
              alt="signup-image"
              className={styles["Image"]}
            />
            <Image
              src={Images.doctor_signup_res}
              alt="signup-image"
              className={styles["signup_res_img"]}
            />
          </div>
          <div className={styles["div-right"]}>
            <div className={styles["background-design-2"]}>
              <Image src={Images.background_arc_responsive} alt="icon" />
            </div>
            <div>
              <div style={{ textAlign: "center" }}>
                <h1 className={styles["signup-heading"]}>Sign Up</h1>
              </div>
              <div style={{ textAlign: "center" }}>
                <h4 className={styles["signup-heading-2"]}>
                  Enter your details below to get started.
                </h4>
              </div>

              <form onSubmit={onSubmitClickHandler}>
                <div style={{ marginBottom: 15 }}>
                  <label className={styles["field-label"]}> Your Name *</label>
                  <Input
                    className={styles["input-field-1"]}
                    type="text"
                    placeholder="Enter Your Name"
                    length="95%"
                    id="doc_signup_name"
                    value={values?.doc_signup_name}
                    onInputChange={onInputChange}
                    errorText={errors.doc_signup_name}
                  />
                </div>
                <div style={{ marginBottom: 15 }}>
                  <label className={styles["field-label"]}>
                    Your Email ID *
                  </label>
                  <Input
                    type="text"
                    className={styles["input-field-3"]}
                    placeholder="Enter Your E-Mail ID"
                    length="95%"
                    id="doc_signup_email"
                    value={values?.doc_signup_email}
                    onInputChange={onInputChange}
                    errorText={errors.doc_signup_email}
                  />
                </div>
                <label className={styles["field-label"]}>Phone Number *</label>
                <div style={{ marginBottom: 15 }}>
                  <Input
                    type="number"
                    className={styles["input-field-2"]}
                    placeholder="Enter Your Mobile Number"
                    length="95%"
                    id="doc_signup_mobile"
                    value={values?.doc_signup_mobile}
                    onInputChange={(e) => onInputChange(e, 10)}
                    errorText={errors.doc_signup_mobile}
                    maxLength={10}
                  />
                </div>
                {/* <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    className={styles["field-label"]}
                    style={{ marginBottom: "7px" }}
                  >
                    Education *
                  </label>
                  <CustomDropdown
                    placeholder={
                      educationName?.map((item) => item).join(", ") ||
                      "Select your education"
                    }
                    placeholderClass={
                      educationName.length > 0 &&
                      styles["speciality_placeholder"]
                    }
                    selectedItems={educationSelect}
                    dropdownTitle="Select your Specialty"
                    arrow={true}
                    checkbox={educationSelect}
                    mainClass={styles["input_speciality"]}
                    boxClass={styles["input_box"]}
                    type="checkbox"
                    errorText={
                      educationValue?.length > 0 ? "" : errors.education
                    }
                  />
                </div> */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    className={styles["field-label"]}
                    style={{ marginBottom: "7px" }}
                  >
                    Speciality *
                  </label>
                  <CustomDropdown
                    startDropClass={styles["specialityStartDropClass"]}
                    placeholder={
                      // specialityName?.map((item) => item).toString() ||
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
                <div
                  className="hospitalSelection"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label
                    className={styles["field-label"]}
                    style={{ marginBottom: "7px" }}
                  >
                    Hospital Name *
                  </label>
                  <CustomDropdown
                    placeholder={"Select your Hospital Name"}
                    searchBox
                    startDropClass={styles["hospitalListDropClass"]}
                    placeholderClass={
                      hospitalSearchItem?.length > 0 &&
                      styles["speciality_placeholder"]
                    }
                    dropdownTitle="Select your Hospital "
                    arrow={true}
                    checkbox={hospitalCheckbox}
                    mainClass={styles["input_speciality"]}
                    boxClass={styles["input_box"]}
                    type="checkbox"
                    // errorText={hospitalValue?.length > 0 ? "" : errors.hospital}
                    iconPath={Images.search_normal}
                    iconClass={styles["hospitalIconClass"]}
                    inputClassName={styles["search_input"]}
                    inputChange={searchInputChange}
                    mainInputClass={styles.searchInputClass}
                  />
                </div>
                <div className={styles["exequatorNumberInput"]}>
                  <label className={styles["field-label"]}>
                    Exequatur Number *
                  </label>

                  <Input
                    type="text"
                    className={styles["input-field-2"]}
                    placeholder="Select Exequatur Number"
                    length="95%"
                    id="doc_signup_exequatur"
                    value={values?.doc_signup_exequatur}
                    onInputChange={(e) => onInputChange(e, 8)}
                    errorText={errors.doc_signup_exequatur}
                    maxChar={8}
                  />
                </div>

                {/* <div>
                  <label className={styles["field-label"]}>Experience</label>
                  <Input
                    type="number"
                    className={styles["input-field-2"]}
                    placeholder="Enter Your Experience"
                    length="95%"
                    mainInputClass={styles["mainInput"]}
                    inputContainer={styles["main_input"]}
                    id="doc_signup_experience"
                    value={values?.doc_signup_experience}
                    onInputChange={(e) => onInputChange(e, 2)}
                    errorText={errors.doc_signup_experience}
                  />
                </div> */}
                <div className={styles["btn-div"]}>
                  <Button
                    className={styles["signup-btn"]}
                    name="Sign Up"
                    width="100%"
                    type="submit"
                    id="doc_signup_exequatur"
                  ></Button>
                </div>
              </form>

              <div
                style={{ textAlign: "center", width: "101%" }}
                className={styles["signup-line"]}
              >
                <p>
                  Already have an account?
                  <Link
                    style={{
                      color: "orange",
                      marginLeft: 5,
                      fontWeight: "500",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    href={"./login"}
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {popup}
      {loading ? <LoaderSpiner /> : null}
    </div>
  );
}

export default Signup;

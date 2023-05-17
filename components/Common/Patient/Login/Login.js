import styles from "./Login.module.scss";
import Image from "next/image";
import Images from "@/components/Images/Images";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import FetchDataContext from "@/store/api-Context";
import SucessPopup from "../../Popup/SucessPopup";
import TostifyContainer from "../../TostifyContainer/TostifyContainer";
import LoaderSpiner from "../../Loader/LoaderSpiner";

export default function ({ doctor }) {
  const router = useRouter();
  const routePath = useRouter().pathname;
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [openOtp, setOpenOtp] = useState(false);
  const contextData = useContext(FetchDataContext);
  const [popup, setPopup] = useState(false);
  const [time, setTime] = useState(60);
  const [didNotGetOtp, setDidNotGetOtp] = useState(false);
  const [reOtp, setReOtp] = useState(true);
  const [loading, setLoading] = useState(false);

  let tokenData;
  try {
    tokenData = localStorage.getItem("mebel_token");
  } catch (err) {
    tokenData = "";
  }

  if (tokenData) {
    router.push(
      {
        pathname: "/patient/profile",
      },
      undefined,
      { shallow: false }
    );
  }

  useEffect(() => {
    if (!reOtp) {
      setReOtp(false);
      let i = 1;
      const timeout2 = setInterval(() => {
        setTime(time - i);
        i = i + 1;
      }, 1000);

      setTimeout(() => {
        setReOtp(true);
        setDidNotGetOtp(true);
        clearInterval(timeout2);
        setTime(60);
      }, 60000);
    }
  }, [reOtp]);

  // const handelOpen = () => {
  //   setPopup(<SucessPopup setPopup={setPopup} message=" Successfully" />);
  // };

  const onInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const sendOtp = (e) => {
    e.preventDefault();

    let errorsObject = {};
    let errorsExist = false;

    if (
      values?.numberEmail === "" ||
      values?.numberEmail === null ||
      values?.numberEmail === undefined
    ) {
      errorsObject.numberEmail = "Please enter your mobile number or email";
      errorsExist = true;
    }

    if (errorsExist) {
      setErrors(errorsObject);
      return false;
    }
    const data = {
      email_number: values?.numberEmail,
    };
    setLoading(true);
    contextData.sendOtp(
      "send-login-otp",
      data,
      setReOtp,
      setOpenOtp,
      setLoading
    );
  };

  const onSubmitClickHandler = (e) => {
    let errorsObject = {};
    let errorsExist = false;

    if (
      values?.numberEmail === "" ||
      values?.numberEmail === null ||
      values?.numberEmail === undefined
    ) {
      errorsObject.numberEmail = "Please enter your mobile number or email";
      errorsExist = true;
    }
    if (openOtp) {
      if (
        values?.otp === "" ||
        values?.otp === null ||
        values?.otp === undefined
      ) {
        errorsObject.otp = "Please enter the otp";
        errorsExist = true;
      } else if (values.otp.length < 6 || values.otp.length > 6) {
        errorsObject.otp = "OTP must be 6 digits";
        errorsExist = true;
      }
    }

    if (errorsExist) {
      setErrors(errorsObject);
      return false;
    }
    setLoading(true);

    const data = {
      email_number: values?.numberEmail,
      otp: values?.otp,
    };

    if (openOtp) {
      contextData.otpVerified("login", data, setLoading);
    } else {
      contextData.sendOtp(
        "send-login-otp",
        data,
        setReOtp,
        setOpenOtp,
        setLoading
      );
    }
  };

  const moveToPatientSignUp = () => {
    if (routePath == "/doctor/login") {
      router.push("/doctor/signup");
    } else {
      router.push("/patient/signup");
    }
  };

  const handleKeyDown = (e, type) => {
    if (e.key === "Enter" && type === "email") {
      sendOtp(e);
    } else if (e.key === "Enter" && type === "otp") {
      onSubmitClickHandler(e);
    }
  };

  return (
    <>
      <TostifyContainer />
      <div className={styles["main"]}>
        <div className="container">
          <div className={styles["main-div"]}>
            <div className={styles["background-design-1"]}>
              <Image src={Images.bg_arc3} alt="icon" />
            </div>
            <div className={styles["patient_login"]}>
              <div className={styles["login_left"]}>
                {doctor ? (
                  <Image
                    src={Images.doctor_login_main}
                    alt="patient login form"
                  />
                ) : (
                  <Image
                    src={Images.patient_signup_main}
                    alt="patient login form"
                  />
                )}
              </div>
              <div className={styles["login_right"]}>
                <div className={styles["login_head"]}>
                  {doctor ? <span>Log In</span> : <span>Sign In</span>}
                </div>
                <div className={styles["login_content"]}>
                  Log In with your mobile number & OTP
                </div>
                <div className={styles["number_form_inp"]}>
                  <div className={styles["number_form_label"]}>
                    Mobile Number /Email Id
                  </div>

                  <div className={styles["number_inp"]}>
                    <input
                      type="text"
                      name="numberEmail"
                      placeholder="Enter your mobile number or email"
                      value={values?.numberEmail}
                      onChange={onInputChange}
                      onKeyDown={(e) => handleKeyDown(e, "email")}
                    />
                    {/* <div className={styles["arrow_for_sending"]}>
                      <Image src={Images.arrowIcon} alt="arrow for otp" />
                    </div> */}
                    <button
                      className={styles["inside_inp"]}
                      disabled={openOtp ? true : false}
                      onClick={onSubmitClickHandler}
                    >
                      <Image src={Images.arrowIcon} alt="call icon for input" />
                    </button>
                  </div>
                  <span className="erors_message">
                    {errors.numberEmail && errors.numberEmail}
                  </span>
                </div>
                <div className={styles["your_otp_form"]}>
                  <div className={styles["your_otp_label"]}>Your OTP</div>
                  <div className={styles["number_inp"]}>
                    <input
                      type="text"
                      name="otp"
                      placeholder="******"
                      value={values?.otp}
                      onChange={onInputChange}
                      maxLength={6}
                      onKeyDown={(e) => handleKeyDown(e, "otp")}
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode < 48 || charCode > 57) {
                          e.preventDefault();
                        }
                      }}
                      disabled={!openOtp ? true : false}
                    />
                  </div>
                  <span className="erors_message">
                    {errors.otp && errors.otp}
                  </span>
                  <div className={styles["inside_inp"]}>
                    <Image
                      src={Images.inp_mobile_icon}
                      alt="mobile icon for input"
                    />
                  </div>
                  {!reOtp ? (
                    <div className={styles["otp_timer"]}>{time} Sec</div>
                  ) : didNotGetOtp ? (
                    <div className={styles["resend_otp_div"]}>
                      Didn't get the OTP ? &nbsp;{" "}
                      <span className={styles["resend"]} onClick={sendOtp}>
                        Resend
                      </span>
                    </div>
                  ) : null}
                </div>
                <div className={styles["sign_btn_div"]}>
                  <button
                    className={styles["sign_btn"]}
                    onClick={onSubmitClickHandler}
                  >
                    Sign In
                  </button>
                </div>
                <div className={styles["account_do_not"]}>
                  Don’t have an account?{" "}
                  <span
                    className={styles["signup_link"]}
                    onClick={moveToPatientSignUp}
                  >
                    Sign Up
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

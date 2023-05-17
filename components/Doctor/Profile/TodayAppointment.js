import Table from "react-bootstrap/Table";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import FetchDataContext from "@/store/api-Context";

import styles from "./todayAppointment.module.scss";
import Images from "@/components/Images/Images";
import { Button } from "@/components/Common/UI/Button/Button";
import CustomModal from "@/components/Common/UI/Modal/Modal";
import Popup from "@/components/Common/UI/pop-ups/Popup";
import DropdownFOrPatient from "./dropdownForPatient/DropdownForPatient";
import DropdownToday from "./dropdownToday/DropdownToday";
import { Checkbox } from "antd/lib";
import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";
import TypeOfConsult from "./TypeOfConsult/TypeOfConsult";

const TodayAppointment = () => {
  const router = useRouter();
  const contextData = useContext(FetchDataContext);
  const getPatientDetailsFromPin = contextData?.getPatientDetailsFromPin;
  const appointment = contextData.todaysAppointment || [];

  const [show, setShow] = useState(false);
  const [pinPopup, setPinPopup] = useState(false);
  const [typeOfConsult, setTypeOfConsult] = useState(false);
  const [hydration, setHydration] = useState("");
  const [pinInputValue, setPinInputValue] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    contextData.getApiData("get-doctor-appointment", "todaysAppointment");
  }, []);

  const [showError, setShowError] = useState("");
  const onInputChangeHandler = (e) => {
    const inputVal = e.target.value;
    if (/[^0-9\+]/g.test(inputVal) || inputVal.length > 7) {
      e.target.value = inputVal.replace(/[^0-9\+]/g, "").slice(0, 7);
      setPinInputValue(e.target.value);
    } else {
      setPinInputValue(inputVal);
    }
  };

  // type of questions popup functions

  const typeOfConsultation = () => {
    setTypeOfConsult(true);
  };

  // pin verify popup functions
  const modalState = (state) => {
    setShow(state);
    setPinPopup(state);
    setTypeOfConsult(state);
  };

  const eyeActionClickHandler = (e) => {
    setPinPopup(true);
    setAppointmentId(e.target.id);
  };

  const popupAddClickHandler = () => {
    if (pinInputValue.length === "") {
      setShowError("Please enter patient pin number");
    } else if (/[^0-9\+]/g.test(pinInputValue)) {
      setShowError("Please enter valid pin number");
    }
    contextData.pinVerifyForPatientDetails(
      "pin-verify-with-patient-details",
      { pin_number: pinInputValue, appointment_id: appointmentId },
      setShowError,
      setLoading
    );
    (err) => {
      setShowError(err);
      setLoading(false);
      if (!err) {
        setPinPopup(false);
        // router.push("./patient-details");
      }
    };
    // if (!showError) {
    //   setPinPopup(false);
    //   router.push("./patient-details")
    // }
  };

  const questionToPatientClickHandler = () =>
    router.push("./question-for-patient");

  // const innerHtml = (

  // );
  // useEffect(() => setHydration(innerHtml), [appointment]);

  // const appointData = todaysAppointment || []; useEffect(() => setHydration(innerHtml), []);
  return (
    <>
      <div className={`${styles["main_container"]}`}>
        {pinPopup && (
          <CustomModal open={pinPopup} modalState={modalState}>
            <Popup
              title="Pin Number"
              subHeading="Ask pin number to patient for access"
              input
              inputLabel="Pin Number"
              inputPlaceholder="Enter pin number"
              buttonName={"Next"}
              mainBtnClass={styles["add_btn"]}
              btnOnClick={popupAddClickHandler}
              mainInputClass={styles["medicalStudiesPopupInput"]}
              onInputChange={onInputChangeHandler}
              type="number"
              errorText={showError}
              inputContainer={styles["errorText"]}
            />
          </CustomModal>
        )}

        {typeOfConsult && (
          <CustomModal open={typeOfConsult} modalState={modalState}>
            <TypeOfConsult modalState={modalState} />
          </CustomModal>
        )}

        <div className={styles["main_container_heading"]}>
          <div className={styles["main_container_heading-title"]}>
            <h1>Today Appointment</h1>

            <div className={styles["buttons"]}>
              <Button
                name="Type of Consultation"
                mainDiv={styles["buttons_question"]}
                className={styles["buttons_question_main"]}
                onClick={typeOfConsultation}
              />
              <Button
                name="Questions For Patient"
                mainDiv={styles["buttons_question"]}
                className={styles["buttons_question_main"]}
                onClick={questionToPatientClickHandler}
              />

              <DropdownFOrPatient />
              <DropdownToday />
            </div>
          </div>
        </div>
        <Table
          bordered
          style={{ borderColor: "#DCDCDC" }}
          className={styles["main_container_table"]}
          responsive
        >
          <thead>
            <tr>
              <th className={styles["table_heading_1"]}>
                {/* <Checkbox className={styles.checkbox} /> */}
              </th>
              <th className={styles["table_heading_2"]}>Date & Time </th>
              <th className={styles["table_heading_3"]}>Patient Name</th>
              <th className={styles["table_heading_4"]}>Age</th>
              <th className={styles["table_heading_5"]}>Appointment Type</th>
              <th className={styles["table_heading_5"]}>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointment && appointment?.length === 0 ? (
              <tr>
                <td colSpan={6}>No Data Found</td>
              </tr>
            ) : (
              <>
                {appointment &&
                  appointment?.map((item, key) => (
                    <tr key={key}>
                      <td className={styles["col_1"]}>
                        <Checkbox className={styles.checkbox} />
                      </td>
                      <td>
                        {item.date} at {item.time}
                      </td>
                      <td>{item.patient_name}</td>
                      <td>{item.age}</td>
                      <td>{item.appointment_type}</td>
                      <td className={styles["col_6"]}>
                        <Image
                          src={Images.table_eye_btn}
                          alt="btn"
                          className={styles["eyeIcon"]}
                          onClick={eyeActionClickHandler}
                          id={item?.appointment_id}
                        />
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </Table>
      </div>
      {loading ? <LoaderSpiner /> : null}
    </>
  );
};

export default TodayAppointment;

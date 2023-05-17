import React, { useContext, useEffect, useState } from "react";
import Input from "@/components/Common/UI/Input/Input";
import styles from "./MedicalDetails.module.scss";
import { useRouter } from "next/router";
import FetchDataContext from "@/store/api-Context";
import MakeAppointmentPopup from "@/components/Patient/doctor-description/makeAppointmentPopup/MakeAppointmentPopup";
import CustomModal from "@/components/Common/UI/Modal/Modal";

const MedicalDetails = ({ setCurrentTab, setLoading }) => {
  const router = useRouter();
  const [values, setValues] = useState([]);
  const [patientId, setPatientId] = useState(null);
  const [addPopup, setAddPopup] = useState(false);
  const [doctorId, setDoctorId] = useState();

  const contextData = useContext(FetchDataContext);
  const presetQuestionData = contextData?.presetQuestions;
  const consultType = contextData?.consultTypeData || [];

  const inputChangeHandler = (e, id, index) => {
    let dataList = [...values];
    dataList[index] = {
      id,
      answer: e.target.value,
    };
    setValues(dataList);
  };

  useEffect(() => {
    let id = sessionStorage.getItem("mebel_user");
    setDoctorId(JSON.parse(id));
  }, []);

  useEffect(() => {
    if (doctorId) {
      contextData.getConsultType("get-doctor-consult-type", {
        doctor_id: doctorId?.id,
      });
    }
  }, [doctorId]);

  useEffect(() => {
    setLoading(true);
    const data = JSON.parse(sessionStorage.getItem("mebel_user"));
    if (data && data.id) {
      setPatientId(data.id);
    }
  }, []);

  useEffect(() => {
    contextData.getApiData("preset-questions", "preset-questions", setLoading);
  }, []);

  useEffect(() => {
    contextData.getApiData("update-preset-status", "update-preset-status");
  }, []);

  const backClickHandler = () => setCurrentTab(1);

  const nextClickHandler = () => {
    const formData = new FormData();
    formData.append("patient_id", patientId);
    values?.map((item) => {
      formData.append(`question_ids[${item.id}]`, item.answer);
    });

    contextData.postPresetQuestion(
      "preset-question-answer",
      formData,
      setLoading
    );
    setAddPopup(true);
  };

  const modalState = (state) => {
    setAddPopup(state);
  };

  return (
    <>
      <div className={styles["main_container"]}>
        <div className="container">
          {addPopup && (
            <CustomModal open={addPopup} modalState={modalState}>
              <MakeAppointmentPopup
                modalState={modalState}
                data={consultType}
                doctorId={doctorId}
                isDoctor
              />
            </CustomModal>
          )}
          <div className={styles["inputFields"]}>
            {presetQuestionData &&
              presetQuestionData?.map((list, key) => (
                <div key={key}>
                  <Input
                    placeholder="Answer"
                    // label="1. What is the disease or condition?"
                    label={`${key + 1}. ${list?.question}`}
                    id={list.id}
                    className={styles["input_1"]}
                    onInputChange={(e) => inputChangeHandler(e, list.id, key)}
                  />
                </div>
              ))}

            <div className={styles["question_save_btn"]}>
              <button onClick={backClickHandler} className={styles["back"]}>
                Back
              </button>
              <button onClick={nextClickHandler} className={styles["next"]}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicalDetails;

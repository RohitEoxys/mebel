import React, { useContext, useEffect, useState } from "react";
import Input from "@/components/Common/UI/Input/Input";
import Image from "next/image";
import Images from "@/components/Images/Images";
import { useRouter } from "next/router";
import FetchDataContext from "@/store/api-Context";
import styles from "./editPresetQuestions.module.scss";

const EditPresetQuestions = ({ setLoading }) => {
  const contextData = useContext(FetchDataContext);
  const getPresetQuestionAnswers = contextData?.getPresetQuestionAnswer;
  const router = useRouter();
  const [values, setValues] = useState({});
  const [getPresetQuestionAnswer, setGetPresetQuestionAnswer] = useState([]);
  const [patientId, setPatientId] = useState(null);

  const inputChangeHandler = (e, key) => {
    const updatedAnswer = e.target.value;
    const updatedQuestionAnswer = [...getPresetQuestionAnswers?.data];
    updatedQuestionAnswer[key].answer = updatedAnswer; // Update the answer in the copied array
    setValues({ ...values, [e.target.id]: updatedAnswer }); // Update the state with the updated answer
    setGetPresetQuestionAnswer(updatedQuestionAnswer);
  };

  // get patient id from session storage

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("mebel_user"));
    if (data && data.id) {
      setPatientId(data.id);
    }
  }, []);

  // get question and answer

  useEffect(() => {
    setLoading(true);
    patientId &&
      contextData.getPresetAnswer(
        "get-preset-answer",
        { patient_id: patientId },
        setLoading
      );
  }, [patientId]);

  // send updated answer

  const nextClickHandler = () => {
    const formData = new FormData();
    formData.append("patient_id", patientId);
    getPresetQuestionAnswer?.map((item) => {
      formData.append(`question_ids[${item.question_id}]`, item.answer);
    });
    setLoading(true);
    contextData.postPresetQuestion(
      "preset-question-answer",
      formData,
      setLoading
    );
    router.push("./profile");
  };

  return (
    <div className={styles["main_container"]}>
      <div className={styles["inputFields"]}>
        <h1>Pre-set question For Patient</h1>
        {getPresetQuestionAnswers &&
          getPresetQuestionAnswers?.data?.map((list, key) => (
            <div key={key}>
              <Input
                placeholder="Answer"
                label={`${key + 1}. ${list?.question}`}
                id={list.id}
                className={styles["input_1"]}
                onInputChange={(e) => inputChangeHandler(e, key)}
                value={list.answer}
              />
            </div>
          ))}

        <div className={styles["question_save_btn"]}>
          <button onClick={nextClickHandler}> Save Questions </button>
        </div>
      </div>
    </div>
  );
};

export default EditPresetQuestions;

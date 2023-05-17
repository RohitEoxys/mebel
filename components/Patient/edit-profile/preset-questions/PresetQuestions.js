import React, { useContext, useEffect, useState } from "react";
import Input from "@/components/Common/UI/Input/Input";
import Image from "next/image";
import Images from "@/components/Images/Images";
import { useRouter } from "next/router";
import FetchDataContext from "@/store/api-Context";
import styles from "./editPresetQuestions.module.scss";

const EditPresetQuestions = () => {
  const contextData = useContext(FetchDataContext);
  const getPresetQuestionAnswers = contextData?.getPresetQuestionAnswer;
  const router = useRouter();
  const [values, setValues] = useState({});
  const [getPresetQuestionAnswer, setGetPresetQuestionAnswer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patientId, setPatientId] = useState(null);

  const inputChangeHandler = (e, key) => {
    const updatedAnswer = e.target.value;
    const updatedQuestionAnswer = [...getPresetQuestionAnswers?.data];
    updatedQuestionAnswer[key].answer = updatedAnswer; // Update the answer in the copied array
    setValues({ ...values, [e.target.id]: updatedAnswer }); // Update the state with the updated answer
    setGetPresetQuestionAnswer(updatedQuestionAnswer);
    // setValues({
    //   ...values,
    //   [e.target.id]: e.target.value,
    // });
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
    contextData.getApiData("get-preset-answer", "presetAnswer", setLoading);
  }, []);

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
        {/* <Input
          placeholder="Answer"
          label="2. What is the disease or condition?"
          id="2"
          className={styles["input_1"]}
          onInputChange={inputChangeHandler}
        />
        <Input
          placeholder="Answer"
          label="3. What symptoms should I watch for?"
          id="3"
          className={styles["input_1"]}
          onInputChange={inputChangeHandler}
        />
        <Input
          placeholder="Answer"
          label="4. Do I need a follow-up visit and if so, when?"
          id="4"
          className={styles["input_1"]}
          onInputChange={inputChangeHandler}
        />
        <Input
          placeholder="Answer"
          label="5. How is the disease or condition treated?"
          id="5"
          className={styles["input_1"]}
          onInputChange={inputChangeHandler}
        /> */}

        <div className={styles["question_save_btn"]}>
          <button onClick={nextClickHandler}> Save Questions </button>
        </div>
      </div>
    </div>
  );
};

export default EditPresetQuestions;

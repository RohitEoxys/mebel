import React, { useContext, useEffect, useState } from "react";
import Input from "@/components/Common/UI/Input/Input";
import styles from "./presetQuestion.module.scss";
import Image from "next/image";
import Images from "@/components/Images/Images";
import { useRouter } from "next/router";
import FetchDataContext from "@/store/api-Context";
import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";

const PresetQuestion = () => {
  const router = useRouter();
  const [values, setValues] = useState([]);
  const [patientId, setPatientId] = useState(null);
  const [loading, setLoading] = useState(false);
  useState(false);

  const contextData = useContext(FetchDataContext);
  const presetQuestionData = contextData?.presetQuestions;

  const inputChangeHandler = (e, id, index) => {
    let dataList = [...values];
    dataList[index] = {
      id,
      answer: e.target.value,
    };
    setValues(dataList);
  };

  // Object.keys(values).forEach((key) => {
  //   if (values[key].trim() === "") {
  //     delete values[key];
  //   }
  // });

  useEffect(() => {
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

  const nextClickHandler = () => {
    const formData = new FormData();
    formData.append("patient_id", patientId);
    values?.map((item) => {
      formData.append(`question_ids[${item.id}]`, item.answer);
    });
    // Object.keys(values).map((ids) => {
    //   formData.append("question_ids[]", ids);
    // });
    // Object.values(values).map((ans) => {
    //   formData.append("answer[]", ans);
    // });
    setLoading(true);
    contextData.postPresetQuestion(
      "preset-question-answer",
      formData,
      setLoading
    );
    router.push("./profile");
  };

  return (
    <>
      <div className={styles["main_container"]}>
        <div className={styles["background-design-1"]}>
          <Image src={Images.bg_arc3} alt="icon" />
        </div>
        <div className="container">
          <div className={styles["inputFields"]}>
            <h1>Pre-set question For Patient</h1>

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
              <button
                onClick={nextClickHandler}
                // disabled={Object.keys(values).length === 0}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading ? <LoaderSpiner /> : null}
    </>
  );
};

export default PresetQuestion;

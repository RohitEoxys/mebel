import { Button } from "@/components/Common/UI/Button/Button";
import CustomDropdown from "@/components/Common/UI/Dropdown/Custom/CustomDropdown";
import CustomModal from "@/components/Common/UI/Modal/Modal";
import Popup from "@/components/Common/UI/pop-ups/Popup";
import Images from "@/components/Images/Images";
import FetchDataContext from "@/store/api-Context";
// import { Checkbox, Select } from "antd";
import Image from "next/image";
import router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import styles from "./QuestionForPatient.module.scss";
import { Checkbox, Popconfirm } from "antd";
import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";

const QuestionForPatient = () => {
  const [specialityValue, setSpecialityValue] = useState([]);

  const [popupAddQuestionValue, setPopupAddQuestionValue] = useState([]);
  const contextData = useContext(FetchDataContext);
  const consultTypeData = contextData.consultType || [];
  const doctorTypeQuestion = contextData.doctorTypeQuestion;
  const [specialityName, setSpecialityName] = useState([]);
  const [values, setValues] = useState();
  const [loading, setLoading] = useState(false);
  const [changeData, setChangeData] = useState(false);

  useEffect(() => {
    setLoading(true);
    contextData.getApiData(
      "get-consultation",
      "get-consultation-type",
      setLoading
    );
    setChangeData(false);
  }, [changeData]);

  useEffect(() => {
    setLoading(true);
    contextData.getApiData(
      `get-doctor-type-question?type_of_consultation_id=${values?.id}`,
      "get-doctor-type-question",
      setLoading
    );
  }, [values, changeData]);

  const specialitySelectedNames = (item) => {
    if (specialityName.includes(item)) {
      setSpecialityName((prevState) =>
        prevState.filter((existing) => existing !== item)
      );
    } else {
      // setSpecialityName((prevState) => [item, ...prevState]);
    }
  };
  const onInputChange = (e) => {
    setPopupAddQuestionValue((prev) => {
      return e.target.value;
    });
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

  const specialityChangeHandler = (e) => {
    specialitySelectedValues(e.target.id);
    specialitySelectedNames(e.target.value);
  };

  const speciality = consultTypeData?.map((e, index) => (
    <option
      key={index}
      className={styles["checkboxtypo"]}
      onChange={specialityChangeHandler}
      value={e.id}
      id={e.id}
      onClick={() => {
        setValues(e);
      }}
    >
      {e.consultation_name}
    </option>
  ));

  const [show, setShow] = useState(false);

  const modalState = (state) => {
    setShow(state);
  };

  const popupAddClickHandler = () => {
    setChangeData(true);
    const data = {
      types_of_consultation_id: values.id,
      question: popupAddQuestionValue,
    };

    contextData.addDoctorQuestion("add-doctor-question", { ...data });
    setShow(false);
  };
  const addNewQueClickHandler = () => setShow(true);

  const deleteClickHandler = (id) => {
    setChangeData(true);
    contextData.deleteDoctorAddedQuestions("delete-question-for-doctor", {
      question_id: id,
    });
  };
  console.log(values?.consultation_name.slice(0, 20));

  return (
    <>
      <div className={styles["question_main_div"]}>
        <div className={styles["cornor_img_div"]}>
          <Image src={Images.bg_arc3} alt="cornor image" />
        </div>
        <div className="container">
          <div
            className={`${styles["question_patient_main"]} ${
              doctorTypeQuestion.length === 1 ? styles["fix_footer"] : null
            } ${
              doctorTypeQuestion.length === 2 ? styles["fix_footer1"] : null
            }`}
          >
            <div className={styles["question_dropdown_div"]}>
              <div className={styles["question_dropdown"]}>
                <CustomDropdown
                  placeholder={
                    values?.consultation_name?.slice(0, 20).concat("...") ||
                    "Type Of Consultation"
                  }
                  placeholderClass={styles["speciality_placeholder"]}
                  fillArrow
                  arrowColor="#ED7B30"
                  arrow={true}
                  selectMenu={speciality}
                  selected={values?.special}
                  mainClass={styles["input_speciality"]}
                  boxClass={styles["input_box"]}
                  arrowDownAllign={"27%"}
                  arrowupAllign={"43%"}
                  divider
                  startDropClass={styles["startDropClass"]}
                />
              </div>

              <div className={styles["symptoms_checkbox"]}>
                <Checkbox> Add symptoms</Checkbox>
              </div>
            </div>
            <div className={styles["question_head"]}>Questions For Patient</div>
            {doctorTypeQuestion.length > 0 ? (
              doctorTypeQuestion?.map((item, key) => (
                <div className={styles["questions_div"]} key={key}>
                  <div className={styles["right"]}>
                    <div className={styles["question_no"]}>{key + 1}.</div>
                    <div className={styles["real_question"]}>
                      {item.question}
                    </div>
                  </div>
                  <div className={styles["left"]}>
                    <Popconfirm
                      title="Delete this question"
                      description="Are you sure to delete this question?"
                      onConfirm={() => deleteClickHandler(item.id)}
                      okText="Yes"
                      cancelText="No"
                      okButtonProps={{
                        className: `${styles["custom-popconfirm-btn"]}`,
                      }}
                    >
                      <Image
                        src={Images.recylebinIcon}
                        alt=""
                        className={styles.deleteIcon}
                      />
                    </Popconfirm>
                  </div>
                </div>
              ))
            ) : (
              <>
                {values ? (
                  <div className={styles["no_question_found"]}>
                    No question added yet
                  </div>
                ) : (
                  <div className={styles["no_question_found"]}>
                    Please select the consult type
                  </div>
                )}
              </>
            )}

            <div className={styles["add_question_btn"]}>
              <button onClick={addNewQueClickHandler} disabled={!values}>
                Add New Question
              </button>
            </div>
          </div>
          {show && (
            <CustomModal open={show} modalState={modalState}>
              <Popup
                title="Add New Question"
                subHeading="Lorem are many variations of passages of Lorem"
                textArea
                textAreaLabel="Question"
                textAreaPlaceHolder="Type question here..."
                rows={5}
                name="question"
                buttonName={"Add"}
                mainBtnClass={styles["add_btn"]}
                btnOnClick={popupAddClickHandler}
                onInputChange={onInputChange}
                mainTextareClass={styles["main_text_area"]}
              />
            </CustomModal>
          )}
        </div>
        {loading && <LoaderSpiner />}
      </div>
    </>
  );
};

export default QuestionForPatient;

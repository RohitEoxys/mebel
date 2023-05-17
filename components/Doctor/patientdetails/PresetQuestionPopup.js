import Images from "@/components/Images/Images";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./PresetQuestionPopup.module.scss";
import Collapse from "react-bootstrap/Collapse";
import { useEffect } from "react";

const PresetQuestionPopup = ({
  setShowQuestionPopup,
  getPresetQuestionAnswers,
}) => {
  const [open, setOpen] = useState(false);

  const dropQuestion = getPresetQuestionAnswers?.data;

  return (
    <>
      <div className={styles["popupBox"]}>
        <div
          className={styles["cross_icon"]}
          onClick={() => setShowQuestionPopup(false)}
        >
          <div className={styles["close_icon"]}>x</div>
        </div>
        <div className={styles["preset_head"]}>preset questions</div>
        {dropQuestion.map((list, key) => (
          <div className={styles["questions_box"]} key={key}>
            <div aria-controls="example-collapse-text" aria-expanded={open}>
              <div
                className={styles["question_div"]}
                onClick={() => setOpen(open === list?.id ? "" : list?.id)}
              >
                <div>
                  <span className={styles["question_no"]}>{key + 1}.</span>
                  <span
                    className={
                      open !== list?.id
                        ? styles["questions"]
                        : styles["somthing"]
                    }
                  >
                    {list.question}
                  </span>
                </div>
                <div>
                  {open === list?.id ? (
                    <Image src={Images.UpIcon} alt="upIcon" />
                  ) : (
                    <Image src={Images.dropIcon} alt="dropIcon" />
                  )}
                </div>
              </div>
            </div>
            <div className={styles["drop_answer_div"]}>
              <Collapse in={open === list?.id}>
                <div id="example-collapse-text">
                  <div className={styles["collapse_div"]}>
                    <div className={styles["answer_label"]}>Answer: </div>
                    <div className={styles["answers"]}>{list.answer}</div>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PresetQuestionPopup;

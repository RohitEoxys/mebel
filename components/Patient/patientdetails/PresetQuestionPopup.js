import Images from "@/components/Images/Images";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./PresetQuestionPopup.module.scss";
import Collapse from "react-bootstrap/Collapse";
import { useEffect } from "react";

const PresetQuestionPopup = ({ setShowQuestionPopup }) => {
  const [open, setOpen] = useState(false);

  const dropQuestion = [
    {
      number: 1,
      question: "What is the disease or condition?",
    },
    {
      number: 2,
      question: "Do I need a follow-up visit and if so, when?",
    },
    {
      number: 3,
      question: "How is the disease or condition treated?",
    },
    {
      number: 4,
      question: "How is the disease or condition treated?",
    },
    {
      number: 5,
      question: "How is the disease or condition treated?",
    },
  ];
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
                onClick={() =>
                  setOpen(open === list?.number ? "" : list?.number)
                }
              >
                <div>
                  <span className={styles["question_no"]}>{list.number}.</span>
                  <span
                    className={
                      open !== list?.number
                        ? styles["questions"]
                        : styles["somthing"]
                    }
                  >
                    {list.question}
                  </span>
                </div>
                <div>
                  {open === list?.number ? (
                    <Image src={Images.dropIcon} alt="dropIcon" />
                  ) : (
                    <Image src={Images.UpIcon} alt="upIcon" />
                  )}
                </div>
              </div>
            </div>
            <div className={styles["drop_answer_div"]}>
              <Collapse in={open === list?.number}>
                <div id="example-collapse-text">
                  <div className={styles["collapse_div"]}>
                    <div className={styles["answer_label"]}>Answer: </div>
                    <div className={styles["answers"]}>
                      Collaboratively empower multifunctional e-commerce for
                      prospective applications. Seamlessly productivate plug and
                      play markets. Collaboratively empower multifunctional.
                    </div>
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

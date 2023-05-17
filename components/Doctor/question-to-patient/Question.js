import React from "react";
import Input from "@/components/Common/UI/Input/Input";
import styles from "./question.module.scss";
import Image from "next/image";
import Images from "@/components/Images/Images";
import { useForm } from "@/components/Common/hooks/form-hook";

const Question = () => {
  const [formState, inputHandler] = useForm(
    {
      doc_signup_name: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  return (
    <div className={styles["main_container"]}>
      <div className="container">
        <div className={styles["content_inner"]}>
          <div className={styles["mebel_logo"]}>
            <Image src={Images.Home_logo} alt="" />
          </div>
          <div className={styles["inputFields"]}>
            <h1>Questions For Patient</h1>

            <Input
              placeholder="Answer"
              label="1. What is the disease or condition?"
              id="1"
              className={styles["input_1"]}
              onInput={inputHandler}
            />
            <Input
              placeholder="Answer"
              label="2. What is the disease or condition?"
              id="2"
              className={styles["input_1"]}
              onInput={inputHandler}
            />
            <Input
              placeholder="Answer"
              label="3. What symptoms should I watch for?"
              id="3"
              className={styles["input_1"]}
              onInput={inputHandler}
            />
            <Input
              placeholder="Answer"
              label="4. Do I need a follow-up visit and if so, when?"
              id="4"
              className={styles["input_1"]}
              onInput={inputHandler}
            />
            <Input
              placeholder="Answer"
              label="5. How is the disease or condition treated?"
              id="5"
              className={styles["input_1"]}
              onInput={inputHandler}
            />

            <div className={styles["question_save_btn"]}>
              <button> Save </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;

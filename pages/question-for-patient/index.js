import Question from "@/components/Doctor/question-to-patient/Question";
import React from "react";

const index = () => {
  return (
    <>
      <Question />
    </>
  );
};

export default index;

index.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
    </>
  );
};

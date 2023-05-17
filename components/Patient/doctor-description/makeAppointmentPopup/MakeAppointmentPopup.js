import React from "react";
import styles from "./MakeAppointmentPopup.module.scss";
import { useRouter } from "next/router";

const MakeAppointmentPopup = ({ modalState, data, doctorId, isDoctor }) => {
  const router = useRouter();

  const optionSelectHandler = (itemId) => {
    modalState(false);

    if (!isDoctor) {
      router.push(
        {
          pathname: "/patient/make-appointment",
          query: { id: doctorId, consultId: itemId },
        },
        undefined,
        { shallow: false }
      );
    } else {
      router.push("./patient-details");
    }
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["heading"]}>
        <div className={styles["left_heading"]}>Consultation Name</div>
        <div className={styles["right_heading"]}>Price</div>
      </div>

      {data?.map((item, index) => (
        <div
          className={styles["content"]}
          onClick={() => optionSelectHandler(item.id)}
          key={index}
        >
          <div className={styles["content_left"]}>
            <span className={styles["dot"]}></span>
            <span className={`${styles["info"]}`}>{item.name}</span>
          </div>
          <span className={`${styles["content_right"]}`}>${item.price}</span>
        </div>
      ))}
    </div>
  );
};

export default MakeAppointmentPopup;

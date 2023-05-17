import styles from "./thankyou.module.scss";
import Image from "next/image";
import Images from "@/components/Images/Images";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import FetchDataContext from "@/store/api-Context";
import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";

export default function ThankYou() {
  const router = useRouter();
  const contextData = useContext(FetchDataContext);
  const getAppointment = contextData?.saveAppointmentData;
  const { id } = router.query;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    contextData.saveAppointment(
      "save-appointment",
      {
        appointment_step: 2,
        appointment_id: id,
      },
      setLoading
    );
  }, [id]);

  const homeClickHandler = (e) => {
    e.preventDefault();
    router.push("./profile");
  };

  return (
    <>
      <div className={styles["thanku_background"]}>
        <div className={styles["cornor_img_div"]}>
          <Image src={Images.bg_arc3} alt="page cornor image" />
        </div>
        <div className="container">
          <div className={styles["main-div"]}>
            <div className={styles["img-div"]}>
              <Image src={Images.thankyou_check_icon} />
            </div>
            <div className={styles["thanku_head"]}>
              <h1 className={styles["thanku_word"]}>Thank You!</h1>
            </div>
            <div className={styles["thanku_content"]}>
              <div className={styles["thanku_paragraph"]}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text.
              </div>
            </div>
            <div>
              <div className={styles["data-div"]}>
                <div className={styles["data_1"]}>
                  <div className={styles["appoint"]}>Doctor Name</div>
                  <div>:</div>
                  <div className={styles["date"]}>
                    {getAppointment && getAppointment?.name}
                  </div>
                </div>
                <div className={styles["data_1"]}>
                  <div className={styles["appoint"]}>Appointment ID</div>
                  <div>:</div>
                  {
                    <div className={styles["date"]}>
                      {`${`#${
                        getAppointment && getAppointment?.appointment_id
                      }`}`}
                    </div>
                  }
                </div>
                <div className={styles["data_1"]}>
                  <div className={styles["appoint"]}>Pin Number</div>
                  <div>:</div>
                  <div className={styles["date"]}>
                    {getAppointment?.pin_number}
                  </div>
                </div>
                <div className={styles["data_1"]}>
                  <div className={styles["appoint"]}>Apointment Date</div>
                  <div>:</div>
                  <div className={styles["date"]}>
                    {getAppointment?.appointment_date}
                  </div>
                </div>
                <div className={styles["consult"]}>
                  <div className={styles["appoint"]}>Consultation Type</div>
                  <div>:</div>
                  <div className={styles["consultType"]}>
                    {`${getAppointment && getAppointment?.consult_type}`}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["button_div"]}>
              <button
                className={styles["thanku_btn"]}
                onClick={homeClickHandler}
                id="go_to_home"
              >
                Go To Home
              </button>
            </div>
            <div className={styles["scan_with_border"]}>
              <div className={styles["scan-div"]}>
                <Image src={Images.thankyou_qr} />
                <h5 className={styles["scan-div-text"]}>
                  your appointment QR Code
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && <LoaderSpiner />}
    </>
  );
}

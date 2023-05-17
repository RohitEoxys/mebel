import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import styles from "./patientdetails.module.scss";
import Images from "@/components/Images/Images";
import Modal from "../../Common/UI/Modal/Modal";
import Carousel from "../../Common/UI/slider/Carousel";
import { useRouter } from "next/router";
import CustomModal from "../../Common/UI/Modal/ModalForPatientDetails";
import FetchDataContext from "@/store/api-Context";
import PresetQuestionPopup from "./PresetQuestionPopup";
import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";

export default function PaientDetails() {
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showQuestionPopup, setShowQuestionPopup] = useState(false);

  const router = useRouter();
  const { x, hj564564 } = router.query;

  const contextData = useContext(FetchDataContext);
  const getPatientDetailsFromPin = contextData?.getPatientDetailsFromPin;
  // console.log("getPatientDetailsFromPin", getPatientDetailsFromPin);

  useEffect(() => {
    setLoading(true);
    contextData.pinVerifyForPatientDetails(
      "pin-verify-with-patient-details",
      { pin_number: x, appointment_id: hj564564 },
      setShowError,
      setLoading
    );
  }, [hj564564, x]);

  const modal = () => {
    setShowModal(true);
  };

  const modalState = (state) => {
    setShowModal(state);
  };

  const questionPopup = () => {
    setShowQuestionPopup(true);
  };
  const questionState = (state) => {
    setShowQuestionPopup(state);
  };

  const consultClickHandler = () => {
    router.push("/doctor/patient-consult");
  };

  return (
    <>
      {showModal && (
        <CustomModal open={showModal} modalState={modalState}>
          <Carousel />
        </CustomModal>
      )}

      <div className="container">
        {showQuestionPopup && (
          <Modal open={showQuestionPopup} modalState={questionState}>
            <PresetQuestionPopup setShowQuestionPopup={setShowQuestionPopup} />
          </Modal>
        )}
        <div className={styles["main-div"]}>
          <div className={styles["background-design-1"]}>
            <Image src={Images.bg_arc3} alt="icon" />
          </div>
          <div className={styles["heading-div"]}>
            <h3 className={styles["heading-text"]}>Patient Details</h3>
            <div className={styles["preset_div"]}>
              <div className={styles["prset_content"]}>
                <button onClick={questionPopup}>check preset questions</button>
              </div>
              <div className={styles["consult-view"]}>
                <button
                  name="Consult"
                  className={styles["consult_btn"]}
                  onClick={consultClickHandler}
                >
                  <span className={styles["icon_sec"]}>
                    <Image src={Images.consultDoc} alt="cunsolt doctor" />
                  </span>
                  <span className={styles["btn-txt"]}>Consult</span>
                </button>
              </div>
            </div>
          </div>

          <div className={styles["first-detail-div"]}>
            <div className={styles["name-sec"]}>
              <span className={styles["title"]}> Name</span>
              <span className={styles["separator"]}> :</span>
              <span className={styles["data"]}>
                &nbsp;{getPatientDetailsFromPin?.data?.pateint?.name}
              </span>
            </div>
            <div className={styles["id-sec"]}>
              <span className={styles["title"]}>Appointment ID</span>
              <span className={styles["separator"]}>:</span>
              <span className={styles["data"]}>
                &nbsp;{getPatientDetailsFromPin?.data?.pateint?.appointment_id}
              </span>
            </div>
            <div className={styles["age-sec"]}>
              <span className={styles["title"]}>Age</span>
              <span className={styles["separator"]}>:</span>
              <span className={styles["data"]}>
                &nbsp;{getPatientDetailsFromPin?.data?.pateint?.age}
              </span>
            </div>
          </div>
          <div className={styles["table-div"]}>
            {getPatientDetailsFromPin?.length === 0 ? (
              <div className={styles["image_not_foud"]}>
                <Image src={Images.no_data5} alt="no data found" />
              </div>
            ) : (
              <table className={styles["main_container"]}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Diagnosis</th>
                    <th>Dr.Name</th>
                    <th>Disease & Medicines list</th>
                    <th>Reports </th>
                  </tr>
                </thead>

                <tbody>
                  {getPatientDetailsFromPin &&
                    getPatientDetailsFromPin?.data?.details.map((item, key) => (
                      <tr key={key}>
                        <td className={styles["date_data"]}>{item.date}</td>
                        <td className={styles["dieses_data"]}>
                          {item.disease}
                        </td>
                        <td className={styles["docter_name"]}>
                          {item.doctor_name}
                        </td>
                        <td className={styles["medicine_data"]}>
                          <select name="anxity">
                            <option>{item.medicines}</option>
                          </select>
                        </td>
                        <td className={styles["icon_sec"]}>
                          <div className={styles["icons"]}>
                            <Image
                              src={Images.eye_in_square}
                              alt="view"
                              onClick={modal}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {loading ? <LoaderSpiner /> : null}
    </>
  );
}

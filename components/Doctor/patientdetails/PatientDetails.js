import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import styles from "./patientdetails.module.scss";
import Images from "@/components/Images/Images";
import Modal from "../../Common/UI/Modal/Modal";
import CustomModal from "@/components/Common/UI/Modal/Modal";
import Carousel from "../../Common/UI/slider/Carousel";
import { useRouter } from "next/router";
import FetchDataContext from "@/store/api-Context";
import PresetQuestionPopup from "./PresetQuestionPopup";
import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";
import { Button } from "@/components/Common/UI/Button/Button";
import Link from "next/link";

export default function PaientDetails() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showQuestionPopup, setShowQuestionPopup] = useState(false);

  const router = useRouter();
  const { pid: patientId } = router.query;

  const contextData = useContext(FetchDataContext);
  const getPatientDetailsFromPin = contextData?.getPatientDetailsFromPin;
  const getPresetQuestionAnswers = contextData?.getPresetQuestionAnswer;
  const appointmentDetails = contextData?.getPatientAppointments;
  const getAppointmentDetails = contextData?.getAppointmentDetails;

  useEffect(() => {
    setLoading(true);
    patientId &&
      contextData.getPresetAnswer(
        "get-preset-answer",
        { patient_id: patientId },
        setLoading
      );
  }, [patientId]);

  useEffect(() => {
    setLoading(true);
    patientId &&
      contextData.patientAppointments(
        "get-patient-appointments",
        { patient_id: patientId },
        setLoading
      );
  }, [patientId]);

  const modal = (appointmentId) => {
    setShowModal(true);

    contextData?.appointmentDetails("appointment-details", {
      appointment_id: appointmentId,
    });
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

  const reportsClickHandler = () => {
    router.push("./patient-reports");
  };

  return (
    <>
      {showModal && (
        <CustomModal open={showModal} modalState={modalState}>
          <div className="container">
            <div className={styles["preview_content"]}>
              <br />
              <div className={styles["heading"]}>
                <div className={styles["heading_1"]}>
                  Appointment id
                  <div className={styles["heading_content"]}>
                    {getAppointmentDetails?.pateint?.appointment_id}
                  </div>
                </div>
                <div className={styles["heading_1"]}>
                  Doctor Name
                  <div className={styles["heading_content"]}>
                    {getAppointmentDetails?.details?.doctor_name}
                  </div>
                </div>
                <div className={styles["heading_1"]}>
                  Date
                  <div className={styles["heading_content"]}>
                    {getAppointmentDetails?.details?.date}
                  </div>
                </div>
              </div>
              <hr />
              <div className={styles["diagonosis_name"]}>
                Diagonosis Name
                <div className={styles["items"]}>
                  {getAppointmentDetails?.details?.disease?.map((item) => (
                    <span>{item}</span>
                  ))}
                </div>
              </div>
              <hr />
              <div className={styles["diagonosis_name"]}>
                Choose Symptoms
                <div className={styles["items"]}>
                  {getAppointmentDetails?.details?.tests?.map((item) => (
                    <span>{item}</span>
                  ))}
                </div>
              </div>
              <hr />
              <div className={styles["diagonosis_name"]}>
                Prescribe Medicines
                <div className={styles["items"]}>
                  {getAppointmentDetails?.details?.medicines?.map((item) => (
                    <span>{item.name}</span>
                  ))}
                </div>
              </div>
              <hr />
              <div className={styles["diagonosis_name"]}>
                Doctor Comments
                <div className={styles["items"]}>
                  {getAppointmentDetails?.details?.doctor_comment.length
                    ? getAppointmentDetails?.details?.doctor_comment
                    : "No Comments"}
                </div>
              </div>
            </div>
          </div>
        </CustomModal>
      )}

      <div className="container">
        {showQuestionPopup && (
          <Modal open={showQuestionPopup} modalState={questionState}>
            <PresetQuestionPopup
              setShowQuestionPopup={setShowQuestionPopup}
              getPresetQuestionAnswers={
                getPresetQuestionAnswers && getPresetQuestionAnswers
              }
            />
          </Modal>
        )}
        <div
          className={`${styles["main-div"]} ${
            appointmentDetails?.length === 1 && styles["footer_fix"]
          } ${appointmentDetails?.length === 2 && styles["footer_fix1"]} ${
            appointmentDetails?.length === 3 && styles["footer_fix2"]
          }`}
        >
          <div className={styles["background-design-1"]}>
            <Image src={Images.bg_arc3} alt="icon" />
          </div>
          <div className={styles["heading-div"]}>
            <h3 className={styles["heading-text"]}>Patient Details</h3>
            <div className={styles["preset_div"]}>
              <button
                className={styles.reports_button}
                onClick={reportsClickHandler}
              >
                Reports
              </button>

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
            {appointmentDetails?.length === 0 ? (
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

                    <th>Doctor Comments</th>
                    <th>Preview</th>
                  </tr>
                </thead>

                <tbody>
                  {appointmentDetails &&
                    appointmentDetails?.map((item, key) => (
                      <tr key={key}>
                        <td className={styles["date_data"]}>{item.date}</td>
                        <td className={styles["dieses_data"]}>
                          {item.disease}
                        </td>
                        <td className={styles["docter_name"]}>
                          {item.doctor_name}
                        </td>
                        <td className={styles["doctor_comments"]}>
                          {item.doctor_comment}
                        </td>
                        <td className={styles["icon_sec"]}>
                          <div className={styles["icons"]}>
                            <Image
                              src={Images.eye_in_square}
                              alt="view"
                              onClick={() => modal(item.appointment_id)}
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

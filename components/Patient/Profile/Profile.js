import Images from "@/components/Images/Images";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "@/components/Common/UI/Button/Button";
import styles from "./profile.module.scss";
import Table from "./Table";
import ListOfPreviousConsult from "./ListOfPreviousConsult";
import UploadReports from "./UploadReports";
import MedicineList from "./MedicineList";
import { useContext, useEffect, useState } from "react";
import FetchDataContext from "@/store/api-Context";
import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";

const PatientProfile = () => {
  const contextData = useContext(FetchDataContext);
  const router = useRouter();
  const patientProfile = contextData?.patientProfile;
  const upComingAppointment = contextData?.upComingAppointment;
  const getPreviusCunsult = contextData?.getPreviusCunsult;
  const getMedicineTaken = contextData?.getMedicineTaken;
  const patientId = patientProfile && patientProfile?.data?.id;

  const [loading, setLoading] = useState(true);
  const [changeData, setChangeData] = useState(false);
  const [isUpdated, setIsUpdated] = useState(0);
  const [patientRecentReports, setPatientRecentReports] = useState([]);

  useEffect(() => {
    contextData.getApiData("get-patient-profile", "patientProfile", setLoading);
  }, []);

  useEffect(() => {
    setPatientRecentReports(contextData?.getPatientRecentReports);
  }, [contextData?.getPatientRecentReports]);

  useEffect(() => {
    contextData.getApiData(
      "upcoming-appointments",
      "upComingAppointment",
      setLoading
    );
  }, []);

  useEffect(() => {
    contextData.getApiData(
      "get-previous-consult",
      "getPreviusCunsult",
      setLoading
    );
  }, []);

  useEffect(() => {
    contextData.getApiData(
      "get-patient-reports",
      "getPatientRecentReports",
      setLoading
    );
    setChangeData(false);
  }, [contextData.reportDeleted, changeData, isUpdated]);

  useEffect(() => {
    contextData.getApiData("get-medicine-taken", "getMedicineTaken");
  }, []);

  const makeAppointmentClickhandler = () => {
    router.push("./doctor-list");
  };

  const onEditIconClickHandler = () => {
    router.push("./edit-profile");
  };

  const editBtnHandler = () => {
    router.push("./edit-profile");
  };

  return (
    <>
      <div className={styles["profile"]}>
        <div className={styles["background-design-1"]}>
          <Image src={Images.bg_arc3} alt="icon" />
        </div>
        <div className={`container ${styles["main_container"]}`}>
          <div className={styles["main_container-top"]}>
            <div className={styles["main_container-top-left"]}>
              <div className={styles["background-design-2"]}>
                <Image
                  src={Images.doc_profile_bg}
                  style={{ width: "100%" }}
                  alt="bg"
                />
              </div>
              <div className={styles["main_container-top-left-icon"]}>
                <Image
                  src={
                    patientProfile?.data
                      ? patientProfile?.data?.profile_image
                      : Images.patient_profile_icon
                  }
                  alt="patient_profile_icon"
                  width={127}
                  height={127}
                />
                <Image
                  src={Images.profile_edit_icon}
                  alt="patient_edit_icon"
                  className={styles["patient_edit_icon"]}
                  onClick={onEditIconClickHandler}
                />
              </div>

              <h1
                className={styles["firstName"]}
              >{`${patientProfile?.data?.name} ${patientProfile?.data?.last_name} `}</h1>
              <div className={styles["sub_info"]}>
                <h6>Mobile Number : {patientProfile?.data?.number}</h6>
                <h6>Email ID : {patientProfile?.data?.email}</h6>
                <h6>Age : {patientProfile?.data?.age}</h6>
                <h6>
                  Ins. Number : &nbsp;{" "}
                  <Image
                    src={Images?.green_checkmark}
                    alt=""
                    style={{ marginTop: "-3px" }}
                  />
                  &nbsp;
                  {patientProfile?.data?.insurance_number}
                </h6>
              </div>

              <Button
                name="Make an Apointment"
                width="80%"
                className={styles["make_appointment_btn"]}
                onClick={makeAppointmentClickhandler}
              />
            </div>
            <div className={styles["main_container-top-right"]}>
              <h1>Upcoming Appointment</h1>
              <div className={styles["main_container-top-right-table"]}>
                <Table upComingAppointment={upComingAppointment} />
              </div>
            </div>
          </div>
          <div className={styles["main_container_middle"]}>
            <div className={styles["main_container_middle-left"]}>
              <h1>List of Previous consult</h1>
              <ListOfPreviousConsult getPreviusCunsult={getPreviusCunsult} />
            </div>
            <div className={styles["main_container_middle-right"]}>
              <UploadReports
                getPatientRecentReports={patientRecentReports}
                patientId={patientId}
                reportStatus={setChangeData}
                setIsUpdated={setIsUpdated}
                setPatientRecentReports={setPatientRecentReports}
              />
            </div>
          </div>
          <div className={styles["main_container_bottom"]}>
            <MedicineList getMedicineTaken={getMedicineTaken} />
          </div>
        </div>
        <div className="addReportBtmn">
          <Button
            name="Edit Profile"
            mainDiv={styles["btn_main"]}
            className={styles["btn_main_btn"]}
            onClick={editBtnHandler}
          />
        </div>
      </div>
      {loading ? <LoaderSpiner /> : null}
    </>
  );
};

export default PatientProfile;

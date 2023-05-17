import styles from "./sharereport.module.scss";
import Image from "next/image";
import Images from "@/components/Images/Images";
import Router, { useRouter } from "next/router";
import FetchDataContext from "@/store/api-Context";
import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import { ProgressBar } from "react-bootstrap";
import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";
// import CustomModal from "@/components/Common/UI/Modal/ModalForPatientDetails";
import CustomModal from "../../Common/UI/Modal/Modal";
import TostifyContainer from "@/components/Common/TostifyContainer/TostifyContainer";
import QRCode from "react-qr-code";
import Modal from "../../Common/UI/Modal/Modal";
import ReportsPopup from "./ReportsPopup";
import { pdfjs } from "react-pdf";

const monthName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Set the pdfjs worker URL here
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function ShareReports() {
  const router = useRouter();
  const [showError, setShowError] = useState();
  const [file, setFile] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(false);
  const contextData = useContext(FetchDataContext);
  const [patientsReports, setPatientsReports] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [modalImageData, setModalImageData] = useState(null);
  const [fullUrl, setFullUrl] = useState("");
  const [reportPopup, setReportPopup] = useState(false);
  const [patientId, setPatientId] = useState(null);
  const [recallGetPatientReport, setRecallGetPatientReport] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const resReports = contextData?.getReportsData;
  const getPatientReport = contextData?.getUploadedReports || [];

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let currentDate = `${day < 10 ? `0${day}` : day} ${monthName[month]} ${year}`;

  const getTodaysReports = getPatientReport?.filter(
    (item) => item.date === currentDate
  );

  const { id } = router.query;

  const nextClickHandler = () => {
    Router.push({ pathname: "./thankyou", query: { id } });
  };

  const skipClickhandler = () => {
    Router.push({ pathname: "./thankyou", query: { id } });
  };

  const deleteReports = (id) => {
    setLoading(true);
    contextData.deleteUploadReport("delete-appointment-report", id);
    setRecallGetPatientReport(true);
  };

  const onImageChange = (e) => {
    let errorExists = false;
    const files = [...e.target.files];
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/pdf",
      "image/docx",
    ];
    const fileTypes = files.map((file) => file.type);
    fileTypes.forEach((type) => {
      if (!allowedTypes.includes(type)) {
        setShowError("Image type must be JPG, PNG, JPEG, PDF or DOCX format.");
        if (errorExists) {
          errorExists(true);
        }
      }
    });
    if (errorExists) {
      return false;
    }
    const maxSize = 5 * 1024 * 1024; // 5 MB
    files.forEach((file) => {
      if (file.size > maxSize) {
        setShowError("File size must be less than 5 MB.");
        errorExists = true;
      }
    });
    if (errorExists) {
      return false;
    }
    setShowError("");
    setFile([...file, ...files]);
    // setFile(files);
    const formData = new FormData();
    formData.append("appointment_id", shareId);
    for (let i in files) {
      formData.append(`report[${i}]`, files[i]);
    }
    if (files) {
      setLoading(true);
      contextData.patientUploadReports(
        "upload-reports",
        formData,
        setProgress,
        setLoading
      );
    }
  };

  const modalState = (state) => {
    setShowModel(state);
  };

  useEffect(() => {
    if (window) {
      const data = JSON.parse(sessionStorage.getItem("mebel_user"));
      setPatientId(data?.id);
    }
  }, []);

  function formatFileSize(bytes) {
    const KB = 1024;
    const MB = KB * 1024;
    if (bytes < KB) {
      return bytes + " bytes";
    } else if (bytes < MB) {
      return (bytes / KB).toFixed(2) + " KB";
    } else {
      return (bytes / MB).toFixed(2) + " MB";
    }
  }

  const handleUpload = () => {
    setReportPopup(true);
  };

  const reportState = (state) => {
    setReportPopup(state);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(window.location.href);
    }
  });

  useEffect(() => {
    setLoading(true);
    contextData.getPatientReports(
      "get-patient-reports",
      setLoading
      // patientId
      // getPatientReport
    );
    setRecallGetPatientReport(false);
  }, [resReports, recallGetPatientReport]);

  return (
    <>
      {modalImageData && showModel && (
        <CustomModal open={showModel} modalState={modalState}>
          <div className="iframe_content">
            <iframe src={modalImageData} />
          </div>
        </CustomModal>
      )}
      {reportPopup && (
        <Modal open={reportPopup} modalState={reportState}>
          <ReportsPopup
            patientId={patientId}
            setReportPopup={setReportPopup}
            setRecallGetPatientReport={setRecallGetPatientReport}
          />
        </Modal>
      )}
      <div className={styles["share_reports_main"]}>
        <div className={styles["reports_back"]}>
          <Image src={Images.bg_arc3} alt="cornor image" />
        </div>
        <div className="container">
          <div className={styles["con"]}>
            <Image
              className={styles["container_img"]}
              src={Images.bg_arc3}
              alt="background"
            />
            <div className={styles["upper_div"]}>
              <div className={styles["heading_div"]}>
                <h1 className={styles["heading_1"]}>
                  Scan & Share Your Reports
                </h1>
              </div>
              <div>
                <h5 className={styles["heading_2"]}>
                  please scan this QR Code and upload your reports
                </h5>
              </div>
            </div>

            <div className={styles["lower_div"]}>
              {/* <div className={styles["left_div"]}>
                <div className={styles["left_div_img"]}>
                  <div className={styles["qr_code"]}>
                    <QRCode value={fullUrl} />
                  </div>
                </div>
                <h4 className={styles["left_div_text"]}>
                  please scan this QR Code and upload your reports
                </h4>
                <div className={styles["reload_report_btn"]}>
                  <button className={styles["left_div_btn"]} id="reload_report">
                    Reload report
                  </button>
                </div>
              </div> */}

              <div className={styles["right_div"]}>
                <div className={styles["reports_div"]}>
                  <h3 className={styles["right_div_heading_1"]}>
                    Your Reports
                  </h3>
                  <div className={styles["patient_report"]}>
                    {getTodaysReports
                      ? getTodaysReports?.map((filsData, key) => (
                          <div
                            className={styles["patient_title_reports"]}
                            key={key}
                          >
                            <div className={styles["report_title"]}>
                              {`${key < 9 ? "0" : ""}${key + 1}. ${
                                filsData?.report_title
                              }`}
                            </div>
                            <div className={styles["report_uploaded"]}>
                              <div className={styles["images_with_name"]}>
                                <div className={styles["gallery_img_div"]}>
                                  {filsData &&
                                  filsData.name &&
                                  filsData.name.includes("pdf") ? (
                                    <Image
                                      src={Images.pdf_icon}
                                      alt="uploaded reports"
                                      width={25}
                                      height={25}
                                    />
                                  ) : filsData.name.includes("docx") ? (
                                    <Image
                                      src={Images.docx_file3}
                                      alt="uploaded reports"
                                      width={25}
                                      height={25}
                                    />
                                  ) : (
                                    <Image
                                      src={filsData?.report}
                                      alt="uploaded reports"
                                      width={25}
                                      height={25}
                                    />
                                  )}
                                </div>
                                <div className={styles["reports_file_name"]}>
                                  <div className={styles["file_name"]}>
                                    {filsData?.name.toString().slice(-30)}
                                  </div>
                                  <div className={styles["file_size"]}>
                                    {filsData?.size}
                                  </div>
                                </div>
                              </div>
                              <div className={styles["two_images"]}>
                                <div
                                  className={styles["view_patient_reports"]}
                                  onClick={() => {
                                    setShowModel(true),
                                      setModalImageData(filsData?.report);
                                  }}
                                >
                                  <Image
                                    src={Images.eye_in_circle_icon}
                                    alt="download file icon"
                                  />
                                </div>
                                <div
                                  className={styles["view_patient_reports"]}
                                  onClick={() => deleteReports(filsData?.id)}
                                >
                                  <Image
                                    src={Images.report_trash}
                                    alt="delete icon"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
                {/* {file.length > 0 ? (
                  <div className={styles["uploading_div"]}>
                    <div className={styles["box_div_right"]}>
                      {file.map((fileList, key) => (
                        <div key={key}>
                          <div>
                            <div className={styles["box_div"]}>
                              <div className={styles["box_div_left"]}>
                                <Image
                                  className={styles["box_div_left_img"]}
                                  src={Images.gallery_images}
                                  alt="123"
                                />
                              </div>
                              <div className={styles["name_with_progresbar"]}>
                                <div className={styles["box_div_right_h5"]}>
                                  {fileList.name} {key + 1}
                                </div>
                                <ProgressBar now={progress} />
                                <div className={styles["size_and_percentage"]}>
                                  <div className={styles["box_div_right_p"]}>
                                    {formatFileSize(fileList.size)}
                                  </div>
                                  <div
                                    className={styles["file_percentage"]}
                                  >{`${progress}%`}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : getPatientReport.length == 0 ? (
                  <h5>No Reports Found</h5>
                ) : null} */}
                {/* {file.length > 0 ? (
                  <div className={styles["uploading_div"]}>
                    <div className={styles["box_div_right"]}>
                      {file.map((fileList, key) => (
                        <div key={key}>
                          <div>
                            <div className={styles["box_div"]}>
                              <div className={styles["box_div_left"]}>
                                <Image
                                  className={styles["box_div_left_img"]}
                                  src={Images.gallery_images}
                                  alt="123"
                                />
                              </div>
                              <div className={styles["name_with_progresbar"]}>
                                <div className={styles["box_div_right_h5"]}>
                                  {fileList.name} {key + 1}
                                </div>
                                <ProgressBar now={progress} />
                                <div className={styles["size_and_percentage"]}>
                                  <div className={styles["box_div_right_p"]}>
                                    {formatFileSize(fileList.size)}
                                  </div>
                                  <div
                                    className={styles["file_percentage"]}
                                  >{`${progress}%`}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <h5>No Reports Found</h5>
                )} */}
                {/* } */}
                <div className="erors_message">{showError}</div>
                <div className={styles["upload_report_btn"]}>
                  <label
                    // htmlFor="files"
                    className={styles["right_div_btn"]}
                    id="upload_report"
                    onClick={handleUpload}
                  >
                    Upload Reports
                  </label>
                  <input
                    // type="file"
                    className="hidden"
                    id="files"
                    multiple
                    style={{ display: "none" }}
                    onChange={(e) => onImageChange(e)}
                  />

                  {/* <input
                    type="file"
                    id="selectFiles"
                    multiple
                    className={styles["right_div_btn"]}
                  /> */}
                </div>
              </div>
            </div>
            <div className={`${styles["skip_app_btn"]} ${styles.footer_set}`}>
              {getTodaysReports.length < 1 ? (
                <button
                  className={styles["skip_btn"]}
                  onClick={skipClickhandler}
                >
                  Skip
                </button>
              ) : null}
              <button
                className={styles["main_btn"]}
                onClick={nextClickHandler}
                id="book_appointment"
                disabled={getTodaysReports && getTodaysReports.length < 1}
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading ? <LoaderSpiner /> : null}
    </>
  );
}

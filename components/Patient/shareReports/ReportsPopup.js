import React, { useState } from "react";
import styles from "./ReportsPopup.module.scss";
import { useContext } from "react";
import FetchDataContext from "@/store/api-Context";
import { Button } from "@/components/Common/UI/Button/Button";

const ReportsPopup = ({
  patientId,
  setReportPopup,
  setRecallGetPatientReport,
  setFeedback,
  setIsUpdated,
  setPatientRecentReports,
}) => {
  const [showError, setShowError] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [reportName, setReportName] = useState();
  const [reportError, setReportError] = useState(false);
  const contextData = useContext(FetchDataContext);

  const getReportName = (e) => {
    setReportName(e.target.value);
    setReportError(false);
  };
  const onImageChange = (e) => {
    let errorExists = false;
    const image = e.target.files[0];
    if (
      !image?.name.match(/\.(jpeg|jpg|png|pdf|docx|JPEG|JPG|PNG|PDF|DOCX)$/)
    ) {
      setShowError("Image type must be JPG, JPEG, PNG, PDF or DOCX format");
      errorExists = true;
    }
    if (errorExists) {
      return false;
    }
    setSelectedFile(e.target.files[0]);
    setShowError("");
  };

  const handleSave = () => {
    const formData = new FormData();
    if (reportName?.trim()) {
      formData.append("report_title", reportName);
      formData.append("report", selectedFile);
      formData.append("patient_id", patientId);
      contextData.patientUploadReports(
        "upload-reports",
        formData,
        setFeedback,
        "",
        setIsUpdated,
        setPatientRecentReports
      );
      setReportPopup(false);
      setTimeout(() => {
        setRecallGetPatientReport(true);
      }, 500);
      if (setFeedback) {
        setFeedback(false);
      }
    } else {
      setReportError(true);
    }
  };

  return (
    <div className={styles["uploads_reports"]}>
      <h2 className={styles["reports_head"]}>Upload Reports</h2>
      <div className={styles["report_description"]}>Report Description</div>
      <div className={styles["textarea_input"]}>
        <textarea
          cols="0"
          rows="4"
          value={reportName}
          onChange={getReportName}
          placeholder="Report Description"
        ></textarea>
        <div className={styles["reportError"]}>
          {reportError && "Report name is required"}
        </div>
      </div>
      <div className={styles["textarea_with_upload"]}>
        <div>
          {" "}
          {selectedFile && selectedFile
            ? selectedFile?.name?.toString().slice(-30)
            : "choose file"}{" "}
        </div>
        <div className={styles["upload_report_btn"]}>
          <label
            htmlFor="file-upload"
            id="upload_report"
            className={styles["custom-file-upload"]}
          >
            Upload Report
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={(e) => onImageChange(e)}
          />
        </div>
      </div>
      <div className="erors_message">{showError && showError}</div>
      <div className={styles["save_btn"]}>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default ReportsPopup;

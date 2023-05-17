import Image from "next/image";
import styles from "./uploadReports.module.scss";
import Images from "@/components/Images/Images";
import { Button } from "@/components/Common/UI/Button/Button";
import FileDownload from "@/components/FileDownload/FileDownload";
import React, { useContext, useEffect, useState } from "react";
import FetchDataContext from "@/store/api-Context";
import Link from "next/link";
import { Popconfirm } from "antd";
import CustomModal from "@/components/Common/UI/Modal/Modal";
import ReportsPopup from "../shareReports/ReportsPopup";
import { message } from "antd";

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

const UploadReports = ({
  getPatientRecentReports,
  patientId,
  reportStatus,
  setIsUpdated,
  setPatientRecentReports,
}) => {
  const contextData = useContext(FetchDataContext);

  const [reportPopup, setReportPopup] = useState(false);

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(false);

  const recentReports = getPatientRecentReports || [];
  const getTodaysReports = recentReports?.filter((item, key) => key < 2);

  const deleteReports = (id) => {
    contextData.deleteUploadReport(
      "delete-appointment-report",
      id,
      setShowFeedback
    );
  };

  useEffect(() => {
    if (showFeedback === "success") {
      message.success("Deleted Successfully");
      setShowFeedback(false);
    } else if (showFeedback === "failed") {
      message.error("Failed!");
    }
  }, [showFeedback]);

  useEffect(() => {
    if (feedback === "success") {
      message.success("Uploaded Successfully");
      setShowFeedback(false);
    } else if (feedback === "failed") {
      message.error("Upload Failed!");
    }
  }, [feedback]);

  const addReportBtnClickHandler = () => {
    setReportPopup(true);
  };

  const modalState = (state) => {
    setReportPopup(state);
  };

  return (
    <div className={styles["main_container"]}>
      <div className={styles["hidden"]}>{showFeedback}</div>
      <div className={styles["hidden"]}>{feedback}</div>

      {reportPopup && (
        <CustomModal open={reportPopup} modalState={modalState}>
          <ReportsPopup
            patientId={patientId}
            setReportPopup={setReportPopup}
            setRecallGetPatientReport={reportStatus}
            setFeedback={setFeedback}
            setIsUpdated={setIsUpdated}
            setPatientRecentReports={setPatientRecentReports}
          />
        </CustomModal>
      )}
      <div className={styles["main_container_bottom"]}>
        <div className={styles["main_container_bottom-heading"]}>
          <h3>Recent Reports</h3>
          {getTodaysReports?.length > 0 ? (
            <Link href="./recent-reports">View All</Link>
          ) : null}
        </div>

        {getTodaysReports?.length == 0 ? (
          <div className={styles["no_data_div"]}>
            <Image src={Images.no_data5} alt="no data found image" />
          </div>
        ) : (
          <>
            {/* <div className={styles["main_container_bottom-report"]}>
              <h5>01. Diagnostic : COVID-19</h5>
            </div> */}
            {getTodaysReports &&
              getTodaysReports?.map((item, key) => (
                <React.Fragment key={key}>
                  <div className={styles["report_name"]}>
                    {`0${key + 1}. ${item?.report_title}`}
                  </div>
                  <div
                    className={styles["main_container_bottom-report-box"]}
                    key={key}
                  >
                    <div
                      className={
                        styles["main_container_bottom-report-box-left"]
                      }
                    >
                      {item && item.name && item.name.includes("pdf") ? (
                        <Image
                          src={Images.pdf_icon}
                          alt="uploaded reports"
                          width={25}
                          height={25}
                        />
                      ) : item.name.includes("docx") ? (
                        <Image
                          src={Images.docx_file3}
                          alt="uploaded reports"
                          width={25}
                          height={25}
                        />
                      ) : (
                        <img src={item.report} alt="icon" />
                      )}
                      <div className={styles["report_text"]}>
                        <span>{item?.name.slice(0, 15)}</span>
                        <div>
                          <h6>{item?.size}</h6>
                          <h6>{item?.date}</h6>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        styles["main_container_bottom-report-box-right"]
                      }
                    >
                      <Image
                        src={Images.download_table_btn}
                        alt="download btn"
                        onClick={() => {
                          FileDownload(item?.report);
                        }}
                      />

                      <Popconfirm
                        title="Delete This Report"
                        description="Are you sure to delete this Report?"
                        placement="topLeft"
                        onConfirm={() => deleteReports(item?.id)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{
                          className: `${styles["custom-popconfirm-btn"]}`,
                        }}
                      >
                        <Image src={Images.recylebinIcon} alt="" />
                      </Popconfirm>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            <div className="addReportBtmn">
              <Button
                name="Upload Reports"
                mainDiv={styles["btn_main"]}
                className={styles["btn_main_btn"]}
                onClick={addReportBtnClickHandler}
              />
            </div>
          </>
        )}

        {/* <div className={styles["main_container_bottom-report"]}>
          <h5>01. Diagnostic : COVID-19</h5>
        </div>
        <div className={styles["main_container_bottom-report-box"]}>
          <div className={styles["main_container_bottom-report-box-left"]}>
            <Image src={Images.reports_gallery_icon} alt="icon" />
            <div className={styles["report_text"]}>
              <span>report02.png</span>
              <h6>20.00kb</h6>
            </div>
          </div>
          <div className={styles["main_container_bottom-report-box-right"]}>
            <Image src={Images.download_table_btn} alt="download btn" />
            <Image
              src={Images.trash_btn}
              alt="trash btn"
              className={styles["icon_trashBtn"]}
            />
          </div>
        </div> */}
      </div>
      {/* <Button name="Upload Report" className={styles["button"]} width="65%" /> */}
    </div>
  );
};

export default UploadReports;

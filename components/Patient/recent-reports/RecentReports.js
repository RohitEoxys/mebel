import Images from "@/components/Images/Images";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { PopupButton, message, Popconfirm } from "antd";

import styles from "./RecentReports.module.scss";
import { Button } from "@/components/Common/UI/Button/Button";
import FetchDataContext from "@/store/api-Context";
import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";
import FileDownload from "@/components/FileDownload/FileDownload";
import CustomModal from "@/components/Common/UI/Modal/Modal";
import ReportsPopup from "../shareReports/ReportsPopup";

const RecentReports = () => {
  const [loading, setLoading] = useState(true);
  const [changeData, setChangeData] = useState(false);

  const [reportPopup, setReportPopup] = useState(false);
  const [patientId, setPatientId] = useState(null);

  const contextData = useContext(FetchDataContext);
  const getPatientRecentReports = contextData?.getPatientRecentReports || [];

  const modalState = (state) => {
    setReportPopup(state);
  };

  useEffect(() => {
    setLoading(true);
    contextData.getApiData(
      "get-patient-reports",
      "getPatientRecentReports",
      setLoading
    );
    setChangeData(false);
  }, [changeData, setChangeData]);

  useEffect(() => {
    if (window) {
      const data = JSON.parse(sessionStorage.getItem("mebel_user"));
      setPatientId(data?.id);
    }
  }, []);

  const addReportBtnClickHandler = () => {
    setReportPopup(true);
  };

  const deleteReports = (id) => {
    setLoading(true);
    contextData.deleteUploadReport("delete-appointment-report", id);
    setChangeData(true);
  };

  const cancel = (e) => {};

  return (
    <div
      className={`${styles["main_container"]} ${
        getPatientRecentReports.length === 1 && styles["footerFix1"]
      }  ${getPatientRecentReports.length === 2 && styles["footerFix2"]}`}
    >
      {reportPopup && (
        <CustomModal open={reportPopup} modalState={modalState}>
          <ReportsPopup
            patientId={patientId}
            setReportPopup={setReportPopup}
            setRecallGetPatientReport={setChangeData}
          />
        </CustomModal>
      )}
      <div className={styles["image"]}>
        <Image src={Images.bg_arc3} alt="bg" />
      </div>
      <div className={styles["main_container_content"]}>
        <div className="container">
          <div
            className={` justify-content-center ${styles["main_container_content_inner"]}`}
          >
            <h1 className="col-10 col-md-12  tex-align-start">
              Recent Reports
            </h1>

            {getPatientRecentReports.length > 0 ? (
              getPatientRecentReports?.map((e, index) => {
                return (
                  <div className={styles["all_card"]} key={index}>
                    <div className={styles["report_name"]}>
                      {e.report_title}
                    </div>
                    <div className={`col-10 col-md-12 ${styles.card}`}>
                      <div className={`${styles.card_content}`}>
                        <div className={styles["left"]}>
                          <div className={`${styles.gallery_icon}`}>
                            {e && e.name && e.name.includes("pdf") ? (
                              <Image
                                src={Images.pdf_icon}
                                alt="uploaded reports"
                                width={25}
                                height={25}
                              />
                            ) : e.name.includes("docx") ? (
                              <Image
                                src={Images.docx_file3}
                                alt="uploaded reports"
                                width={25}
                                height={25}
                              />
                            ) : (
                              <Image
                                src={e.report}
                                alt="profile"
                                height={25}
                                width={25}
                              />
                            )}
                          </div>
                          <div className={`${styles.card_content_top}`}>
                            <h3>{e.name}</h3>

                            <div className={styles["info"]}>
                              <p>{e.size}</p>
                              <span>{e.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles["card_buttons"]}>
                        <Image
                          src={Images.download_table_btn}
                          onClick={() => {
                            FileDownload(e?.report);
                          }}
                          alt=""
                        />

                        <Popconfirm
                          title="Delete This Report"
                          description="Are you sure to delete this Report?"
                          onConfirm={() => deleteReports(e?.id)}
                          onCancel={cancel}
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
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: "center" }}>
                {" "}
                <Image src={Images.no_data_found2} alt="" />
              </div>
            )}
            <div className="addReportBtmn">
              <Button
                name={"Add Reports"}
                mainDiv={styles["btn_main"]}
                className={styles["btn_main_btn"]}
                onClick={addReportBtnClickHandler}
              />
            </div>
          </div>
        </div>
      </div>
      <div>{loading && <LoaderSpiner />}</div>
    </div>
  );
};

export default RecentReports;

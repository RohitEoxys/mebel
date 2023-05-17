import Images from "@/components/Images/Images";
import Image from "next/image";
import React from "react";
import styles from "./reportPrescription.module.scss";

const medicineList = [
  {
    name: "Cyclobenzaprine",
    details: "4 days tablets, start to Monday, take  after breakfast",
  },
  {
    name: "Naltrexone",
    details: "3 days tablets, take monday & sunday, take  after Dinner",
  },
  {
    name: "Hydrochlorothiazide",
    details: "3 days tablets, start to Thursday , take  after breakfast",
  },
];

const ReportPrescription = () => {
  return (
    <div className={styles["main_container"]}>
      <div className={styles["main_container_content"]}>
        <div size="A4" className={styles["main_container_content_page"]}>
          <div className={styles["header"]}>
            <Image
              src={Images.reportHeader}
              className={styles["header_bgImage"]}
              alt="bg"
            />
            <Image
              src={Images.Home_logo}
              className={styles["header_logo"]}
              alt="logo"
            />
          </div>
          <div className={styles["content"]}>
            <div className={styles["content_titles"]}>
              <div className={styles["content_titles_name"]}>
                <div>
                  Name &nbsp;&nbsp;: <span>Rohit Sharma</span>
                </div>
              </div>
              <div className={styles["content_titles_age"]}>
                <div style={{ marginRight: "64px" }}>
                  Age &nbsp;&nbsp; &nbsp;&nbsp; : <span>26 Year</span>
                </div>
                <div>
                  Sex &nbsp;&nbsp;: <span>Male</span>
                </div>
              </div>
              <div className={styles["content_titles_date"]}>
                <div>
                  Date&nbsp;&nbsp; &nbsp;&nbsp; : <span>12 sep 2022</span>
                </div>
              </div>
            </div>
            <div className={styles["content_medicinelist_section"]}>
              <h1>suggested Medicines List</h1>
              {/* list */}
              {medicineList.map((item, index) => (
                <div
                  className={styles["content_medicinelist_section_list"]}
                  key={index}
                >
                  <div
                    className={styles.content_medicinelist_section_list_details}
                  >
                    {item.name} &nbsp; :<span>&nbsp; {item.details}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles["diagnosis"]}>
              <h1>Diagnosis</h1>

              <div>
                Diagnosis Name &nbsp; :<span>&nbsp; COVID-19</span>
              </div>
            </div>

            <div className={styles["bottom_section"]}>
              <div className={styles["bottom_section_hrTag"]}>
                <div className={styles["bottom_section_hrTag_1"]}></div>
                <div className={styles["bottom_section_hrTag_2"]}></div>
              </div>
              <div className={styles["dr_details"]}>
                <div className={styles["dr_details_left"]}>
                  <h1>Dr. Vishnu Pareek</h1>
                  <h3>Dental Surgeon</h3>
                </div>
                <div className={styles["dr_details_right"]}>
                  <h1>Dr. Vishnu Pareek</h1>
                  <h3>Dental Surgeon</h3>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className={styles["footer"]}>
            <h1>Address : Vaisali Nagar, jaipur, rajsthan, india</h1>
            <span className={styles["footer_phone"]}>
              Phone : +91 987654321
            </span>
            <span className={styles["footer_gmail"]}>
              Gmail : hospital12@gmail.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPrescription;

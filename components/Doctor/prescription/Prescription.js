import React, { useState } from "react";
import { Checkbox } from "antd";
import Image from "next/image";
import styles from "./prescription.module.scss";
import Images from "@/components/Images/Images";
import CustomModal from "@/components/Common/UI/Modal/Modal";
import Popup from "@/components/Common/UI/pop-ups/Popup";
import { useRouter } from "next/router";

const CheckboxGroup = Checkbox.Group;

const before = ["Before Breakfast", "Before Lunch", "Before Dinner"];
const after = ["After Breakfast", "After Lunch", "After Dinner"];
const disease = ["Covid-19", "Gastroscopy", "Electrocardiogram"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const medicineDays = [
  {
    value: "1",
    label: "01",
  },
  {
    value: "2",
    label: "02",
  },
  {
    value: "3",
    label: "03",
  },
];

let numday = [1, 2, 3, 4, 5, 6, 7];

const Prescription = () => {
  const [show, setShow] = useState(false);
  const [addMedicinePopup, setAddMedicinePopup] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const router = useRouter();

  const modalState = (state) => {
    setShow(state);
    setAddMedicinePopup(state);
  };

  const addMedicineClickHandler = () => setAddMedicinePopup(true);
  const addMedicalStudiesClickHandler = () => setShow(true);
  const popupAddClickHandler = () => setShow(false);

  const handelClick = (e) => {
    e.preventDefault();
    router.push("/templates/certificate");
  };

  const onHandelClick = () => {
    setDropdown(!dropdown);
  };

  return (
    <>
      <div className={styles["main"]}>
        <div className="container">
          {addMedicinePopup && (
            <CustomModal open={addMedicinePopup} modalState={modalState}>
              <Popup
                title="Add Medicine"
                input
                inputLabel="Medicine Name"
                inputPlaceholder="Enter Medicine Name"
                buttonName={"Add"}
                mainBtnClass={styles["add_btn"]}
                btnOnClick={popupAddClickHandler}
                mainInputClass={styles["medicalStudiesPopupInput"]}
              />
            </CustomModal>
          )}

          {show && (
            <CustomModal open={show} modalState={modalState}>
              <Popup
                title="Add Medical Studies"
                input
                inputLabel="Medicine Studies Name"
                inputPlaceholder="Enter Medicine Studies Name"
                buttonName={"Add"}
                mainBtnClass={styles["add_btn"]}
                btnOnClick={popupAddClickHandler}
                mainInputClass={styles["medicalStudiesPopupInput"]}
              />
            </CustomModal>
          )}
          <div className={styles["background-design-1"]}>
            <Image src={Images.bg_arc3} alt="icon" />
          </div>
          <div className={styles["main_container"]}>
            <div className={styles["main_container_top"]}>
              <div className={styles["main_container_top-heading"]}>
                <div className={styles["main_container_top-heading-left"]}>
                  Prescribe Medicine
                </div>
                <div className={styles["main_container_top-heading-right"]}>
                  <button id="print-send-1" onClick={handelClick}>
                    Print/Send To Email
                  </button>
                </div>
              </div>
              <div className={styles["main_container_top-content"]}>
                Suggested medicines list
                <hr />
                <div className={styles["medicine_details"]}>
                  <span className={styles["medicine_name"]}>
                    <input type="checkbox" />
                    <label>Cyclobenzaprine</label>
                  </span>

                  <div className={styles["medicine_details-timing"]}>
                    <div className={styles["medicine_details-timing-web-1"]}>
                      <div
                        className={styles["drop-down"]}
                        onClick={onHandelClick}
                      >
                        <span className={styles["question"]}>
                          How many days?
                        </span>
                        <span>
                          <Image
                            src={Images.downarrowdeepblue}
                            alt="downarrow"
                          />
                        </span>
                      </div>
                      {dropdown ? (
                        <div className={styles["dropdown-div"]}>
                          {numday?.map((item, key) => (
                            <div className={styles["item_day"]} key={key}>
                              <span>{item}</span>
                              <span>Day</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className={styles["medicine_details-timing-web-2"]}>
                      {before?.map((item, key) => (
                        <span>
                          <input type="checkbox" />
                          <label>{item}</label>
                        </span>
                      ))}
                    </div>

                    <div className={styles["medicine_details-timing-web-2"]}>
                      {after?.map((item, key) => (
                        <span key={key}>
                          <input type="checkbox" />
                          <label>{item}</label>
                        </span>
                      ))}
                    </div>
                    <div className={styles["medicine_days"]}>
                      {days?.map((item, key) => (
                        <React.Fragment key={key}>
                          <input type="checkbox" key={key} />
                          <label>{item}</label>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles["search_section"]}>
                  <div className={styles["search-2-div"]}>
                    <div className={styles["search-2-div-1"]}>
                      <div className={styles["search-2-div-2"]}></div>

                      <div className={styles["add-btn-div"]}>
                        <button
                          id="add-medicine"
                          className={styles["search-btn-2"]}
                          onClick={addMedicineClickHandler}
                        >
                          <Image src={Images.plus_in_circle_icon} alt="icon" />
                          <span>Add Medicine</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles["main_container_bottom"]}>
              <h1>Medical Studies</h1>
              <hr />
              <div className={styles["medical_studies"]}>
                Medical Studies Name
              </div>
              <div className={styles["search_section2"]}>
                <div className={styles["search_section2-search"]}>
                  <div className={styles["input-tag"]}>
                    <span>
                      <Image src={Images.search_normal} alt="searchIcon" />
                    </span>
                    <input
                      type="text"
                      placeholder="Search and select diagnosis name"
                    />
                  </div>
                </div>
                <div className={styles["search_section2-button"]}>
                  <button
                    id="add-medical-studies"
                    className={styles["search-btn-2"]}
                    onClick={addMedicalStudiesClickHandler}
                  >
                    <Image src={Images.plus_in_circle_icon} alt="icon" />
                    <span>Add Medical Studies</span>
                  </button>
                </div>
              </div>
              <div className={styles["bottom_checkbox"]}>
                <div className={styles["bottom_checkbox-top"]}>
                  {disease?.map((item, key) => (
                    <div className={styles["checkbox_data"]} key={key}>
                      <input type="checkbox" />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className={styles["button-last"]}>
                  <button id="print-send-2" onClick={handelClick}>
                    Print/Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prescription;

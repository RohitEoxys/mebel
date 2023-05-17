import styles from "./patientconsult.module.scss";
import Image from "next/image";
import Images from "@/components/Images/Images";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import CustomModal from "@/components/Common/UI/Modal/Modal";
import FetchDataContext from "@/store/api-Context";
import Popup from "@/components/Common/UI/pop-ups/Popup";
import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";
import clickOutsideToFalseDrop from "@/components/Common/ClickOutsideToFalseDrop/clickOutsideToFalseDrop";
import Checkbox from "antd/lib/checkbox/Checkbox";

export default function PatientConsult() {
  const [show, setShow] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchDieseaseValues, setSearchDieseaseValues] = useState([]);
  const [searchSymptomValues, setSearchSymptomValues] = useState([]);
  const [selectedDiseaseItems, setSelectedDiseaseItems] = useState([]);
  const [selectedSypmtomsItems, setSelectedSypmtomsItems] = useState([]);

  const [searchDiseaseDropdownDisplay, setSearchDiseaseDropdownDisplay] =
    useState(false);
  const [searchSypmptomsDropdownDisplay, setSearchSypmptomsDropdownDisplay] =
    useState(false);
  const diseaseSearchListRef = useRef(null);
  const symptomsSearchListRef = useRef(null);

  clickOutsideToFalseDrop(diseaseSearchListRef, () =>
    setSearchDiseaseDropdownDisplay(false)
  );

  clickOutsideToFalseDrop(symptomsSearchListRef, () =>
    setSearchSypmptomsDropdownDisplay(false)
  );
  // const [showModal, setShowModal] = useState(false);

  const contextData = useContext(FetchDataContext);
  const diseaseData = contextData.getDiseaseName || [];
  const symptomData = contextData.getSymptomName || [];
  const selectedDiseaseSymptoms = contextData?.getDiseaseSypmtom || [];

  useEffect(() => {
    contextData.getApiData("get-disease", "get-disease-name", setLoading);
  }, []);

  useEffect(() => {
    contextData.getApiData("get-symptom", "get-symptom-name", setLoading);
  }, []);

  const modal = () => {
    setShowModal(true);
  };

  const modalState = (state) => {
    setShow(state);
    setAddPopup(state);
  };

  const addClickHandler = () => setAddPopup(true);
  const popupAddClickHandler = () => setShow(false);

  const clickHandeler = (e) => {
    setShow(!show);
  };

  const clickHandeler1 = (e) => {
    setShow1(!show1);
  };

  const clickHandeler2 = (e) => {
    setShow2(!show2);
  };
  const router = useRouter();

  const prescriptionClickHandler = () => {
    router.push("/doctor/prescription");
  };

  const diseaseSearchChangeHandler = (e) => {
    const value = diseaseData.filter((item) => {
      if (item.name === e.target.value) {
        setSearchDiseaseDropdownDisplay(true);
        return item;
      }
    });
    setSearchDieseaseValues(value);
  };

  const diseaseItemClickHandler = (value) => {
    if (selectedDiseaseItems.includes(value)) {
      return;
    } else {
      setSelectedDiseaseItems((prevState) => [value]);
    }
    setSearchDiseaseDropdownDisplay(false);
    setLoading(true);

    contextData?.selectedDiseaseSymptoms(
      "get-disease-symptom",
      {
        disease_id: value.id,
      },
      setLoading
    );
  };

  const diseaseCloseIconClickHandler = (id) => {
    if (selectedDiseaseItems.includes(id)) {
      setSelectedDiseaseItems((prevState) =>
        prevState.filter((existing) => existing !== id)
      );
    }
  };

  const symptomsSearchChangeHandler = (e) => {
    const value = symptomData.filter((item) => {
      if (item.name === e.target.value) {
        setSearchSypmptomsDropdownDisplay(true);
        return item;
      }
    });
    setSearchSymptomValues(value);
  };

  const symptomsItemClickHandler = (value) => {
    if (selectedSypmtomsItems.includes(value)) {
      return;
    } else {
      setSelectedSypmtomsItems((prevState) => [value, ...prevState]);
    }
  };

  const symptomsCloseIconClickHandler = (id) => {
    if (selectedSypmtomsItems.includes(id)) {
      setSelectedSypmtomsItems((prevState) =>
        prevState.filter((existing) => existing !== id)
      );
    }
  };

  const diseasearr = [
    "Fentanyl Patch",
    "Naltrexone",
    "Gabapentin",
    "Hydrochlorothiazide",
    "Ibuprofen",
    "Fentanyl Patch",
    "Naltrexone",
    "Gabapentin",
    "Hydrochlorothiazide",
    "Ibuprofen",
    "Fentanyl Patch",
    "Naltrexone",
    "Gabapentin",
    "Hydrochlorothiazide",
    "Ibuprofen",
    "Fentanyl Patch",
    "Naltrexone",
    "Gabapentin",
    "Hydrochlorothiazide",
    "Ibuprofen",
    "Fentanyl Patch",
    "Naltrexone",
    "Gabapentin",
    "Hydrochlorothiazide",
    "Ibuprofen",
  ];

  const queans = [
    {
      slno: 1,
      que: "What is the disease or condition?",
      ans: "Collaboratively empower multifunctional e-commerce for prospective applications. Seamlessly productivate plug and play markets. Collaboratively empower multifunctional.",
    },

    {
      slno: 2,
      que: "Do I need a follow-up visit and if so, when?",
      ans: "Collaboratively empower multifunctional e-commerce for prospective applications. Seamlessly productivate plug and play markets. Collaboratively empower multifunctional.",
    },

    {
      slno: 3,
      que: "How is the disease or condition treated?",
      ans: "Collaboratively empower multifunctional e-commerce for prospective applications. Seamlessly productivate plug and play markets. Collaboratively empower multifunctional.",
    },
  ];

  return (
    <>
      <div className="container">
        {addPopup && (
          <CustomModal open={addPopup} modalState={modalState}>
            <Popup
              title="Choose Symptoms"
              input
              inputLabel="Symptoms Name"
              inputPlaceholder="Enter Symptoms Name"
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
        <div className={styles["section-1"]}>
          <div className={styles["sec-1-head"]}>
            <span className={styles["heading"]}>
              Questions & Answer of Patient
            </span>
            <div className={styles["que-asked"]}>
              The question the doctor asked the patient
            </div>
          </div>
          <>
            <div className={styles["que-ans-crd"]}>
              <div className={styles["question"]}>
                <div className={styles["qstn-part"]}>
                  <span className={styles["slno"]}>{queans[0].slno}</span>
                  <span className={styles["dot"]}>.</span>
                  <span className={styles["que-data"]}>{queans[0].que}</span>
                </div>
                <div className={styles["arrow"]} onClick={clickHandeler}>
                  <Image src={Images.downArrowo} alt="arrow" />
                </div>
              </div>

              {show ? (
                <>
                  <div className={styles["answer"]}>
                    <span className={styles["ans-head"]}>Answer</span>
                    <span className={styles["semi-colon"]}>:</span>
                    <span className={styles["ans-details"]}>
                      {queans[0].ans}
                    </span>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>

            <div className={styles["que-ans-crd"]}>
              <div className={styles["question"]}>
                <div className={styles["qstn-part"]}>
                  <span className={styles["slno"]}>{queans[1].slno}</span>
                  <span className={styles["dot"]}>.</span>
                  <span className={styles["que-data"]}>{queans[1].que}</span>
                </div>
                <div className={styles["arrow"]} onClick={clickHandeler1}>
                  <Image src={Images.downArrowo} alt="" />
                </div>
              </div>

              {show1 ? (
                <>
                  {" "}
                  <div className={styles["answer"]}>
                    <span className={styles["ans-head"]}>Answer</span>
                    <span className={styles["semi-colon"]}>:</span>
                    <span className={styles["ans-details"]}>
                      {queans[1].ans}
                    </span>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className={styles["que-ans-crd"]}>
              <div className={styles["question"]}>
                <div className={styles["qstn-part"]}>
                  <span className={styles["slno"]}>{queans[2].slno}</span>
                  <span className={styles["dot"]}>.</span>
                  <span className={styles["que-data"]}>{queans[2].que}</span>
                </div>
                <div className={styles["arrow"]} onClick={clickHandeler2}>
                  <Image src={Images.downArrowo} alt="arrow" />
                </div>
              </div>

              {show2 ? (
                <>
                  {" "}
                  <div className={styles["answer"]}>
                    <span className={styles["ans-head"]}>Answer</span>
                    <span className={styles["semi-colon"]}>:</span>
                    <span className={styles["ans-details"]}>
                      {queans[2].ans}
                    </span>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        </div>
        <div className={styles["section-2"]}>
          <div className={styles["main-div"]}>
            <div className={styles["heading-div"]}>
              <span className={styles["heading-text"]}>
                Patient Consultation
              </span>
            </div>
            <div className={styles["heading"]}>Disease Name</div>
            <div className={styles["search-div"]}>
              <Image src={Images.search_normal} alt="" />

              <div className={styles["diseaseSearchInput"]}>
                <input
                  type="text"
                  placeholder="Search and select disease name"
                  onChange={diseaseSearchChangeHandler}
                  onFocus={() => setSearchDiseaseDropdownDisplay(true)}
                />
                <div
                  className={`${styles["dropdownBox"]} ${
                    searchDieseaseValues.length === 0 &&
                    !searchDiseaseDropdownDisplay &&
                    "display"
                  }  ${!searchDiseaseDropdownDisplay && "display"}`}
                  ref={diseaseSearchListRef}
                >
                  <div className={styles["dropdownBox_content"]}>
                    {searchDieseaseValues.length > 0
                      ? searchDieseaseValues.map((item) => (
                          <div
                            className={styles["searchItem"]}
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            onClick={() => diseaseItemClickHandler(item)}
                          >
                            {item.name}
                          </div>
                        ))
                      : diseaseData?.map((item) => (
                          <div
                            className={styles["searchItem"]}
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            onClick={() => diseaseItemClickHandler(item)}
                          >
                            {item.name}
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["selectedItems"]}>
              {selectedDiseaseItems.map((items) => {
                return (
                  <span
                    className={styles["selectedItems_items"]}
                    key={items.id}
                  >
                    {items.name}
                    <Image
                      src={Images?.search_selected_removeIcon}
                      alt="close"
                      onClick={() => diseaseCloseIconClickHandler(items)}
                    />
                  </span>
                );
              })}
            </div>

            {selectedDiseaseSymptoms.length > 0 ? (
              <>
                <h5 className={styles["heading-divs"]}>Choose Symptoms</h5>
                <div className={styles["symptoms-div"]}>
                  <div className={styles["sym-div"]}>
                    {selectedDiseaseSymptoms?.map((item, key) => (
                      <div className={styles["symptoms"]} key={key}>
                        <Checkbox className={styles.checkbox}>
                          {item.name}
                        </Checkbox>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className={styles["no_data"]}>
                <Image src={Images?.no_data_found2} alt="no data found" />
              </div>
            )}

            <div className={styles["search-2-div"]}>
              <div className={styles["search-2-div-1"]}>
                <div className={styles["search-2-div-2"]}>
                  <Image src={Images.search_normal} alt="" />
                  <input
                    type="text"
                    placeholder="Search & add Other Symptoms"
                    onChange={symptomsSearchChangeHandler}
                    onFocus={() => setSearchSypmptomsDropdownDisplay(true)}
                  />

                  <div
                    className={`${styles["dropdownBox"]} ${
                      searchSymptomValues.length === 0 &&
                      !searchSypmptomsDropdownDisplay &&
                      "display"
                    }  ${!searchSypmptomsDropdownDisplay && "display"}`}
                    ref={symptomsSearchListRef}
                  >
                    <div className={styles["dropdownBox_content"]}>
                      {searchDieseaseValues.length > 0
                        ? searchSymptomValues.map((item) => (
                            <div
                              className={styles["searchItem"]}
                              key={item.id}
                              id={item.id}
                              name={item.name}
                              onClick={() => symptomsItemClickHandler(item)}
                            >
                              {item.name}
                            </div>
                          ))
                        : symptomData?.map((item) => (
                            <div
                              className={styles["searchItem"]}
                              key={item.id}
                              id={item.id}
                              name={item.name}
                              onClick={() => symptomsItemClickHandler(item)}
                            >
                              {item.name}
                            </div>
                          ))}
                    </div>
                  </div>
                </div>

                <div className={styles["add-btn-div"]}>
                  <button
                    className={styles["search-btn-2"]}
                    onClick={addClickHandler}
                  >
                    <Image src={Images.plus_in_circle_icon} alt="addbutton" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>

            <div className={styles["selectedItems"]}>
              {selectedSypmtomsItems.map((items) => {
                return (
                  <span
                    className={styles["selectedItems_items"]}
                    key={items.id}
                  >
                    {items.name}
                    <Image
                      src={Images?.search_selected_removeIcon}
                      alt="close"
                      onClick={() => symptomsCloseIconClickHandler(items)}
                    />
                  </span>
                );
              })}
            </div>

            <div className={styles["last-btn-div"]}>
              <button
                className={styles["last-btn"]}
                onClick={prescriptionClickHandler}
              >
                Prescription Medicine
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading ? <LoaderSpiner /> : null}
    </>
  );
}

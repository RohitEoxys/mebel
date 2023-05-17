import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { message } from "antd";

import styles from "./profile.module.scss";
import Images from "@/components/Images/Images";
import { Button } from "@/components/Common/UI/Button/Button";
import DoctorAvailabilityTable from "./DoctorAvailabilityTable";
import TodayAppointment from "./TodayAppointment";
import Review from "@/components/Common/Reviews/Review";
import FetchDataContext from "@/store/api-Context";
import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";
import StarRating from "@/components/Common/Rating/Rating";
import CustomDropdown from "@/components/Common/UI/Dropdown/Custom/CustomDropdown";

const Profile = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    openBio: false,
    editAvailablity: false,
  });

  const contextData = useContext(FetchDataContext);
  const selectedHospitalList = contextData?.selectedHospitalList || [];
  let getSelectedHospitalAvalibility =
    contextData?.getSelectedHospitalAvalibility || [];
  const getDoctorAvailability = contextData?.getDoctorAvailability;

  const [currentTab, setCurrentTab] = useState(1);
  const doctorProfile = contextData.doctorProfile || [];
  const docReviewList = contextData.docReviewList;
  const [loading, setLoading] = useState(false);
  const [selectHospital, setSelectedHospital] = useState();
  const [byturnTime, setByTurnTime] = useState(0);
  const [doctorAvailabilityData, setDoctorAvailabilityData] = useState([]);
  const [checked, setChecked] = useState([]);
  const [docAvlTimes, setDocAvlTimes] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    selectedHospitalList && setSelectedHospital(selectedHospitalList?.[0]);
  }, [selectedHospitalList]);

  useEffect(() => {
    contextData.getApiData("get-doctor-hospital", "get-doctor-hospital");
  }, []);

  useEffect(() => {
    if (selectHospital) {
      setLoading(true);
      contextData?.getApiData(
        `get-doctor-hospital-avaliablity?hospital_id=${
          selectHospital && selectHospital?.id
        }`,
        "get-doctor-hospital-avaliablity",
        setLoading
      );
    }
  }, [selectHospital]);

  useEffect(() => {
    setLoading(true);
    contextData.getApiData("get-doctor-profile", "doctorProfile", setLoading);
  }, [values?.openBio]);

  useEffect(() => {
    if (doctorProfile?.id) {
      const data = {
        doctor_id: doctorProfile?.id,
      };

      contextData.docReviews("doctor-ratings-review", data);
    }
  }, [doctorProfile]);

  const hospitalClickHandler = (e) => {
    setSelectedHospital(e);
  };

  const byTurnTimeChangeHandler = (e) => {
    setByTurnTime(e.target.value);
  };

  const getAvailabilityValues = (data) => {
    setDoctorAvailabilityData(data);
  };

  const hospitalSelectList = selectedHospitalList?.map((e, index) => (
    <div
      className={styles["selectBoxItems"]}
      onClick={() => hospitalClickHandler(e)}
      key={e.id}
    >
      {e.name}
    </div>
  ));

  const onInputChange = (e) => {
    if (e.target.name === "day") {
      e.target.checked
        ? setValues({ ...values, [e.target.name]: 1 })
        : setValues({ ...values, [e.target.name]: 0 });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const handleEditBio = () => {
    if (!values.openBio) {
      setValues({ ...values, openBio: true });
    } else {
      setLoading(true);
      const data = {
        doctor_bio: values.doctor_bio,
      };
      contextData.updateDoctorBio(
        "edit-doctor-bio",
        data,
        setValues,
        values,
        setLoading
      );
    }
  };

  useEffect(() => {
    contextData.getApiData(
      "get-avaliablity",
      "getDoctorAvailability",
      setLoading
    );
  }, [selectHospital]);

  const availabilitySaveClickHandler = () => {
    const formData = new FormData();
    formData.append("by_turn_time", byturnTime);
    formData.append("hospital_id", selectHospital.id);
    doctorAvailabilityData.map((data, index) =>
      formData.append(
        `week_days[${index}]`,
        `${data.start_time ?? "09:00"},${data.end_time ?? "05:00"},${
          data.status ? data.status : 0
        }`
      )
    );

    //message
    const key = "updatable";
    messageApi.open({
      key,
      type: "loading",
      content: "Updating Doctor Availability.",
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: "success",
        content: "Updated!",
        duration: 3,
      });
    }, 1000);

    contextData.updateDoctorAvailability(
      "update-doctor-availability",
      formData,
      setLoading
    );
  };

  const askforReveiwBtnClickHandler = () => {
    router.push("/doctor/reviews");
  };

  const onEditIconClickHandler = () => {
    router.push("./edit-profile");
  };

  return (
    <>
      <div className={styles["main"]}>
        {contextHolder}
        <div className={styles["background-design-1"]}>
          <Image src={Images.bg_arc3} alt="icon" />
        </div>
        <div className="container">
          <div className={styles["main_container"]}>
            <div className={styles["main_container_top"]}>
              <div className={styles["main_container_top-left"]}>
                <div className={styles["background-design-2"]}>
                  <Image
                    src={Images.doc_profile_bg}
                    style={{ width: "100%" }}
                    alt="icon"
                  />
                </div>
                <div className={styles["left-icon"]}>
                  <Image src={Images.dr_profile} alt="doctor_profile_icon" />
                  <Image
                    src={Images.profile_edit_icon}
                    alt="patient_edit_icon"
                    className={styles["doctor_edit_icon"]}
                    onClick={onEditIconClickHandler}
                  />
                </div>
                <h1>{doctorProfile?.name}</h1>
                <h6>{doctorProfile?.specialities?.join(", ")}&nbsp; </h6>
                <h6>Exequatur No. : {doctorProfile?.exequatur_no}</h6>

                <div className={styles["left_star_section"]}>
                  <span className={styles["left_star_section-stars"]}>
                    <StarRating rating={doctorProfile?.ratings} />
                  </span>
                  <span className={styles["left_star_section-text"]}>
                    ( {docReviewList?.length} Review)
                  </span>
                </div>

                <div className={styles["subscribe_section"]}>
                  <div className={styles["subscribe_section_text"]}>
                    <h5 className={styles["subscribe_section_text_left"]}>
                      Subscribed Plan :
                    </h5>
                    <h5 className={styles["subscribe_section_text_right"]}>
                      &nbsp;
                      {doctorProfile?.subscription_amount?.length ? (
                        `${doctorProfile?.subscription_currency}${doctorProfile?.subscription_amount}`
                      ) : (
                        <span className={styles["no_plan"]}>No Plan</span>
                      )}
                    </h5>
                  </div>
                  <div className={styles["subscribe_section_bottom"]}>
                    <Link href="./subscription">Upgrade plan</Link>
                  </div>
                </div>

                <div className={styles["review_btn"]}>
                  <Button
                    name="Ask For Review"
                    className={styles["review_btn-button"]}
                    inlineStyle={{ paddingLeft: "45px", position: "relative" }}
                    onClick={askforReveiwBtnClickHandler}
                  />
                  <Image src={Images.btn_star_icon} alt="star_icon" />
                </div>
              </div>
              {/* Doctor Availability */}
              <div className={`${styles["main_container_top-right"]}`}>
                <div
                  className={`${styles["main_container_top-right-heading"]}`}
                >
                  <div className={` ${styles["availability_section"]}`}>
                    <div className={styles["availability_section_right"]}>
                      <h1>Doctor Availability</h1>

                      <div
                        className={`${styles["availability_section_radio_1"]} ${styles["radioBtn_container"]}`}
                      >
                        <form>
                          <div className={styles["radioBtn_container_content"]}>
                            <input
                              id="01"
                              type="radio"
                              name="turn"
                              defaultChecked
                              value={0}
                              onChange={byTurnTimeChangeHandler}
                            />
                            <label htmlFor="01">By Turn</label>
                            <input
                              id="02"
                              type="radio"
                              name="turn"
                              value={1}
                              onChange={byTurnTimeChangeHandler}
                            />
                            <label htmlFor="02">By Time</label>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className={styles["availability_section_left"]}>
                      <CustomDropdown
                        placeholder={selectHospital && selectHospital.name}
                        placeholderClass={styles["speciality_placeholder"]}
                        arrow={true}
                        selectMenu={hospitalSelectList}
                        mainClass={styles["input_speciality"]}
                        boxClass={styles["input_box"]}
                        fillArrow={true}
                        arrowColor="#ED7B30"
                        arrowupAllign="41%"
                        arrowDownAllign="20%"
                        multipleSelect={false}
                        startDropClass={styles["dropdownItemsContainer"]}
                        divider
                      />

                      <div className={styles["button_container"]}>
                        <Button
                          name="Save"
                          className={styles["save_btn"]}
                          mainDiv={styles["save_btn_main"]}
                          onClick={availabilitySaveClickHandler}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <DoctorAvailabilityTable
                  doctorAvailability={
                    contextData?.getSelectedHospitalAvalibility?.availability
                  }
                  setChecked={setChecked}
                  setDocAvlTimes={setDocAvlTimes}
                  checked={checked}
                  docAvlTimes={docAvlTimes}
                  tableValues={getAvailabilityValues}
                  selectedHospitalId={selectHospital && selectHospital.id}
                  setLoading={setLoading}
                />
              </div>
            </div>

            <div className={styles["main_container_middle"]}>
              <TodayAppointment />
            </div>
            <div className={styles["main_container_bottom"]}>
              <div className={styles["main_container_bottom-heading"]}>
                <div className={styles["main_container_bottom-heading-left"]}>
                  <h1
                    onClick={() => setCurrentTab(1)}
                    className={`${currentTab === 1 && styles["activeText"]}`}
                  >
                    Bio
                  </h1>
                </div>
                <div className={styles["main_container_bottom-heading-right"]}>
                  <h1
                    className={`${currentTab === 2 && styles["activeText"]}`}
                    onClick={() => setCurrentTab(2)}
                  >
                    Reviews
                  </h1>
                </div>
                <div className={styles["scroll_design"]}></div>
                <div
                  className={`${currentTab === 1 && styles["bioActive"]} ${
                    currentTab === 2 && styles["reviewTabActive"]
                  }`}
                ></div>
              </div>
              <div className={styles["main_container_bottom-content"]}>
                {currentTab === 1 && (
                  <EditBio
                    doctorProfile={doctorProfile}
                    values={values}
                    handleEditBio={handleEditBio}
                    onInputChange={onInputChange}
                  />
                )}
                {currentTab === 2 && <Review docReviewList={docReviewList} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading ? <LoaderSpiner /> : null}
    </>
  );
};

export default Profile;

const EditBio = ({ doctorProfile, values, handleEditBio, onInputChange }) => {
  return (
    <>
      {!values?.openBio ? (
        <p>{doctorProfile?.doctor_bio}</p>
      ) : (
        <div>
          <h4 className={styles["text_head"]}>Enter Bio</h4>
          <textarea
            className={styles["text_area"]}
            name="doctor_bio"
            id=""
            cols="30"
            rows="6"
            onChange={onInputChange}
          ></textarea>
        </div>
      )}

      <div className={styles["main_container_bottom-button"]}>
        <Button
          name={!values?.openBio ? "Edit Bio" : "Save"}
          inlineStyle={{ width: "20%" }}
          className={styles["edit_btn"]}
          onClick={handleEditBio}
        />
      </div>
    </>
  );
};

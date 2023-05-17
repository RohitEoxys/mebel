import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./docterdetails.module.scss";
import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";
import Images from "@/components/Images/Images";
import Review from "@/components/Common/Reviews/Review";
import Image from "next/image";
// import { Image } from "react-bootstrap";
import { useRouter } from "next/router";
import StarRating from "@/components/Common/Rating/Rating";
import FetchDataContext from "@/store/api-Context";
import clickOutsideToFalseDrop from "@/components/Common/ClickOutsideToFalseDrop/clickOutsideToFalseDrop";
import CustomModal from "@/components/Common/UI/Modal/Modal";
import MakeAppointmentPopup from "./makeAppointmentPopup/MakeAppointmentPopup";

const weakDays = [
  {
    weekday: "Sunday",
  },
  {
    weekday: "Monday",
  },
  {
    weekday: "Tuesday",
  },
  {
    weekday: "Wednesday",
  },
  {
    weekday: "Thrusday",
  },
  {
    weekday: "Friday",
  },
  {
    weekday: "Saturday",
  },
];

const DocterDetails = ({}) => {
  const router = useRouter();
  const contextData = useContext(FetchDataContext);
  const dropdownRef = useRef();
  const [addPopup, setAddPopup] = useState(false);
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  clickOutsideToFalseDrop(dropdownRef, () => setOpenDropdown(false));

  const doctorDetails = contextData.doctorDetails;
  const docReviewList = contextData.docReviewList;
  const consultType = contextData?.consultTypeData || [];

  const { len } = router.query;

  useEffect(() => {
    const data = {
      id: len,
    };
    setLoading(true);
    if (len) {
      contextData.getDoctorDetails("doctor-details", data, setLoading);

      contextData.getConsultType("get-doctor-consult-type", {
        doctor_id: data.id,
      });
    }
  }, [len]);

  useEffect(() => {
    if (len) {
      const data = {
        doctor_id: len,
      };

      contextData.docReviews("doctor-ratings-review", data);
    }
  }, [len]);

  const appointBtnHandler = () => {
    setAddPopup(true);
  };

  const modalState = (state) => {
    setShow(state);
    setAddPopup(state);
  };

  const dropdownArrowClickHandler = () => {
    setOpenDropdown(!openDropdown);
  };

  const backBtnClickHandler = () => {
    router.back();
  };

  const availabilityDropdownPlaceholder =
    doctorDetails &&
    doctorDetails?.avaliablity?.find((item) => item.status === 1);

  return (
    <div className={styles["doctor-details"]}>
      <div className={`container ${styles["container"]}`}>
        {addPopup && (
          <CustomModal open={addPopup} modalState={modalState}>
            <MakeAppointmentPopup
              modalState={modalState}
              data={consultType}
              doctorId={len}
            />
          </CustomModal>
        )}

        <div className={styles["back_button"]}>
          <button onClick={backBtnClickHandler}>BACK </button>
        </div>
        <div className={styles["background-design-1"]}>
          <Image src={Images.bg_arc3} alt="icon" width={350} height={350} />
        </div>

        <div className={styles["dtcrdtls"]}>
          <div className={styles["dtcrdtlspic"]}>
            <img
              src={doctorDetails?.profile_image}
              alt="doctor_profile"
              // width={350}
              // height={350}
              className={`${styles["profileImage"]}`}
            />
          </div>
          <div className={styles["dtcrdtldta"]}>
            <div className={styles["dtcrdtldtasc1"]}>
              <div className={` ${styles["dtcrdtldtahdr"]}`}>
                Dr. {doctorDetails?.name}
              </div>
              <div className={`${styles["proftion"]}`}>
                Specialist :&nbsp;
                {doctorDetails && doctorDetails?.specialities.join(", ")}
              </div>
              <div className={`mb-2 ${styles["hsptlnm"]}`}>
                Hospital Name :&nbsp;
                {doctorDetails && doctorDetails?.hospitals.join(", ")}
              </div>
              <div className={styles["starandreview"]}>
                <span className={styles["stars"]}>
                  <StarRating rating={doctorDetails?.ratings} />
                </span>
                <span className={styles["review-sect"]}>
                  ({doctorDetails?.review_count} Review)
                </span>
                {doctorDetails.is_online === 1 ? (
                  <>
                    <span className={styles["onln-grn"]}></span>
                    <span className={styles["online"]}>Online</span>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className={styles["dtcrdtldtasc2"]}>
              <div className={styles["sec2-crd"]}>
                <div className={styles["sc2crd"]}>
                  <div className={styles["sc2hdrdt"]}>Patient</div>
                  <div className={styles["sc2bddt"]}>
                    {" "}
                    {doctorDetails?.patient}
                  </div>
                </div>
              </div>
              {/* <span className={styles["hrln"]}></span> */}
              {/* <div className={styles["sec2-crd"]}>
                <div className={styles["sc2crd"]}>
                  <div className={styles["sc2hdrdt"]}>Experience</div>
                  <div className={styles["sc2bddt"]}>
                    {doctorDetails?.experience}yr
                  </div>
                </div>
              </div> */}
              <span className={styles["hrln"]}></span>

              <div className={styles["availability_dropdown"]}>
                <div className={styles["heading"]}>Availability</div>
                <div
                  className={styles["dropdown_container"]}
                  onClick={dropdownArrowClickHandler}
                  ref={dropdownRef}
                >
                  {availabilityDropdownPlaceholder ? (
                    <span className={styles["availability_dropdown_title"]}>
                      {`${
                        weakDays[doctorDetails?.avaliablity[0].week_day - 1]
                          .weekday
                      }(${doctorDetails?.avaliablity[0].start_time}-${
                        doctorDetails?.avaliablity[0].end_time
                      })`}
                    </span>
                  ) : (
                    <span className={styles["availability_dropdown_title"]}>
                      Not Available
                    </span>
                  )}
                  <div
                    className={styles["arrow"]}
                    onClick={dropdownArrowClickHandler}
                  >
                    <i className="fa-solid fa-chevron-down"></i>
                  </div>
                  {availabilityDropdownPlaceholder && (
                    <div
                      className={`${styles["dropdownBox"]} ${
                        !openDropdown && styles["box_display"]
                      }`}
                    >
                      {doctorDetails &&
                        doctorDetails?.avaliablity?.map((item, index) => (
                          <div
                            key={index}
                            className={styles["dropdownHeading"]}
                          >
                            {item.heading && (
                              <div
                                className={styles["dropdownHeading_content"]}
                              >
                                {item.heading}
                              </div>
                            )}
                            {item.status === 1 && (
                              <div className={styles["dropdownBox_items"]}>
                                <span
                                  className={styles["dropdownBox_items_day"]}
                                >
                                  {item.status === 1 &&
                                    weakDays[item.week_day - 1]?.weekday}
                                </span>
                                <span
                                  className={
                                    styles["dropdownBox_items_day_timing"]
                                  }
                                >
                                  ({item.status === 1 && item.start_time}-
                                  {item.status === 1 && item.end_time})
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles["dtcrdtldtasc3"]}>
              <div className={styles["sc3hdr"]}>Bio</div>
              {
                <div className={styles["biodt"]}>
                  {doctorDetails.doctor_bio}
                </div>
              }
            </div>
            <div className={styles["dtcrdtldtasc4"]}>
              <div className={styles["butan"]}>
                <button
                  className={styles["btttn"]}
                  disabled={doctorDetails?.avaliablity?.length === 0}
                  onClick={appointBtnHandler}
                >
                  MAKE APPOINTMENT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Review docReviewList={docReviewList} />

      {loading ? <LoaderSpiner /> : null}
    </div>
  );
};

export default DocterDetails;

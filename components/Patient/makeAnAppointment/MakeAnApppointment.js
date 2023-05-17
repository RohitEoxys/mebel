import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import moment from "moment/moment";
import { useRouter } from "next/router";
// import QRcode from "react-qr-code";

import { Button } from "@/components/Common/UI/Button/Button";
import Images from "@/components/Images/Images";
import styles from "./makeAnAppointment.module.scss";
import FetchDataContext from "@/store/api-Context";
import CustomCalendar from "./Date-picker/CustomCalendar";
import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";

const MakeAnAppointment = () => {
  const router = useRouter();
  const { id, consultId } = router.query;
  const [loading, setLoading] = useState(false);
  const [selectedWeekday, setSelectedWeekday] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isTimeSelected, setIsTimeSelected] = useState("");
  const [fullUrl, setFullUrl] = useState("");
  const [hospitalName, setHospitalName] = useState();
  const [hospitalId, setHospitalId] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(window.location.href);
    }
  });

  const contextData = useContext(FetchDataContext);
  const doctorInfo = contextData?.doctorInfo;

  const appointmentAvailability = contextData.appointmentAvailabilityList;
  const appointmentTimingList = contextData.appointmentTimingList;

  const currentMonth = appointmentAvailability?.current_month?.map((item) => {
    return {
      date: moment(item.date).format("DD MMMM YYYY"),
      is_available: item.is_available,
      day: item.day,
      week_day: item.week_day,
    };
  });
  const nextMonth = appointmentAvailability?.next_month?.map((item) => {
    return {
      date: moment(item.date).format("DD MMMM YYYY"),
      is_available: item.is_available,
      day: item.day,
      week_day: item.week_day,
    };
  });

  const nextClickHandler = () => {
    contextData.saveAppointment(
      "save-appointment",
      {
        appointment_step: 1,
        appointment_id: appointmentAvailability?.appointment_id,
        hospital_id: hospitalId,
        date: selectedDate,
        time: isTimeSelected,
      },
      setLoading
    );
    setLoading(true);

    router.push(
      {
        pathname: "./share-reports",
        query: { id: appointmentAvailability?.appointment_id },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    const data = {
      id: id,
    };
    setLoading(true);
    if (id) {
      contextData.getAppointmentAvailability(
        "appointment-availability",
        { doctor_id: data.id, consultation_id: consultId },
        setLoading
      );
    }
  }, [id]);

  const dateSelect = (date, week) => {
    const selectedDate = moment(date)?.format("YYYY-MM-DD");
    setSelectedDate(selectedDate);
    setSelectedWeekday(week);
  };

  const selectBtnClickHandler = () => {
    setLoading(true);
    if (id) {
      contextData.getAppointmentTiming(
        "appointment-time-availability",
        { doctor_id: id, week_day: selectedWeekday, date: selectedDate },
        setLoading
      );
    }
  };

  const selectedTime = (data, item) => {
    setHospitalName(data?.hospital_name);
    setHospitalId(data?.hospital_id);
    setIsTimeSelected(item);
  };

  const backBtnClickHandler = () => {
    router.back();
  };

  return (
    <>
      <div className="container">
        <div className={styles["main-container"]}>
          <Image
            src={Images.bg_arc3}
            className={styles["background_design"]}
            alt="bg"
          />
          <Image
            src={Images.background_arc_responsive}
            className={styles["background_design_2"]}
            alt="bg"
          />
          <div className={styles["main-container_content"]}>
            <div className={styles["main-container_content-top"]}>
              <div className={styles["main-container_content-top-left"]}>
                <CustomCalendar
                  dateSelect={dateSelect}
                  enableDates={[...(currentMonth || []), ...(nextMonth || [])]}
                  selectBtnClick={selectBtnClickHandler}
                />
              </div>
              <div className={styles["main-container_content-top-right"]}>
                <div
                  className={styles["main-container_content-top-right-text"]}
                >
                  <h1>Make An Appointment</h1>
                  <div className={styles["subHeading_container"]}>
                    <div className={styles["subHeading_container-left"]}>
                      <h6>Doctor Name:</h6>
                      {/* <p style={{ marginLeft: "4px" }}>{doctorInfo?.name}</p> */}
                      <p style={{ marginLeft: "4px" }}>
                        {appointmentAvailability?.doctor_name}
                      </p>
                    </div>
                    {/* <div className={styles["subHeading_container-right"]}>
                      <h6>Hospital Name:</h6>
                      <p>{doctorInfo?.hospitals}</p>
                    </div> */}
                  </div>
                </div>
                <div
                  className={styles["main-container_content-top-right-dayTime"]}
                >
                  {appointmentTimingList ? (
                    <div>
                      <h1>Choose Time</h1>
                      <div className={styles["daytime_container"]}>
                        <div className={styles["daytime_container-left"]}>
                          {appointmentTimingList?.map((list, key) => (
                            <div key={key}>
                              <div className={styles["hospital_and_time"]}>
                                <div className={styles["hospital_name_div"]}>
                                  Hospital Name :
                                </div>
                                <div className={styles["hospital_name"]}>
                                  &nbsp;{list.hospital_name}
                                </div>
                              </div>
                              <div className={styles["list_time"]}>
                                {list?.day_avaliablity?.map((item, index) => (
                                  <span
                                    key={index}
                                    onClick={() =>
                                      selectedTime(list, item.time)
                                    }
                                    id={item.time}
                                    className={`${
                                      isTimeSelected === item.time &&
                                      list?.hospital_name === hospitalName
                                        ? styles["selected"]
                                        : ""
                                    }`}
                                  >
                                    {item.time}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* <div className={styles["daytime_container"]}>
                        <div className={styles["daytime_container-right"]}>
                          <div>Hospital Name:</div>
                        </div>
                        <div className={styles["daytime_container-left"]}>
                          {appointmentTimingList?.morning?.map(
                            (item, index) => (
                              <span
                                key={index}
                                onClick={selectedTime}
                                id={item.time}
                                className={`${
                                  isTimeSelected[item.time] &&
                                  styles["selected"]
                                }`}
                              >
                                {item.time}
                              </span>
                            )
                          )}
                        </div>
                      </div> */}
                      {/* <div className={styles["daytime_container"]}>
                        <div className={styles["daytime_container-right"]}>
                          <h4>Afternoon</h4>
                        </div>
                        <div className={styles["daytime_container-left"]}>
                          {appointmentTimingList?.noon?.map((item, index) => (
                            <span
                              key={index}
                              onClick={selectedTime}
                              id={item.time}
                              className={`${
                                isTimeSelected[item.time] && styles["selected"]
                              }`}
                            >
                              {item.time}
                            </span>
                          ))}
                        </div>
                      </div> */}
                      {/* <div className={styles["daytime_container"]}>
                        <div className={styles["daytime_container-right"]}>
                          <h4>Evening</h4>
                        </div>
                        <div className={styles["daytime_container-left"]}>
                          {appointmentTimingList?.evening?.map(
                            (item, index) => (
                              <span
                                key={index}
                                onClick={selectedTime}
                                id={item.time}
                                className={`${
                                  isTimeSelected[item.time] &&
                                  styles["selected"]
                                }`}
                              >
                                {item.time}
                              </span>
                            )
                          )}
                        </div>
                      </div> */}
                    </div>
                  ) : (
                    <div className={styles["no_data"]}>
                      <Image src={Images?.no_data_found2} alt="no data found" />
                      <h3>Please select the date for appointment</h3>
                    </div>
                  )}
                  <div className={styles["buttons"]}>
                    <Button
                      name="BACK"
                      mainDiv={styles["buttons_back_btn_main"]}
                      className={styles["buttons_back_btn"]}
                      onClick={backBtnClickHandler}
                    />
                    <Button
                      name="NEXT"
                      className={styles["next_btn"]}
                      mainDiv={styles["next_btn_main"]}
                      onClick={nextClickHandler}
                      disabled={Object.keys(isTimeSelected).length < 1}
                    />
                  </div>
                  <hr className={styles["hr"]} />
                  {/* <div className={styles["qr_code"]}>
                    <QRcode value={fullUrl} />
                    <h3>Scan QR code to fill the Appointment from phone</h3>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading ? <LoaderSpiner /> : null}
    </>
  );
};

export default MakeAnAppointment;

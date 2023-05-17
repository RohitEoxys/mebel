import { useState } from "react";
import Image from "next/image";
import Table from "react-bootstrap/Table";

import styles from "./table.module.scss";
import Images from "@/components/Images/Images";
import CustomModal from "@/components/Common/UI/Modal/Modal";
import Popup from "@/components/Common/UI/pop-ups/Popup";
import moment from "moment";

function PatientTable({ upComingAppointment }) {
  const [show, setShow] = useState(false);

  const deleteBtnClickHandler = () => setShow(true);

  const modalState = (state) => {
    setShow(state);
  };

  const popupYesClickHandler = () => setShow(false);
  const popupNoClickHandler = () => setShow(false);

  return (
    <>
      {show && (
        <CustomModal open={show} modalState={modalState}>
          <Popup
            title="Are You Sure you want to cancel appointment!"
            subHeading="Lorem Ipsum is simply dummy text"
            buttonName={"Yes"}
            btnOnClick={popupYesClickHandler}
            btnOnClick_2={popupNoClickHandler}
            mainDivClass={styles["popupClass"]}
            noOfButtons={2}
            buttonName_2="No"
            btnsMainDiv={styles["popupClass_buttons"]}
            buttonContainerClass={styles["popupClass_buttons_main_container_1"]}
            buttonContainerClass_2={
              styles["popupClass_buttons_main_container_2"]
            }
            mainBtnClass={styles["popupClass_buttons_1"]}
            mainBtnClass_2={styles["popupClass_buttons_2"]}
          />
        </CustomModal>
      )}

      {!upComingAppointment?.data?.length == 0 ? (
        <Table
          bordered
          style={{ borderColor: "#DCDCDC" }}
          className={styles["main_container"]}
          responsive
        >
          <thead>
            <tr>
              <th>AppointmentID</th>
              <th>Date & Time</th>
              <th>Doctor Name</th>
              {/* <th>Appointment type</th> */}
            </tr>
          </thead>
          {upComingAppointment?.data?.map((list, key) => (
            <tbody key={key}>
              <tr>
                <td>#{list.appointment_id} </td>
                <td>
                  {moment(list.date).format("DD MMM YYYY")} at {list.time}
                  {/* <span className={styles["time_at"]}> {list.time} </span> */}
                </td>
                <td>{list.doctor_name}</td>
                {/* <td>Virtual</td> */}
              </tr>
            </tbody>
          ))}
        </Table>
      ) : (
        <div className={styles["no_data_div"]}>
          {/* <h3> {upComingAppointment?.message} </h3> */}
          <Image src={Images.no_data5} alt="no data found image" />
        </div>
      )}
    </>
  );
}

export default PatientTable;

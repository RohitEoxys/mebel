import React from "react";
import Table from "react-bootstrap/Table";
import Image from "next/image";
import styles from "./medicineList.module.scss";
import Images from "@/components/Images/Images";

const MedicineList = ({ getMedicineTaken }) => {
  return (
    <div className="container">
      <div className={styles["main_container"]}>
        <h1>Medicine List To Pickup</h1>
        {getMedicineTaken?.data?.length === 0 ? (
          <div className={styles["no_data_found"]}>
            <div className={styles["no_data_found_div"]}>
              <Image src={Images.no_data_found2} alt="no data found data" />
            </div>
            {/* <div className={styles["no_data_message"]}>
              {getMedicineTaken?.message}
            </div> */}
          </div>
        ) : (
          <Table responsive bordered style={{ borderColor: "#DCDCDC" }}>
            <thead>
              <tr>
                <th>AppointmentID</th>
                <th>Name of Medicine</th>
                {/* <th>Name of Pharmacy</th> */}
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#5454545</td>
                <td>Lisinopril</td>
                {/* <td>Good Neighbor Pharmacy</td> */}
                <td style={{ color: "#E8A30E" }}>pending</td>
                <td>
                  <div className={styles["icons"]}>
                    <Image src={Images.done_btn} alt="deletebtn" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>#5454545</td>
                <td>Lisinopril</td>
                {/* <td>Good Neighbor Pharmacy</td> */}
                <td style={{ color: "#339900" }}>picked</td>
                <td>
                  <div className={styles["icons"]}>
                    <Image src={Images.done_btn} alt="deletebtn" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>#5454545</td>
                <td>Lisinopril</td>
                {/* <td>Good Neighbor Pharmacy</td> */}
                <td style={{ color: "#E8A30E" }}>pending</td>
                <td>
                  <div className={styles["icons"]}>
                    <Image src={Images.done_btn} alt="deletebtn" />
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default MedicineList;

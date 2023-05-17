import Image from "next/image";
import Table from "react-bootstrap/Table";
import styles from "./listOfPreviousConsult.module.scss";
import Images from "@/components/Images/Images";
import FileDownload from "@/components/FileDownload/FileDownload";

const ListOfPreviousConsult = ({ getPreviusCunsult }) => {

  return (
    <>
      {getPreviusCunsult?.data?.length === 0 ? (
        <div className={styles["no_data_img"]}>
          <Image src={Images?.no_data5} alt="no data found" />
        </div>
      ) : (
        // <h2> {getPreviusCunsult?.message} </h2>
        <Table
          responsive
          bordered
          style={{ borderColor: "#DCDCDC" }}
          className={styles["main_container"]}
        >
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Disease</th>
              <th>Doctor Name</th>
              <th>Action</th>
            </tr>
          </thead>
          {getPreviusCunsult?.data?.map((list, key) => (
            <tbody key={key}>
              <tr>
                <td>
                  {list?.date} at
                  <span className={styles["time_at"]}> {list?.time} </span>
                </td>
                <td>{list?.disease}</td>
                <td>{list?.doctor_name}</td>
                <td>
                  <div className={styles["icons"]}>
                    <Image
                      src={Images.download_table_btn}
                      onClick={() => {
                        FileDownload(list?.reports?.certificate);
                        FileDownload(list?.reports?.report);
                      }}
                      alt="deletebtn"
                    />
                  </div>
                </td>
              </tr>
              {/* <tr>
                <td>
                  08 Dec 2022 at
                  <span className={styles["time_at"]}> 09 : 30 AM </span>
                </td>
                <td>Anxiety</td>
                <td>Dr. Halina mishra</td>
                <td>
                  <div className={styles["icons"]}>
                    <Image src={Images.download_table_btn} alt="deletebtn" />
                  </div>
                </td>
              </tr> */}
            </tbody>
          ))}
        </Table>
      )}
    </>
  );
};

export default ListOfPreviousConsult;

import styles from "./Selectionforpatient.module.scss";
import Images from "@/components/Images/Images";
import Image from "next/image";
import { useRouter } from "next/router";

const Selectionforpatient = () => {
  const router = useRouter();

  const newAppointmentHandler = () => {
    router.push("./doctor-list");
  };

  return (
    <div className={styles["slctptnt"]}>
      <div className={styles["container"]}>

      <div className={styles["background-design-1"]}>
          <Image src={Images.bg_arc3} alt="icon" />
        </div>
        
        <div className={styles["slct_sect"]}>
          <div className={styles["slctptnthdr"]}>
            Select One For Consult To Doctor
          </div>
          <div className={styles["slctptntdt"]}>
            click on one option for consult
          </div>
        </div>

        <div className={styles["slctptntwocrd"]}>
          <div className={styles["slctptncrd"]}>
            <Image
              src={Images.followUp}
              onClick={newAppointmentHandler}
            />
          </div>
          <div className={styles["slctptncrd"]}>
            <Image
              src={Images.newAppointment}
              onClick={newAppointmentHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Selectionforpatient;

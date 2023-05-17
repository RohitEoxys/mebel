import styles from "./benifits.module.scss";
import Image from "next/image";
import Images from "@/components/Images/Images";
import CollageWithContent from "../AboutUs/collageWithContent/CollageWithContent";
import MebelInformationBox from "../Home/MebelInformationBox/MebelInformationBox";
import FetchDataContext from "@/store/api-Context";
import LoaderSpiner from "../Loader/LoaderSpiner";
import { useContext, useEffect, useState } from "react";

export default function Benifits() {
  const [loading, setLoading] = useState(true);
  const contextData = useContext(FetchDataContext);
  const getBenefitsPageData = contextData?.getHomePageData;

  useEffect(() => {
    contextData.getPagesData("Benefits", setLoading);
  }, []);

  const finalList = [
    {
      img: Images.Orange_tick,
      label: "Convenient access to medical care",
    },
    {
      img: Images.Orange_tick,
      label: "Access to medical records and test results.",
    },
    {
      img: Images.Orange_tick,
      label: "Reduced wait times and appointment scheduling.",
    },
    {
      img: Images.Orange_tick,
      label: "Enhanced education and resources",
    },
    {
      img: Images.Orange_tick,
      label: "Improved communication with healthcare providers",
    },
  ];
  return (
    <>
      <div>
        <div className={styles["first_body_div"]}>
          <div className="container">
            <div className={styles["first_body_content"]}>
              <div className={styles["doctor_contant"]}>
                <div className={styles["welcome_mebel"]}>
                  <div> Benefits for a patient & doctor </div>
                  <div className={styles["minus_div"]}></div>
                </div>
                <p className={styles["feel_better"]}>
                  Using Our Online
                  <span className={styles["health_care"]}> Mebel</span> Platform
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: getBenefitsPageData?.content?.content,
          }}
        ></div>
        {/* <div className="container">
          <div className={styles["mebelBoxSpace"]}>
            <MebelInformationBox />
          </div>

          <CollageWithContent titleHead={"Benefits for a doctor"} />
          <div className={styles["patient_benefits_div"]}>
            <div className={styles["benefits_of_patient"]}>
              <div className={styles["patient_head"]}>
                Benefits for a Patient
              </div>
              <div className={styles["mebel_platform"]}>
                Mebel Platform Benefits for
                <span className={styles["mebel_orange"]}> Patient </span>
              </div>
              <div className={styles["convenint_div"]}>
                {finalList.map((item, key) => (
                  <div className={styles["check_with_label"]} key={key}>
                    <div>
                      <Image src={item.img} alt="orange checkbox" />
                    </div>
                    <div className={styles["listing_chexkbox"]}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles["patient_collage_div"]}>
              <div className={styles["benefits_img1"]}>
                <Image src={Images.benifit_patient1} alt="patient image one" />
              </div>
              <div className={styles["small_imgs_div"]}>
                <div className={styles["benefits_img2"]}>
                  <Image
                    src={Images.benifit_patient2}
                    alt="patient image two"
                  />
                </div>
                <div className={styles["benefits_img3"]}>
                  <Image
                    src={Images.benifit_patient3}
                    alt="patient image three"
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

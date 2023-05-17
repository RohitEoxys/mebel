import React from "react";
import styles from "./CollageWithContent.module.scss";
import Image from "next/image";
import Images from "@/components/Images/Images";

const CollageWithContent = ({ content, titleHead }) => {
  const checkboxContent = [
    {
      img: Images.Orange_tick,
      label: "Improved patient care and outcomes",
    },
    {
      img: Images.Orange_tick,
      label: "Increased efficiency and productivity",
    },
    {
      img: Images.Orange_tick,
      label: "Enhanced communication & collaboration",
    },
    {
      img: Images.Orange_tick,
      label: "Flexibility and convenience",
    },
  ];

  return (
    <>
      <div
        className={styles["image_collage_div"]}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      >
        {/* <div className={styles["iamge_collage_section"]}>
          <div className={styles["first_image"]}>
            <Image src={Images.collage1} alt="doctor image one" />
          </div>
          <div className={styles["images_section_two"]}>
            <div className={styles["second_images"]}>
              <Image src={Images.collage2} alt="doctor image two" />
            </div>
            <div className={styles["third_images"]}>
              <Image src={Images.collage3} alt="doctor image three" />
            </div>
          </div>
        </div>
        <div className={styles["about_mabel_section"]}>
          <div className={styles["about_mabel_head"]}>{titleHead}</div>
          <div className={styles["mabel_pateform"]}>
            Mebel Platform Benefits for
            <span className={styles["doctors_mabel"]}> Doctors </span>{" "}
          </div>
          {checkboxContent.map((item, key) => (
            <div className={styles["check_with_label"]} key={key}>
              <div>
                <Image src={item.img} alt="orange checkbox" />
              </div>
              <div className={styles["listing_chexkbox"]}>{item.label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
};

export default CollageWithContent;

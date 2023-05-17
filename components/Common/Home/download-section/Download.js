import Images from "@/components/Images/Images";
import Image from "next/image";
import React from "react";

import styles from "./download.module.scss";

const Download = ({ getHomePageData }) => {
  return (
    <div className={styles["main_container"]}>
      <div className={styles["main_container_content"]}>
        <div className={styles.background_image}>
          <Image src={Images.fourth_section_bg} alt="image" />
        </div>
        <div className={styles["inner_content"]}>
          <div className={styles["inner_content-left"]}>
            <Image src={Images.mobile} alt="mobile image" />
          </div>
          <div className={styles["inner_content-right"]}>
            <h1>Download The Best Doctor & Patient Consultation App</h1>
            <h6>Download The App</h6>

            <div className={styles["buttons"]}>
              <div className={styles["google_play_btn"]}>
                <a
                  href={
                    getHomePageData?.content?.app_download_google_playstore_url
                  }
                >
                  <Image src={Images.googlePlayBtn} alt="Google Play" />
                </a>
              </div>
              <div className={styles["apple_store_btn"]}>
                <a
                  href={
                    getHomePageData?.content?.app_download_apple_playstore_url
                  }
                >
                  <Image src={Images.appleIconBtn} alt="Apple" />{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;

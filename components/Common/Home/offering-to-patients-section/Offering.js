import Images from "@/components/Images/Images";
import Image from "next/image";
import React from "react";

import styles from "./offering.module.scss";

const Offering = ({ getHomePageData }) => {
  return (
    <div
      className={styles["main_container"]}
      dangerouslySetInnerHTML={{
        __html: getHomePageData?.content?.support_content_first,
      }}
    >
      {/* <div className={styles["main_container_content"]}>
        <div className="container">
          <div className={styles["offer_with_avatar"]}>
            <div className={styles["icon"]}>
              <Image src={Images.offeringIcon} alt="icon" />
            </div>
            <div className={styles["title"]}>
              <h5>What We Offer</h5>
            </div>
            <div className={styles["sub-title"]}>
              <h1>What Mebel offering to patients</h1>
            </div>
            <div className={styles["testimonials"]}>
              <Cards
                title="Best Doctors"
                subTitle="Contrary to popular belief, Lorem 
              Ipsum is not simply ran."
                imagePath={Images.offering2}
              />
              <Cards
                title="Online Consultation"
                subTitle="Contrary to popular belief, Lorem 
            Ipsum is not simply ran."
                imagePath={Images.offering1}
              />
              <Cards
                title="Patient support"
                subTitle="Contrary to popular belief, Lorem Ipsum is not simply ran."
                imagePath={Images.offering2}
              />
              <Cards
                title="Medical services"
                subTitle="Contrary to popular belief, Lorem 
              Ipsum is not simply ran."
                imagePath={Images.offering1}
              />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Offering;

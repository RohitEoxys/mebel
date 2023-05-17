import Image from "next/image";
import React from "react";
import { Router, useRouter } from "next/router";

import Images from "@/components/Images/Images";
import styles from "./thanksyou.module.scss";
import { Button } from "@/components/Common/UI/Button/Button";

const ThankYou = () => {
  const router = useRouter();

  const goToProfileClickHandler = () => {
    router.push("./profile");
  };

  return (
    <>
      <div className={styles["main_container"]}>
        <div className={styles["image"]}>
          <Image src={Images.bg_arc3} alt="bg" />
        </div>
        <div className={styles["main_container_content"]}>
          <div className="container">
            <div className="row justify-content-center text-center d-flex ">
              <div className={`col-12 ${styles["stars_bg"]}`}>
                <div className={styles["stars_bg_1"]}>
                  <Image src={Images.doc_thanks_bg} alt="bg"   className={styles["stars_bg_0"]}/>
                  <Image
                    src={Images.doc_thanks_tick_icon}
                    alt="bg"
                    className={styles["stars_bg_2"]}
                  />
                </div>
              </div>
              <h1>Thank You!</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                vel molestie nisl. Duis ac mi leo. Mauris at convallis erat.
                Aliquam interdum semper luctus.
              </p>

              <Button
                name="Go To Your Profile"
                mainDiv={styles["goToProfile"]}
                className={styles["goToProfile_main"]}
                onClick={goToProfileClickHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYou;

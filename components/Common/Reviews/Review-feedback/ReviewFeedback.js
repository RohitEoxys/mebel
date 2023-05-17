import Image from "next/image";

import styles from "./reviewfeedback.module.scss";
import StarRating from "../../Rating/Rating";

import Images from "@/components/Images/Images";
import { Button } from "../../../Common/UI/Button/Button";

export default function ReviewFeedback() {
  return (
    <>
      <div className="container">
        <div className={styles["main-div"]}>
          <div className={styles["upper-div"]}>
            <div className={styles["card-div"]}>
              <div className={styles["card-coponent"]}>
                <div className={styles["list-component"]}>
                  <div className={styles["row"]}>
                    <div className={styles["column"]}>
                      <div>
                        <div className={styles["card"]}>
                          <div className={styles["card-div-1"]}>
                            <Image
                              src={Images.review_doctor}
                              className={styles["card-img"]}
                            />
                          </div>
                          <div className={styles["card-div-2"]}>
                            <h4 className={styles["card-t-1"]}>
                              Dr. Amisha Smith
                            </h4>
                            <p className={styles["card-t-2"]}>
                              Sr. Psychologist
                            </p>
                            <p className={styles["card-t-3"]}>
                              <Image
                                src={Images.doctor_rating}
                                className={styles["card-img-2"]}
                                style={{ color: "#0f2f62" }}
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles["cards"]}>
                <div className={styles["inner-card"]}>
                  <div className={styles["inner-card-1"]}>
                    <div className={styles["inner-card-2"]}>
                      <h3 className={styles["cards-line-1"]}>Leave a review</h3>
                      <p className={styles["cards-line-2"]}>
                        How would you rate your experiance?
                      </p>
                      <h5 className={styles["cards-line-3"]}>5 Star Rating</h5>
                      <StarRating
                        className={styles["cards-stars"]}
                      ></StarRating>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <label className={styles["cards-line-4"]}>
                          Your Comment
                        </label>
                        <textarea
                          placeholder="ex. you guys are great"
                          className={styles["cards-line-5"]}
                        ></textarea>
                      </div>
                      <div>
                        <Button
                          name="Submit Review"
                          className={styles["only-btn"]}
                        ></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

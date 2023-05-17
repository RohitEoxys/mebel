import React from "react";
import styles from "./Review.module.scss";
import Images from "@/components/Images/Images";
import StarRating from "../Rating/Rating";
import { Image } from "react-bootstrap";
import HeadSection from "./HeadSection/HeadSection";
import moment from "moment";

const Review = ({ docReviewList }) => {
  const reviewData = docReviewList || [];

  // const data = {
  //   Name: "David Melan",
  //   img: Images.doctor1,
  //   rating: 5,
  //   date: "15th Dec 2022",
  //   comments:
  //     "Collaboratively empower multifunctional e-commerce for prospective applications. Seamlessly productivate plug and play markets.",
  // };

  return (
    <>
      <div className="container">
        <div className={styles["alrvw"]}>
          <HeadSection reviews={reviewData?.length} />
          <hr />
          {reviewData?.length === 0 ? (
            <div className={styles["no_data_div"]}>
              <Image
                src={Images.no_data5.src}
                alt="no data"
                className={styles.no_data_img}
              />
            </div>
          ) : (
            <>
              {reviewData?.map((data, key) => (
                <div className={styles["revw"]} key={key}>
                  <div className={styles["revw_pic"]}>
                    <Image src={data?.profile_image} alt="dp" roundedCircle />
                  </div>
                  <div className={styles["revw_dt"]}>
                    <div className={styles["revw_nm"]}>{data.name}</div>
                    <div className={styles["str_prt"]}>
                      <div className={styles["str_prt1"]}>
                        <div className={styles["str_rtng"]}>
                          {<StarRating rating={data.ratings} />}
                        </div>
                        <div className={styles["num_rvw"]}>
                          <span>({data?.ratings} Star Review)</span>
                        </div>
                      </div>

                      <div className={styles["dt_dta"]}>
                        <div className={styles["clnd_icn"]}>
                          <Image src={Images?.calender.src} alt="calendar" />
                        </div>
                        <div className={`mx-3 ${styles["clnd_dta"]}`}>
                          {moment(data?.date).format("MMM Do YY")}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${styles["cmtr_cmt"]} ${styles["doctor_review_page"]}`}
                    >
                      {data.review}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Review;

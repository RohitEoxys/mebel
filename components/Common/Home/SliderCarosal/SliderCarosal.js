import React, { useContext, useEffect } from "react";
import Images from "@/components/Images/Images";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./SliderCarosal.module.scss";
import StarRating from "../../Rating/Rating";
import FetchDataContext from "@/store/api-Context";

export const SliderCarosal = () => {
  const contextData = useContext(FetchDataContext);
  const getSilderData = contextData?.getHomeSliderData;
  useEffect(() => {
    contextData.getApiData("testimonials", "testimonials");
  }, []);

  const feedBack = [
    {
      img: Images.model1,
      profileHead: "Thomas darniam",
      desigination: "Designer",
      review:
        "“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
      rating: 3,
    },
    {
      img: Images.model2,
      profileHead: "Thomas darniam",
      desigination: "Designer",
      review:
        "“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
      rating: 4,
    },
    {
      img: Images.model1,
      profileHead: "Thomas darniam",
      desigination: "Designer",
      review:
        "“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
      rating: 5,
    },
    {
      img: Images.model3,
      profileHead: "Thomas darniam",
      desigination: "Designer",
      review:
        "“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
      rating: 5,
    },
    {
      img: Images.model2,
      profileHead: "Thomas darniam",
      desigination: "Designer",
      review:
        "“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
      rating: 5,
    },
    {
      img: Images.model3,
      profileHead: "Thomas darniam",
      desigination: "Designer",
      review:
        "“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
      rating: 5,
    },
    {
      img: Images.model1,
      profileHead: "Thomas darniam",
      desigination: "Designer",
      review:
        "“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
      rating: 5,
    },
  ];
  const sliderSettings = {
    // dots: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 3,
    // slidesToScroll: 3,
    // centerPadding: "200px",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className={styles["screen_back_div"]}>
        <div className={styles["comma_left"]}></div>
        <div className={styles["comma_right"]}></div>
        <div className={styles["screen_second_div"]}>
          <Image src={Images.home_bottom} alt="screen shot" />
        </div>
        <div className="container">
          <div className={styles["carosal_comma"]}>
            <div className={styles["clients_feedback_box"]}>
              <div className={styles["client_feedback"]}>Client’s Feedback</div>
              <div className={styles["what_patient"]}>
                What Our patient says
              </div>
              <div className={styles["feedBack_boxes"]}>
                <Slider {...sliderSettings}>
                  {Array.isArray(getSilderData)
                    ? getSilderData?.map((item, key) => (
                        <div className={styles["box_div"]} key={key}>
                          <div className={styles["box_content"]}>
                            <div className={styles["reviewer_img"]}>
                              <Image
                                src={item?.image}
                                alt="review image"
                                width={40}
                                height={40}
                              />
                            </div>
                            <div className={styles["box_head"]}>
                              <div className={styles["client_name"]}>
                                {item.name}
                              </div>
                              <div className={styles["client_desigination"]}>
                                {item.designation}
                              </div>
                            </div>
                          </div>
                          <div className={styles["client_para"]}>
                            {item.review}
                          </div>
                          <div className={styles["feedback_time_star"]}>
                            <span className={styles["feedback_time"]}>
                              {item.date} - {item.time}
                            </span>
                            <span>
                              <StarRating rating={item.rating} />
                            </span>
                          </div>
                        </div>
                      ))
                    : null}
                </Slider>
              </div>
            </div>
            {/* <div className={styles["comma2"]}>
              <Image src={Images.comma1} alt="inverted comma" />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

import Image from "next/image";
import React from "react";
import Slider from "react-slick";

import Images from "@/components/Images/Images";
import styles from "./slickCarousel.module.scss";

const SlickCarousel = ({ getHomePageData }) => {
  const carosalCardData = [
    {
      img: Images.nurse2,
      head: "Nurse",
      content: "Contrary to popular belief, Lorem Ipsum is not simply ran.",
    },
    {
      img: Images.medicine2,
      head: "General Medicine",
      content: "Contrary to popular belief, Lorem Ipsum is not simply ran.",
    },
    {
      img: Images.blood2,
      head: "Heart & Blood Health",
      content: "Contrary to popular belief, Lorem Ipsum is not simply ran.",
    },
    {
      img: Images.brain2,
      head: "Mental & Emotional Health",
      content: "Contrary to popular belief, Lorem Ipsum is not simply ran.",
    },
    {
      img: Images.nurse2,
      head: "Nurse",
      content: "Contrary to popular belief, Lorem Ipsum is not simply ran.",
    },
    {
      img: Images.medicine2,
      head: "General Medicine",
      content: "Contrary to popular belief, Lorem Ipsum is not simply ran.",
    },
    {
      img: Images.blood2,
      head: "Heart & Blood Health",
      content: "Contrary to popular belief, Lorem Ipsum is not simply ran.",
    },
    {
      img: Images.brain2,
      head: "Mental & Emotional Health",
      content: "Contrary to popular belief, Lorem Ipsum is not simply ran.",
    },
  ];

  var settings = {
    // infinite: true,
    // speed: 300,
    // slidesToShow: 4,
    // slidesToScroll: 1,
    // draggable: false,
    // adaptiveHeight: true,
    // autopaly: true,
    // centerMode: true,
    // centerPadding: "70px",
    // variableWidth: true,
    // rtl: true,
    // dots: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 4,
    // slidesToScroll: 1,
    // responsive: [
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       initialSlide: 2,
    //     },
    //   },
    // ],
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles["main_container"]}>
      {/* <Slider {...settings} className={styles["innerSlide"]}> */}
      <Slider {...settings}>
        {getHomePageData?.content?.section_4_slider?.map((item, key) => (
          <div className={styles["crosal_content"]} key={key}>
            <div className={styles["card_div"]}>
              <div className={styles["card_img"]}>
                <img src={item.image} alt="nurse icon" />
              </div>
              <div className={styles["card_head"]}>{item.heading}</div>
              <div className={styles["card_para"]}>{item.description}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickCarousel;

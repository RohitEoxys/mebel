import styles from "./carousel.module.scss";
import Image from "next/image";
import Images from "@/components/Images/Images";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className={styles["main"]}>
        <div className={styles["sleek-div"]}>
          <Slider {...settings} className={styles["sleek"]}>
            <div>
              <Image src={Images.slider_img_unicef} alt="img icon" />
            </div>
            <div>
              <Image src={Images.slider_priscrption_sheet_1} alt="img icon" />
            </div>
            <div>
              <Image src={Images.slider_priscrption_sheet_2} alt="img icon" />
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
}

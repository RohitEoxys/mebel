import Images from "@/components/Images/Images";
import Image from "next/image";
import React from "react";

import styles from "./notification.module.scss";

const messageItems = [
  {
    title: "Rohit Sharma",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper, nisi vitae condimentum tincidunt, mi ante sagittis lectus, vitae efficitur turpis elit vel dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper.",
    dp: Images.profile_icon,
    time: "10:40 AM",
  },
  {
    title: "Rohit Sharma",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper, nisi vitae condimentum tincidunt, mi ante sagittis lectus, vitae efficitur turpis elit vel dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper.",
    dp: Images.profile_icon,
    time: "10:40 AM",
  },
  {
    title: "Rohit Sharma",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper, nisi vitae condimentum tincidunt, mi ante sagittis lectus, vitae efficitur turpis elit vel dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper.",
    dp: Images.profile_icon,
    time: "10:40 AM",
  },
  {
    title: "Rohit Sharma",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper, nisi vitae condimentum tincidunt, mi ante sagittis lectus, vitae efficitur turpis elit vel dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper.",
    dp: Images.profile_icon,
    time: "10:40 AM",
  },
  {
    title: "Rohit Sharma",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper, nisi vitae condimentum tincidunt, mi ante sagittis lectus, vitae efficitur turpis elit vel dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper.",
    dp: Images.profile_icon,
    time: "10:40 AM",
  },
  {
    title: "Rohit Sharma",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper, nisi vitae condimentum tincidunt, mi ante sagittis lectus, vitae efficitur turpis elit vel dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper.",
    dp: Images.profile_icon,
    time: "10:40 AM",
  },
  {
    title: "Rohit Sharma",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper, nisi vitae condimentum tincidunt, mi ante sagittis lectus, vitae efficitur turpis elit vel dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper.",
    dp: Images.profile_icon,
    time: "10:40 AM",
  },
];

const Notification = () => {
  return (
    <div className={styles["main_container"]}>
      <div className={styles["image"]}>
        <Image src={Images.bg_arc3} alt="bg" />
      </div>
      <div className={styles["main_container_content"]}>
        <div className="container">
          <div
            className={`row justify-content-center ${styles["main_container_content_inner"]}`}
          >
            <h1 className="col-10 col-md-12  tex-align-start">Notification</h1>

            {messageItems.map((e, index) => {
              return (
                <div
                  className={`col-10 col-md-12 justify-content-center  d-flex ${styles.card}`}
                  key={index}
                >
                  <div className={`${styles.card_profile_icon}`}>
                    <Image src={e.dp} alt="profile" />
                  </div>
                  <div className={`${styles.card_content}`}>
                    <div className={`${styles.card_content_top}`}>
                      <h3>{e.title}</h3>
                      <span>{e.time}</span>
                    </div>

                    <p>{e.details}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;

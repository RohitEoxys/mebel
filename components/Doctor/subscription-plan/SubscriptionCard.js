import { Button } from "@/components/Common/UI/Button/Button";
import Images from "@/components/Images/Images";
import Image from "next/image";
import React from "react";
import styles from "./subscriptionCard.module.scss";
import { useRouter } from "next/router";

const SubscriptionCard = ({
  period,
  price,
  removeButton,
  bootClass,
  plans,
  id,
}) => {
  const router = useRouter();

  const subscribeClickHandler = (e) => {
    console.log("id");
    router.push({
      pathname: "./payment",
      query: { subscription_id: e.target.id },
    });
  };

  return (
    <>
      <div
        className={`col-10 col-sm-10 col-lg-4  text-start ${bootClass}    ${styles.mainContainer}`}
      >
        <h2>{period}</h2>
        <h3>${price}</h3>
        {plans?.map((item, index) => (
          <div className={styles["details"]} key={index}>
            <Image src={Images.Orange_tick} alt="check" />
            <h6>{item}</h6>
          </div>
        ))}

        {removeButton ? (
          ""
        ) : (
          <Button
            name="Buy Plan"
            mainDiv={styles["buyplanbtn"]}
            className={styles["buyplanbtn_main"]}
            id={id}
            onClick={subscribeClickHandler}
          />
        )}
      </div>
    </>
  );
};

export default SubscriptionCard;

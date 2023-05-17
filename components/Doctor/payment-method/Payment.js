import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Images from "@/components/Images/Images";
import styles from "./payment.module.scss";
import SubscriptionCard from "../subscription-plan/SubscriptionCard";
import { Button } from "@/components/Common/UI/Button/Button";
import FetchDataContext from "@/store/api-Context";
import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";

const Payment = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { subscription_id: id } = router.query;
  const contextData = useContext(FetchDataContext);

  const subscriptionList = contextData?.subscriptionList?.data;

  const dataBasedOnid =
    subscriptionList &&
    subscriptionList.filter((item) => item.id === Number(id));

  useEffect(() => {
    setLoading(true);
    if (id) {
      contextData.getApiData(
        "get-subscriptions",
        "subscriptionList",
        setLoading
      );
    }
  }, [id]);

  const payNowClickHandler = () => {
    router.push("./thanks");
  };

  return (
    <div className={styles["main_container"]}>
      <div className={styles["image"]}>
        <Image src={Images.bg_arc3} alt="bg" />
      </div>
      <div className={styles["main_container_content"]}>
        <div className="container">
          <div
            className={`row justify-content-center gx-5 ${styles["inner_container"]}`}
          >
            <div
              className={`col-10 col-sm-10 col-sm-10 col-md-4  ${styles["main_container-left"]}`}
            >
              {dataBasedOnid &&
                dataBasedOnid.map((item) => {
                  return (
                    <SubscriptionCard
                      price={item.price}
                      period={item.title}
                      removeButton
                      bootClass={`${styles["subscriptionCard"]} col-lg-12`}
                      plans={item.plans}
                      key={item.id}
                    />
                  );
                })}
            </div>
            <div
              className={`col-9 col-md-7 pe-5 ${styles["main_container-right"]}`}
            >
              <h2>Payment Method</h2>
              <h3>Payment Type*</h3>
              <div className={styles["paypal"]}>
                <Image src={Images.paypalIcon} alt="" />
              </div>
              <div
                className={`col-12 justify-content-between d-flex ${styles["accounts"]} `}
              >
                <div className={styles["subtotal"]}>Subtotal</div>
                <div className={styles["price"]}>
                  ${dataBasedOnid && dataBasedOnid[0].price}
                </div>
              </div>
              {/* <div
                className={`col-12 justify-content-between d-flex ${styles["accounts"]} `}
              >
                <div className={styles["subtotal"]}>Vat (10%)</div>
                <div className={styles["price"]}>$ 7.89</div>
              </div> */}
              <div className={styles["border"]}></div>
              <div
                className={`col-12 justify-content-between d-flex ${styles["total"]} `}
              >
                <div className={styles["total-title"]}>Total</div>
                <div className={styles["total-price"]}>
                  ${dataBasedOnid && dataBasedOnid[0].price}
                </div>
              </div>{" "}
              <div className={styles["border"]}></div>
              <Button
                name="Pay Now"
                mainDiv={styles["paynowBtn"]}
                className={styles["paynowBtn-main"]}
                onClick={payNowClickHandler}
              />
            </div>
          </div>
        </div>
      </div>
      {loading && <LoaderSpiner />}
    </div>
  );
};

export default Payment;

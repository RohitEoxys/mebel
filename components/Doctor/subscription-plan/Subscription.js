import React, { useContext, useEffect, useState } from "react";
import SubscriptionCard from "./SubscriptionCard";
import styles from "./subscription.module.scss";
import Image from "next/image";
import Images from "@/components/Images/Images";
import FetchDataContext from "@/store/api-Context";
import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";

const Subscription = () => {
  const contextData = useContext(FetchDataContext);
  const subscriptionList = contextData?.subscriptionList?.data;
  const pageLoadingCtx = contextData.pageLoading;

  useEffect(() => {
    contextData.getApiData("get-subscriptions", "subscriptionList");
  }, []);

  return (
    <>
      <div className={styles["subscription_container"]}>
        <div className={`container`}>
          <div className={styles["image"]}>
            <Image src={Images.bg_arc3} alt="bg" />
          </div>
          <div className="row justify-content-center ">
            <h1>Subscription Plan</h1>
            {subscriptionList?.map((item) => (
              <SubscriptionCard
                period={item.title}
                price={item.price}
                key={item.id}
                plans={item.plans}
                id={item.id}
              />
            ))}
          </div>
        </div>
        {pageLoadingCtx && <LoaderSpiner />}
      </div>
    </>
  );
};

export default Subscription;

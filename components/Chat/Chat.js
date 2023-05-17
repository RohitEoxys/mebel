import Image from "next/image";
import React, { useState } from "react";
import styles from "./chat.module.scss";
import Images from "../../components/Images/Images";
import BodybarCard from "./components/BodyBarCard/BodybarCard";

const Chat = () => {
  const [data1, setData1] = useState(
    {
      id: 1,
      img: Images.Avtar1,
      name: "Julian Assange Assange",
      msg: "How Are You? all",
      Time: "11.40 Am",
    }
  );

  
  let data = [
    {
      id: 1,
      img: Images.Avtar1,
      name: "Julian Assange Assange",
      msg: "How Are You?",
      Time: "10.40 Am",
    },
    {
      id: 2,
      img: Images.Avtar1,
      name: "Julian Assange Assange",
      msg: "How Are You?",
      Time: "10.40 Am",
    },
    {
      id: 3,
      img: Images.Avtar1,
      name: "Julian Assange",
      msg: "How Are You?",
      Time: "10.40 Am",
    },
    {
      id: 4,
      img: Images.Avtar1,
      name: "Julian Assange",
      msg: "How Are You?",
      Time: "10.40 Am",
    },
    {
      id: 5,
      img: Images.Avtar1,
      name: "Julian Assange",
      msg: "How Are You?",
      Time: "10.40 Am",
    },
    {
      id: 6,
      img: Images.Avtar1,
      name: "Julian Assange",
      msg: "How Are You?",
      Time: "10.40 Am",
    },
    {
      id: 7,
      img: Images.Avtar1,
      name: "Julian Assange",
      msg: "How Are You?",
      Time: "10.40 Am",
    },
    {
      id: 8,
      img: Images.Avtar1,
      name: "Julian Assange",
      msg: "How Are You?",
      Time: "10.40 Am",
    },
    {
      id: 9,
      img: Images.Avtar1,
      name: "Julian Assange",
      msg: "How Are You?",
      Time: "10.40 Am",
    },
    {
      id: 10,
      img: Images.Avtar1,
      name: "Julian Assange",
      msg: "How Are You?",
      Time: "10.40 Am",
    },
    {
      id: 11,
      img: Images.Avtar1,
      name: "Julian Assange",
      msg: "How Are You?",
      Time: "10.40 Am",
    },
  ];

  return (
    <div className={styles["cht_sec"]}>
      <div className={`pt-3 ${styles["cht_hdr"]}`}>
        <div className={styles["cht_hdng"]}>Chat</div>
        <div className={styles["srch_sec"]}>
          <div className={styles["srch_br"]}>
            <input
              className={styles["inpt data"]}
              placeholder="Search Here ..."
            ></input>
          </div>
          <div className={styles["icn_secn"]}>
            <div className={styles["icn_img"]}>
              <Image src={Images.search_normal} />
            </div>
          </div>
        </div>
      </div>
      <div className={`mt-3 ${styles["chat_bdy"]}`}>
        <div className={styles["side_bar"]}>
          {data?.map((item, key) => (
            <div onClick={() => setData1({item})}>
              <div className={styles["crd"]}>
                <div className={styles["img_sec"]}>
                  <div className={styles["img"]}>
                    <Image src={item.img} />
                  </div>
                </div>
                <div className={styles["nm_cht"]}>
                  <div className={styles["nm_sec"]}>{item.name}</div>
                  <div className={styles["msg_sec"]}>{item.msg}</div>
                </div>
                <div className={styles["tme_sec"]}>{item.Time}</div>
              </div>
            </div>
          ))}
        </div>
      <BodybarCard data1={data1}/>
      </div>
    </div>
  );
};

export default Chat;

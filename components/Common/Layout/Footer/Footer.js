import styles from "./Footer.module.scss";
import { Image } from "react-bootstrap";
import Images from "@/components/Images/Images";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import FetchDataContext from "@/store/api-Context";
import { useRouter } from "next/router";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  const router = useRouter();

  const contextData = useContext(FetchDataContext);
  const footerData = contextData?.footerData;
  const authorizationData = contextData?.config?.headers?.Authorization;
  // const presetAnswer = contextData.presetAnswer;
  const [mebelToken, setMebelToken] = useState(false);

  const goToProfileOrHome = () => {
    if (!mebelToken) {
      router.push("/");
    } else if (mebelToken && mebelToken.is_doctor === 0) {
      if (router.pathname.includes("patient")) {
        router.push("./profile");
      } else {
        router.push("./patient/profile");
      }
    } else if (mebelToken && mebelToken.is_doctor === 1) {
      if (router.pathname.includes("doctor")) {
        router.push("./profile");
      } else {
        router.push("./doctor/profile");
      }
    }
  };

  let userData = null;
  useEffect(() => {
    userData = sessionStorage.getItem("mebel_user");
    if (authorizationData !== "Bearer null") {
      setMebelToken(JSON.parse(userData));
    }
  }, [authorizationData]);

  useEffect(() => {
    contextData.getApiData("site-setting", "footerData");
  }, []);

  // useEffect(() => {
  //   contextData.getApiData("get-preset-answer", "get-preset-answer");
  // }, [mebelToken]);

  return (
    <>
      <div className={styles["footer_background"]}>
        <div className={styles["footer_background_image"]}>
          <Image src={Images?.footer_img.src} alt="footer image" />
        </div>
        <div className="container">
          <div className={styles["footer_container"]}>
            {/* <Link href="/"> */}
            <div className={styles["footer_img"]} onClick={goToProfileOrHome}>
              <Image src={footerData?.logo} alt="home logo" />
            </div>
            {/* </Link> */}
            <div className={styles["footer_text"]}>
              <p>{footerData?.footerconent}</p>
            </div>
            <div className={styles["footers_logo"]}>
              {footerData?.facebook && (
                <Link href={footerData?.facebook} target="_blank">
                  <Image src={Images.facebook.src} alt="facebook logo" />
                </Link>
              )}
              {footerData?.twitter && (
                <Link href={footerData?.twitter} target="_blank">
                  <Image src={Images.twitter.src} alt="facebook logo" />
                </Link>
              )}
              {footerData?.instagram && (
                <Link href={footerData?.instagram} target="_blank">
                  <Image src={Images.instagram.src} alt="facebook logo" />
                </Link>
              )}
              {footerData?.linkedin && (
                <Link href={footerData?.linkedin} target="_blank">
                  <Image src={Images.linkedIn.src} alt="facebook logo" />
                </Link>
              )}

              {/* <Link href={footerData?.twitter} target="_blank">
                <Image src={Images.twitter} alt="twitter logo" />
              </Link>
              <Link href={footerData?.instagram} target="_blank">
                <Image src={Images.instagram} alt="instagram logo" />
              </Link>
              <Link href={footerData?.linkedin} target="_blank">
                <Image src={Images.linkedIn} alt="linkedIn logo" />
              </Link> */}
            </div>
            <div className={styles["footer_right"]}>
              <div className={styles["footer_date"]}>
                © {year} Copyright{" "}
                <span style={{ color: "#ED7B30" }}>Mebel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

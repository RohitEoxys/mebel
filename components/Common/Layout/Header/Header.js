import Router, { useRouter } from "next/router";
import { useEffect, useState, useRef, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";
import Images from "@/components/Images/Images";
import Dropdown1 from "../../UI/Dropdown/Dropdown1";
import Dropdown2 from "../../UI/Dropdown/Dropdown2";
import Dropdown3 from "../../UI/Dropdown/Dropdown3";
import clickOutsideToFalseDrop from "../../ClickOutsideToFalseDrop/clickOutsideToFalseDrop";
import FetchDataContext from "@/store/api-Context";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

const options = [
  {
    label: "My Profile",
    value: "./patient/profile",
  },
  {
    label: "Notification",
    value: "notification",
  },
  {
    label: "Log out",
    value: "Log out",
  },
];

const Header = () => {
  const routePath = useRouter().pathname;
  const router = useRouter();
  const [menuDrop, setMenuDrop] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [mebelToken, setMebelToken] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const contextData = useContext(FetchDataContext);
  // const presetAnswer = contextData.presetAnswer;

  const authorizationData = contextData?.config?.headers?.Authorization;

  const dropdownRef = useRef(null);
  clickOutsideToFalseDrop(dropdownRef, () => setUserProfile(false));

  let userData = null;
  useEffect(() => {
    userData = sessionStorage.getItem("mebel_user");
    if (authorizationData !== "Bearer null") {
      setMebelToken(JSON.parse(userData));
    }
  }, [authorizationData]);

  // useEffect(() => {
  //   contextData.getApiData("get-preset-answer", "get-preset-answer");
  // }, [mebelToken]);

  const handleClick = () => {
    setMenuDrop(!menuDrop);
    setShowIcon(!showIcon);
  };

  const profileDrop = () => {
    setUserProfile(!userProfile);
  };

  const logOutUser = () => {
    router.push(
      {
        pathname: "/",
      },
      undefined,
      { shallow: false }
    );

    if (typeof window !== undefined) {
      sessionStorage.clear();
      setUserProfile(false);
      setMebelToken(false);
    }
  };

  const goToMyProfile = () => {
    if (mebelToken?.is_doctor === 0 && router.pathname.includes("patient")) {
      router.push(
        {
          pathname: "./profile",
        },
        undefined,
        { shallow: false }
      );
    } else if (mebelToken?.is_doctor === 0) {
      router.push(
        {
          pathname: "./patient/profile",
        },
        undefined,
        { shallow: false }
      );
    }
    if (mebelToken?.is_doctor === 1 && router.pathname.includes("doctor")) {
      router.push(
        {
          pathname: "./profile",
        },
        undefined,
        { shallow: false }
      );
    } else if (mebelToken?.is_doctor === 1) {
      router.push(
        {
          pathname: "./doctor/profile",
        },
        undefined,
        { shallow: false }
      );
    }
    setUserProfile(!userProfile);
  };

  const homeClickHandler = () => {
    Router.push("/");
    setMenuDrop(!menuDrop);
    setShowIcon(!showIcon);
  };
  const aboutusClickHandler = () => {
    Router.push("/about-us");
    setMenuDrop(!menuDrop);
    setShowIcon(!showIcon);
  };
  const benefitsClickHandler = () => {
    Router.push("/benefits");
    setMenuDrop(!menuDrop);
    setShowIcon(!showIcon);
  };

  const notificationClickHandler = () => {
    router.push("/notifications");
    setUserProfile(!userProfile);
  };
  const homeLogoClickHandler = () => {
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

  return (
    <>
      <div className={styles["main"]}>
        <div className="container">
          <div className={styles["header_container"]}>
            <div className={styles["nav_logo"]}>
              <div className={styles["home_img"]}>
                <Image
                  src={Images.Home_logo}
                  alt="home logo"
                  onClick={homeLogoClickHandler}
                />
              </div>
            </div>
            <div className={styles["nav_content"]}>
              {!mebelToken ? (
                <div className={styles["content_align"]}>
                  <Link href="/">
                    <div className={styles[routePath == "/" ? "active" : ""]}>
                      Home
                    </div>
                  </Link>
                  <Link href="/about-us">
                    <div
                      className={
                        styles[routePath == "/about-us" ? "active2" : ""]
                      }
                    >
                      About Us
                    </div>
                  </Link>
                  <Link href="/benefits">
                    <div
                      className={
                        styles[routePath == "/benefits" ? "active3" : ""]
                      }
                    >
                      Benefits
                    </div>
                  </Link>
                  <div className={styles["dropdowns"]}>
                    <div>
                      <Dropdown1 />
                    </div>
                    <div>
                      <Dropdown2 />
                    </div>
                    <div>
                      <Dropdown3 />
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles["after_login_content"]}>
                  <div>
                    <Dropdown1 />
                  </div>
                  <div className={"notificationBtn"}>
                    <Link href={"/notifications"}>
                      <Image
                        src={Images.notification_icon}
                        alt="notification icon"
                      />
                    </Link>
                  </div>
                  <div className={styles["user_img_div"]}>
                    <div className={styles["user_image"]}>
                      <Image
                        src={
                          mebelToken
                            ? mebelToken?.profile_image
                            : Images.patient_profile_icon
                        }
                        alt="user image"
                        width={58}
                        height={58}
                      />
                    </div>
                    <div className={styles["user_details"]} ref={dropdownRef}>
                      <div
                        className={styles["user_name"]}
                        onClick={profileDrop}
                      >
                        {mebelToken?.name}
                        <span className={styles.profile_dropdownArrow}>
                          <Icon />
                        </span>
                      </div>
                      {userProfile ? (
                        <div className={styles["user_profile_drop"]}>
                          <div
                            className={styles["my_profile"]}
                            onClick={goToMyProfile}
                          >
                            My Profile
                          </div>
                          <div
                            className={styles["my_profile"]}
                            onClick={notificationClickHandler}
                          >
                            Notification
                          </div>
                          <div
                            className={styles["my_profile"]}
                            onClick={logOutUser}
                          >
                            Log out
                          </div>
                        </div>
                      ) : null}

                      <div className={styles["user_number"]}>
                        {mebelToken?.number}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* RESPONSIVE HTML START */}
              <div className={`containe ${menuDrop && "backdrop"}`}>
                <div className={styles["resp_menu"]} onClick={handleClick}>
                  {!showIcon ? (
                    <Image src={Images.menu} alt="menu icon" />
                  ) : (
                    <Image src={Images.resp_cross} alt="menu icon" />
                  )}
                </div>
                {menuDrop ? (
                  <>
                    <div className={styles["resp_drop"]}>
                      <div className="container">
                        <div className={styles["res-top"]}>
                          <div className={styles["res-top-contents"]}>
                            <div className={styles["home_img"]}>
                              <Link href="/">
                                <Image
                                  src={Images.header_logo_res}
                                  alt="home logo"
                                  onClick={homeLogoClickHandler}
                                />
                              </Link>
                            </div>
                            <div
                              className={styles["resp_menu"]}
                              onClick={handleClick}
                            >
                              {!showIcon ? (
                                <Image src={Images.menu} alt="menu icon" />
                              ) : (
                                <Image
                                  src={Images.resp_cross}
                                  alt="menu icon"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        {!mebelToken ? (
                          <div className={styles["resp_drop_div"]}>
                            <div
                              className={styles["resp_drop_div-home"]}
                              onClick={homeClickHandler}
                            >
                              Home
                            </div>
                            <div
                              className={styles["resp_drop_div-aboutus"]}
                              onClick={aboutusClickHandler}
                            >
                              About Us
                            </div>
                            <div
                              className={styles["resp_drop_div-benefits"]}
                              onClick={benefitsClickHandler}
                            >
                              Benefits
                            </div>
                            <div className={styles["resp_lang"]}>
                              <Dropdown1 />
                            </div>
                            <div className={styles["resp_login_signup"]}>
                              <Dropdown2 />

                              <Dropdown3 />
                            </div>
                          </div>
                        ) : (
                          <div className={styles["after_login_content_resp"]}>
                            <div className={styles["resp_user_div"]}>
                              <div className={styles["user_img_div"]}>
                                <div className={styles["user_image"]}>
                                  <Image
                                    src={mebelToken?.profile_image}
                                    alt="user image"
                                    width={58}
                                    height={58}
                                  />
                                </div>
                                <div className={styles["user_details"]}>
                                  <div
                                    className={styles["user_name"]}
                                    onClick={profileDrop}
                                  >
                                    {mebelToken?.name}
                                    <Icon />
                                  </div>
                                  {userProfile ? (
                                    <div
                                      className={styles["user_profile_drop"]}
                                      ref={dropdownRef}
                                    >
                                      <div
                                        className={styles["my_profile"]}
                                        onClick={goToMyProfile}
                                      >
                                        My Profile
                                      </div>
                                      <div
                                        className={styles["my_profile"]}
                                        onClick={notificationClickHandler}
                                      >
                                        Notification
                                      </div>
                                      <div
                                        className={styles["my_profile"]}
                                        onClick={logOutUser}
                                      >
                                        Log out
                                      </div>
                                    </div>
                                  ) : null}

                                  <div className={styles["user_number"]}>
                                    {mebelToken?.number}
                                  </div>
                                </div>
                              </div>
                              <div className={"notificationBtn"}>
                                <Image
                                  src={Images.notification_icon}
                                  alt="notification icon"
                                />
                              </div>
                            </div>
                            <div>
                              <Dropdown1 />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={styles["search_back"]}></div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div key={key}>{randomData}</div>; */}
    </>
  );
};

export default Header;

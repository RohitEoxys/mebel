import StarRating from "@/components/Common/Rating/Rating";
import Images from "@/components/Images/Images";
import Image from "next/image";
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import DoctorForm from "./DoctorFormList/DoctorForm";
import styles from "./DoctorList.module.scss";
import { useRouter } from "next/router";
import DoctorFormPopup from "./DoctorFormPopup/DoctorFormPopup";
import FetchDataContext from "@/store/api-Context";
import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";
import PageLoading from "@/components/Common/UI/pageLoadingAnim/PageLoading";

const DoctorList = () => {
  const [showRespFilter, setShowRespFilter] = useState(false);
  const [metaData, setMetaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const contextData = useContext(FetchDataContext);
  const router = useRouter();
  const config = contextData?.config;

  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [searchValueState, setSearchValueState] = useState();
  const [loadMore, setLoadMore] = useState(false);
  const [searchResult, setSearchResult] = useState(0);

  const [page, setPage] = useState(1);
  const observerRef = useRef();

  useEffect(() => {
    setLoading(true);
  }, []);

  const callAPI = (value) => {
    const formData = new FormData();

    formData.append("page", page);

    if (value?.doctor_name) {
      formData.append("name", value?.doctor_name);
    }

    if (value?.specialty) {
      formData.append(
        "speciality",
        value?.specialty && JSON.parse(value?.specialty).value
      );
    }
    if (value?.hospital) {
      formData.append(
        "hospital",
        value?.hospital && JSON.parse(value?.hospital).value
      );
    }

    if (value?.day) {
      formData.append("weekday", value?.day && JSON.parse(value?.day).value);
    }

    if (value?.start_hours || value?.start_minutes) {
      formData.append(
        "start_time",
        `${value?.start_hours}:${value?.start_minutes || "00"}`
      );
    }

    if (value?.end_hours || value?.end_minutes) {
      formData.append(
        "end_time",
        `${value?.end_hours}:${value?.end_minutes || "00"}`
      );
    }

    axios
      .post(
        `https://admin.ewtlive.in/api/doctor-filters`,

        formData,
        config
      )
      .then((data) => {
        setLoading(false);
        if (page == 1) {
          setItems(data.data.data);
          setMetaData(data.data.meta);
        } else {
          setItems((prevItems) => [...prevItems, ...data.data.data]);
          setMetaData(data.data.meta);
        }
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const formValues = (searchValues) => {
    setSearchValueState(searchValues);
    setSearchResult((prev) => prev + 1);
  };

  useEffect(() => {
    callAPI(searchValueState);
  }, [searchResult, loadMore]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (metaData && metaData?.total_page > page) {
          if (metaData && page !== metaData?.total_page) {
            setPageLoading(true);
            setLoadMore((prevPage) => prevPage + 1);
            setPage((prevPage) => prevPage + 1);
          }
        } else {
          setPageLoading(false);
        }
      }
    });
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [metaData]);

  useEffect(() => {
    if (showRespFilter) {
      document.body.style.overflow = "hidden";
    }
  }, [showRespFilter]);

  const cardClickHandler = (id) => {
    router.push({ pathname: "./doctor-description", query: { len: id } });
  };

  const handleFilter = () => {
    setShowRespFilter(!showRespFilter);
  };

  const optionRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (optionRef.current && !optionRef.current.contains(event.target)) {
      setShowRespFilter(false);
    }
  };

  return (
    <>
      <div className={`${styles["doctor_list"]}`}>
        <div className={styles["web_doctorlist_form"]}>
          <DoctorForm searchValues={formValues} setPage={setPage} />
        </div>
        <div className={styles["cornor_img_div"]}>
          <Image src={Images.bg_arc3} alt="icon" />
        </div>
        {showRespFilter ? (
          <div className={styles["resp_doctorlist_form"]}>
            <DoctorFormPopup ref={optionRef} />
          </div>
        ) : null}
        <div className="container">
          <div className={styles["resp_search_div"]}>
            <div className={styles["search_inp_div"]}>
              <input
                type="text"
                placeholder="Search Here..."
                className={styles["input_box"]}
              />
            </div>
            <div>
              <Image
                src={Images.respfilter}
                alt="filter icon"
                onClick={handleFilter}
              />
            </div>
          </div>
          <div className={styles["all_doctor_list_div"]}>
            <div className={styles["heading_section"]}>
              <h2 className={styles["all_doctor_list"]}>All Doctors List </h2>
            </div>

            <div className={styles["cards_div"]}>
              <>
                {items && items.length > 0 && (
                  <>
                    {items?.map((list, key) => (
                      <div
                        className={styles["doctor_cards"]}
                        key={key}
                        onClick={() => cardClickHandler(list.id)}
                      >
                        <div className={styles["doc_img_left"]}>
                          <div className={styles["doctor_pic"]}>
                            {list?.is_online === 1 && (
                              <span className={styles["online_mode"]} />
                            )}
                            <img src={list.profile_image} alt="doctor photo" />
                          </div>
                        </div>
                        <div className={styles["right_div"]}>
                          <div className={styles["doctor_name"]}>
                            Dr. {list.name}
                          </div>
                          <div className={styles["doctor_speciality"]}>
                            {list?.specialities.join(", ")}
                          </div>
                          <div className={styles["doctor_category"]}>
                            {list.category}
                          </div>
                          <div>
                            <StarRating rating={list.ratings} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {searchItems && searchItems.length > 0
                  ? searchItems?.map((list, key) => (
                      <div
                        className={styles["doctor_cards"]}
                        key={key}
                        onClick={() => cardClickHandler(list.id)}
                      >
                        <div className={styles["doc_img_left"]}>
                          <div className={styles["doctor_pic"]}>
                            {list?.is_online === 1 && (
                              <span className={styles["online_mode"]} />
                            )}
                            <img src={list.profile_image} alt="doctor photo" />
                          </div>
                        </div>
                        <div className={styles["right_div"]}>
                          <div className={styles["doctor_name"]}>
                            Dr. {list.name}
                          </div>
                          <div className={styles["doctor_speciality"]}>
                            {list?.specialities.join(", ")}
                          </div>
                          <div className={styles["doctor_category"]}>
                            {list.category}
                          </div>
                          <div>
                            <StarRating rating={list.ratings} />
                          </div>
                        </div>
                      </div>
                    ))
                  : items.length === 0 && (
                      <div className={styles["no_data_list"]}>
                        <Image src={Images?.no_data5} alt="no_data" />
                      </div>
                    )}
              </>
            </div>
          </div>
        </div>

        <div className={styles["pageLoading"]}>
          {pageLoading ? <PageLoading /> : null}
        </div>
      </div>

      {loading ? <LoaderSpiner /> : null}
      <div ref={observerRef} id={metaData?.total_page}></div>
    </>
  );
};

export default DoctorList;

import React, { useContext, useEffect, useState } from "react";
import styles from "./TypeOfConsult.module.scss";
import { Checkbox } from "antd/lib";
import FetchDataContext from "@/store/api-Context";

const TypeOfConsult = ({ modalState }) => {
  const [values, setValues] = useState({});
  const contextData = useContext(FetchDataContext);
  const consultTypeData = contextData.consultType || [];
  const [checkedValues, setCheckedValues] = useState({});
  const [submitValues, setSubmitValues] = useState({});

  useEffect(() => {
    contextData.getApiData("get-consultation", "get-consultation-type");
  }, []);

  const handlePrice = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setSubmitValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCheckbox = (e) => {
    if (!e.target.checked) {
      delete submitValues[e.target.name];
    }
    if (e.target.checked) {
      setCheckedValues({ ...checkedValues, [e.target.name]: e.target.value });
    } else {
      setCheckedValues({ ...checkedValues, [e.target.name]: false });
    }
  };

  const handleSubmit = () => {
    if (Object.values(submitValues).length) {
      contextData.postTypeOfConsult("add-type-of-consultation", {
        consultation_ids: Object.keys(submitValues).toString(),
        price: Object.values(submitValues).toString(),
      });
    }
    modalState(false);
  };

  return (
    <>
      <div className={styles["popup_body"]}>
        <div className={styles["name_head"]}>
          <div className={styles["consultaion_name"]}>Consultation Name</div>
          <div className={styles["consultation_price"]}>Price</div>
        </div>
        <div className={styles["consultation_type"]}>
          {consultTypeData &&
            consultTypeData?.map((item, key) => {
              return (
                <div className={styles["consultations"]} key={key}>
                  <div className={styles["check_consult"]}>
                    <Checkbox
                      name={item.id}
                      value={item.id}
                      onChange={handleCheckbox}
                    />
                    <div className={styles["consult"]}>
                      {item?.consultation_name}
                    </div>
                  </div>
                  <div className={styles["price_input"]}>
                    <input
                      type="number"
                      name={item.id}
                      onChange={handlePrice}
                    />
                  </div>
                </div>
              );
            })}
          <div className={styles["btn_div"]}>
            <button onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TypeOfConsult;

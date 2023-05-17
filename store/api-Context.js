import { createContext, useEffect, useState } from "react";
import axios from "axios";
import SucessPopup from "@/components/Common/Popup/SucessPopup";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { message } from "antd";

let token;
try {
  token = sessionStorage.getItem("mebel_token");
} catch (err) {
  token = "default value";
}

const defConfig = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

import LoaderSpiner from "@/components/Common/Loader/LoaderSpiner";
import Home from "@/components/Common/Home/Home";

const FetchDataContext = createContext({
  educationList: null,
  specialityList: null,
  hospitalList: null,
  patientProfile: null,
  upComingAppointment: null,
  getPreviusCunsult: null,
  getPatientRecentReports: null,
  getMedicineTaken: null,
  doctorProfile: null,
  doctorList: null,
  doctorDetails: null,
  subscriptionList: null,
  doctorSearch: null,
  appointmentId: null,
  doctorInfo: null,
  loginDetails: null,
  config: null,
  getReportsData: null,
  makeAppointmentWithQrData: null,
  getUploadedReports: null,
  getPatientDetailsFromPin: null,
  reportDeleted: {},
  patientProfileData: null,
  footerData: null,
  todaysAppointment: null,
  getHomePageData: null,
  getHomeSliderData: null,
  docReviewList: null,
  appointmentAvailabilityList: null,
  appointmentTimingList: null,
  saveAppointmentData: null,
  presetQuestions: null,
  getDiseaseName: null,
  getSymptomName: null,
  getDiseaseSypmtom: null,
  getDoctorAvailability: null,
  sendPresetQuestionAnswer: null,
  sendTypeOfConsultData: null,
  presetAnswer: null,
  getPresetQuestionAnswer: null,
  presetAnswerStatus: null,
  consultTypeData: null,
  selectedHospitalList: null,
  getSelectedHospitalAvalibility: null,
  consultType: null,
  addNewDoctorQuestion: null,
  doctorTypeQuestion: null,
  getPatientAppointments: null,
  getAppointmentDetails: null,

  getApiData: function (url, type, setLoading) {},
  appointmentDetails: function (url, type, setLoading) {},
  postAPI: function (url, data) {},
  sendOtp: function (url, data) {},
  otpVerified: function (url, data) {},
  patientUploadReports: function (url, data) {},
  deleteUploadReport: function (url, reportId) {},
  getPatientReports: function (url) {},
  selectedDiseaseSymptoms: function (url) {},
  patientAppointments: function (url) {},
  errorMsg: false,
  pageLoading: false,
  getPatientProfileData: function (url, data) {},
  updateDoctorBio: function (url, data) {},
  docReviews: function (url, data) {},
  getPagesData: function (url, data) {},
  getDoctorDetails: function (url, data) {},
  doctorFilter: function (url, data) {},
  getAppointmentAvailability: function (url, data) {},
  getAppointmentTiming: function (url, data) {},
  saveAppointment: function (url, data) {},
  makeAppointmentWithQr: function (url, data) {},
  QuestionForPatient: function (url, data) {},
  addQuestion: function (url, data) {},
  updatePatientProfile: function (url, data) {},
  pinVerifyForPatientDetails: function (url, data) {},
  postPresetQuestion: function (url, data) {},
  updateDoctorAvailability: function (url, data, setLoading) {},
  updateDoctorAvailability: function (url, data, setLoading) {},
  postPresetQuestion: function (url, data) {},
  postTypeOfConsult: function (url, data) {},
  getConsultType: function (url, data) {},
  getPresetAnswer: function (url, data) {},
  addDoctorQuestion: function (url, data) {},
  deleteDoctorAddedQuestions: function (url, data) {},
});

export function FetchDataContextProvider(props) {
  const [educationList, setEducationList] = useState("");
  const [config, setConfig] = useState(defConfig);
  const [specialityList, setSpecialityList] = useState("");
  const [hospitalList, setHospitalList] = useState("");
  const [selectedHospitalList, setGetSelectedHospitalList] = useState("");
  const [getSelectedHospitalAvalibility, setGetSelectedHospitalAvalibility] =
    useState("");
  const [todaysAppointment, setTodaysAppointment] = useState("");
  const [subscriptionList, setSubscriptionList] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [patientProfile, setPatientProfile] = useState("");
  const [pageLoading, setPageLoading] = useState(false);
  const [docReviewList, setDocReviewList] = useState(false);
  const [appointmentId, setAppointmentId] = useState("");
  const [doctorInfo, setDoctorInfo] = useState("");
  const [loginDetails, setLoginDetails] = useState("");
  const [getHomePageData, setGetHomePageData] = useState("");
  const [getHomeSliderData, setGetHomeSliderData] = useState("");
  const [questionAdd, setQuestionAdd] = useState("");
  const [patientProfileData, setPatientProfileData] = useState("");
  const [footerData, setFooterData] = useState("");
  const [getDiseaseName, setGetDiseaseName] = useState("");
  const [getSymptomName, setGetSymptomName] = useState("");

  const [getDiseaseSypmtom, setGetDiseaseSypmtom] = useState("");
  const [sendPresetQuestionAnswer, setSendPresetQuestionAnswer] = useState("");
  const [sendTypeOfConsultData, setSendTypeOfConsultData] = useState("");
  const [getDoctorAvailability, setGetDoctorAvailability] = useState("");
  const [doctorTypeQuestion, setDoctorTypeQuestion] = useState("");

  // const [upComingAppoint, setPatientProfile] = useState("");
  const [doctorProfile, setDoctorProfile] = useState("");
  const [doctorList, setDoctorList] = useState("");
  const [patientQuestion, setPatientQuestion] = useState("");
  const [doctorDetails, setDoctorDetails] = useState("");
  const [doctorSearch, setDoctorSearch] = useState("");
  const [presetQuestions, setPresetQuestions] = useState("");
  const [presetAnswer, setPresetAnswer] = useState(null);
  const [consultType, setConsultType] = useState(null);
  const [presetAnswerStatus, setPresetAnswerStatus] = useState(null);
  const [appointmentAvailabilityList, setAppointmentAvailabilityList] =
    useState("");
  const [appointmentTimingList, setAppointmentTimingList] = useState("");
  const [saveAppointmentData, setSaveAppointmentData] = useState("");
  const [upComingAppointment, setupComingAppointment] = useState("");
  const [getPreviusCunsult, setGetPreviusCunsult] = useState("");
  const [getPatientRecentReports, setGetPatientRecentReports] = useState("");
  const [getMedicineTaken, setGetMedicineTaken] = useState("");
  const [getReportsData, setGetReportsData] = useState("");
  const [reportDeleted, setReportDeleting] = useState({});
  const [makeAppointmentWithQrData, setMakeAppointmentWithQrData] =
    useState("");
  const [updateDoctorAvailabilityList, setUpdateDoctorAvailabilityList] =
    useState("");
  const [getUploadedReports, setGetUploadedReports] = useState("");
  const [getPatientDetailsFromPin, setGetPatientDetailsFromPin] = useState("");
  const [getPresetQuestionAnswer, setGetPresetQuestionAnswer] = useState("");
  const [getPatientAppointments, setGetPatientAppointments] = useState("");
  const [getAppointmentDetails, setGetAppointmentDetails] = useState("");
  const [consultTypeData, setConsultTypeData] = useState("");
  const [addNewDoctorQuestion, setAddNewDoctorQuestion] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const router = useRouter();

  const getApiDataHandler = (url, type, setLoading) => {
    setPageLoading(true);
    axios
      .get(`https://admin.ewtlive.in/api/${url}`, config)
      .then((res) => {
        setPageLoading(false);
        if (type === "educationList") {
          setEducationList(res.data);
        }
        if (type === "specialityList") {
          setSpecialityList(res.data);
        }
        if (type === "hospitalList") {
          setHospitalList(res.data);
        }
        if (type === "patientProfile") {
          setPatientProfile(res.data);
        }
        if (type === "upComingAppointment") {
          setupComingAppointment(res.data);
        }
        if (type === "doctorProfile") {
          setDoctorProfile(res.data.data);
        }
        if (type === "getPreviusCunsult") {
          setGetPreviusCunsult(res.data);
        }
        if (type === "getPatientRecentReports") {
          setGetPatientRecentReports(res.data.data);
        }
        if (type === "getMedicineTaken") {
          setGetMedicineTaken(res.data);
        }

        if (type === "subscriptionList") {
          setSubscriptionList(res.data);
        }
        if (type === "todaysAppointment") {
          setTodaysAppointment(res.data.data);
        }
        if (type === "testimonials") {
          setGetHomeSliderData(res.data.data);
        }
        if (type === "footerData") {
          setFooterData(res.data.data);
        }
        if (type === "preset-questions") {
          setPresetQuestions(res.data.data);
        }
        if (type === "get-disease-name") {
          setGetDiseaseName(res.data.data);
        }
        if (type === "get-symptom-name") {
          setGetSymptomName(res.data.data);
        }
        if (type === "getDoctorAvailability") {
          setGetDoctorAvailability(res.data);
        }
        if (type === "get-preset-answer") {
          setPresetAnswer(res.data);
        }
        // if (type === "presetAnswer") {
        //   setGetPresetQuestionAnswer(res.data);
        // }
        if (type === "update-preset-status") {
        }
        if (type === "get-consultation-type") {
          setConsultType(res.data.data);
        }

        if (type === "get-doctor-hospital") {
          setGetSelectedHospitalList(res.data);
        }

        if (type === "get-doctor-hospital") {
          setGetSelectedHospitalList(res.data);
        }

        if (type === "get-doctor-hospital-avaliablity") {
          setGetSelectedHospitalAvalibility(res.data.data);
        }
        if (type === "get-doctor-type-question") {
          setDoctorTypeQuestion(res.data.data);
        }

        if (setLoading) {
          setLoading(false);
        }
      })
      .catch((err) => {
        if (setLoading) {
          setLoading(false);
        }
      });
  };

  const postPresetQuestion = (url, formData, setLoading) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, formData, config)
      .then((res) => {
        if (res.data.success) {
          setSendPresetQuestionAnswer(res.data);
        }
        if (setLoading) {
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        if (setLoading) {
          setLoading(false);
        }
      });
  };

  const getPagesData = (url, setLoading) => {
    axios
      .get(`https://admin.ewtlive.in/api/home?slug=${url}`)
      .then((res) => {
        if (res.data.success) {
          setGetHomePageData(res.data.data);
        }

        if (setLoading) {
          setLoading(false);
        }
      })
      .catch((err) => {
        if (setLoading) {
          setLoading(false);
        }
      });
  };

  const getConsultType = (url, formData, setLoading) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, formData, config)
      .then((res) => {
        if (res.data.success) {
          setConsultTypeData(res.data.data);
        }

        if (setLoading) {
          setLoading(false);
        }
      })
      .catch((err) => {
        if (setLoading) {
          setLoading(false);
        }
      });
  };

  const postAPIhandler = (url, data, handelOpen, setLoading) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data)
      .then((res) => {
        if (res.data.success) {
          handelOpen();
        }
        if (setLoading) {
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        if (setLoading) {
          setLoading(false);
        }
      });
  };

  const onSendOtp = (url, data, setReOtp, setOpenOtp, setLoading) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data)
      .then((res) => {
        if (res.data.success) {
          setReOtp(false);
          setOpenOtp(true);
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
        if (setLoading) {
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        if (setLoading) {
          setLoading(false);
        }
      });
  };

  const otpVerified = (url, data, setLoading) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data)
      .then((res) => {
        if (res.data.success) {
          const setConfigVal = {
            headers: {
              Authorization: `Bearer ${res.data.auth_token}`,
            },
          };
          setConfig(setConfigVal);
          setLoginDetails(res.data.data);
          sessionStorage.setItem("mebel_token", res.data.auth_token);
          sessionStorage.setItem("mebel_user", JSON.stringify(res.data.data));

          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          if (res.data.data.is_doctor === 1) {
            router.push(
              {
                pathname: "/doctor/subscription",
              },
              undefined,
              { shallow: false }
            );
          } else {
            if (res.data.data.preset_question_status === 0) {
              router.push(
                {
                  pathname: "./preset-questions",
                },
                undefined,
                { shallow: false }
              );
            } else {
              router.push(
                {
                  pathname: "./profile",
                },
                undefined,
                { shallow: false }
              );
            }
          }
        }

        if (setLoading) {
          setLoading(false);
        }
      })
      .catch(function (err) {
        toast.error(err?.response?.data?.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);
      });
  };

  const patientUploadReports = (
    url,
    formData,
    setProgress,
    setLoading,
    setIsUpdated,
    setPatientRecentReports
  ) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, formData, {
        ...config,
        onUploadProgress: function (progressEvent) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          // if (setProgress) {
          //   setProgress(percentCompleted);
          // }
        },
      })
      .then((res) => {
        if (res.data.success) {
          setIsUpdated((prev) => [prev++]);
          if (setProgress) {
            setProgress("success");
          }
          setGetReportsData(res?.data?.data);
          setPatientRecentReports(getPatientRecentReports);
        }
      })
      .catch(function (err) {
        if (setProgress) {
          setProgress("failed");
        }

        if (setLoading) {
          setLoading(false);
        }
      });
  };

  const updatePatientProfile = (url, data, setLoading) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data, config)
      .then((res) => {
        if (res.data.success) {
          setPatientProfileData({ ...values, openBio: false });
        }
        if (setLoading) {
          setLoading(false);
        }
      })
      .catch(function (error) {
        if (setLoading) {
          setLoading(false);
        }
      });
  };

  // const getPatientReports = (url, setFile, setProgress) => {
  const getPatientReports = (url, setLoading) => {
    axios
      .get(`https://admin.ewtlive.in/api/${url}`, config)
      .then((res) => {
        // setFile([]);
        // setProgress(0);
        if (res.data.success) {
          setGetUploadedReports(res.data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const deleteUploadReport = (url, id, setShowFeedback) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, { report_id: id }, config)
      .then((res) => {
        setShowFeedback("success");
        if (res.data.success) {
        }
        if (setReportDeleting) {
          setReportDeleting({});
        }
      })
      .catch(function (err) {
        if (setShowFeedback) {
          setShowFeedback("failed");
        }
      });
  };

  const updateDoctorBio = (url, data, setValues, values, setLoading) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data, config)
      .then((res) => {
        if (res.data.success) {
          setValues({ ...values, openBio: false });
        }
        if (setLoading) {
          setLoading(false);
        }
      })
      .catch(function (error) {
        if (setLoading) {
          setLoading(false);
        }
      });
  };

  const docReviews = (url, data) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data, config)
      .then((res) => {
        if (res.data.success) {
          setDocReviewList(res.data.data);
        }
      })
      .catch(function (error) {});
  };

  const getPatientProfileData = (url, setLoading) => {
    axios
      .get(`https://admin.ewtlive.in/api/${url}`, config)
      .then((res) => {
        if (res.data.success) {
        }
      })
      .catch((err) => {});
  };

  const getDoctorDetails = (url, data, setLoading) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data, config)
      .then((res) => {
        if (res.data.success) {
          setDoctorDetails(res.data.data);
          setDoctorInfo({
            name: res.data.data.name,
            hospitals: res.data.data.hospitals.toString(),
          });
        }
        if (setLoading) {
          setLoading(false);
        }
      })
      .catch(function (error) {
        if (setLoading) {
          setLoading(false);
        }
      });
  };
  const getAppointmentAvailability = (url, data, setLoading) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data, config)
      .then((res) => {
        if (res.data.success) {
          setAppointmentAvailabilityList(res.data.data);
          //make appointment api call
          // axios
          //   .post(
          //     `https://admin.ewtlive.in/api/make-appointment-with-qr`,
          //     { appointment_id: res.data.data.appointment_id },
          //     config
          //   )
          //   .then((res) => {
          //     if (res.data.success) {
          //       setMakeAppointmentWithQrData(res.data.data);
          //     }
          //   });
        }
        if (setLoading) {
          setLoading(false);
        }
      })
      .catch(function (error) {
        if (setLoading) {
          setLoading(false);
        }
      });
  };

  const postTypeOfConsult = (url, formData) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, formData, config)
      .then((res) => {
        if (res.data.success) {
          setSendTypeOfConsultData(res.data);
          // router.push("./profile");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const updateDoctorAvailability = (url, data, setLoading) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data, config)
      .then((res) => {
        if (res.data.success) {
          setUpdateDoctorAvailabilityList(res.data.data);
        }
        if (setLoading) {
          setLoading(false);
        }
      })
      .catch(function (error) {
        if (setLoading) {
          setLoading(false);
        }
      });
  };

  const saveAppointment = (url, data, setLoading) => {
    setLoading(true);
    setAppointmentId((prev) => {
      data.appointment_id;
    });
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data, config)
      .then((res) => {
        if (res.data.success) {
          setSaveAppointmentData(res.data.data);
        }
        if (setLoading) {
          setLoading(false);
        }
      })
      .catch(function (error) {
        if (setLoading) {
          setLoading(false);
        }
      });
  };
  const selectedDiseaseSymptoms = (url, data, setLoading) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data, config)
      .then((res) => {
        if (res.data.success) {
          setGetDiseaseSypmtom(res.data.data);
        }
        if (setLoading) {
          setLoading(false);
        }
      })
      .catch(function (error) {
        if (setLoading) {
          setLoading(false);
        }
      });
  };

  const getAppointmentTiming = (url, data, setLoading) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data, config)
      .then((res) => {
        if (res.data.success) {
          setAppointmentTimingList(res.data.data);
        }
        if (setLoading) {
          setLoading(false);
        }
      })
      .catch(function (error) {
        if (setLoading) {
          setLoading(false);
        }
      });
  };
  const makeAppointmentWithQr = (url, data) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data, config)
      .then((res) => {
        if (res.data.success) {
          setMakeAppointmentWithQrData(res.data.data);
        }
      })
      .catch(function (error) {});
  };

  const doctorFilter = (url, data, setLoading) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data, config)
      .then((res) => {
        if (res.data.success) {
          setDoctorList(res.data);
        }
        if (setLoading) {
          setLoading(false);
        }
      })
      .catch(function (error) {
        if (setLoading) {
          setLoading(false);
        }
      });
  };

  const getPresetAnswer = (url, data, setLoading) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data, config)
      .then((res) => {
        if (res.data.success) {
          setGetPresetQuestionAnswer(res.data);
        }
        if (setLoading) {
          setLoading(false);
        }
      })
      .catch(function (error) {
        if (setLoading) {
          setLoading(false);
        }
      });
  };

  const patientAppointments = (url, data, setLoading) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data, config)
      .then((res) => {
        if (res.data.success) {
          setGetPatientAppointments(res.data.data);
        }
        if (setLoading) {
          setLoading(false);
        }
      })
      .catch(function (error) {
        if (setLoading) {
          setLoading(false);
        }
      });
  };

  const appointmentDetails = (url, data, setLoading) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data, config)
      .then((res) => {
        // if (res.data.success) {
        //   setGetAppointmentDetails(res.data);
        // }
        if (res.status === 200) {
          setGetAppointmentDetails(res.data.data);
        }
        if (setLoading) {
          setLoading(false);
        }
      })
      .catch(function (error) {
        if (setLoading) {
          setLoading(false);
        }
      });
  };

  const QuestionForPatient = (url, data, setLoading) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data, config)
      .then((res) => {
        if (res.data.success) {
          setPatientQuestion(res);
        }
      })
      .catch(function (error) {
        if (setLoading) {
        }
      });
  };

  const addQuestion = (url, data, setLoading) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data, config)
      .then((res) => {
        if (res.data.success) {
          setQuestionAdd(res);
        }
      })
      .catch(function (error) {
        if (setLoading) {
        }
      });
  };

  const addDoctorQuestion = (url, data, setLoading) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data, config)
      .then((res) => {
        if (res.data.success) {
          setAddNewDoctorQuestion(res.data);
        }
      })
      .catch(function (error) {
        if (setLoading) {
        }
      });
  };

  const deleteDoctorAddedQuestions = (url, data, setLoading) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data, config)
      .then((res) => {
        if (setLoading) {
          false;
        }
      })
      .catch(function (error) {
        if (setLoading) {
          false;
        }
      });
  };

  const pinVerifyForPatientDetails = (url, data, showError, setLoading) => {
    axios
      .post(`https://admin.ewtlive.in/api/${url}`, data, config)
      .then((res) => {
        if (res.data.success) {
          setGetPatientDetailsFromPin(res.data);
          // router.push("./patient-details");
          router.push({
            pathname: "./patient-details",
            query: { pid: res?.data?.data?.pateint?.id },
          });
        }
        if (setLoading) {
          setLoading(false);
        }
      })
      .catch(function (err) {
        if (err) {
          showError && showError(err?.response?.data?.message);
          if (setLoading) {
            setLoading(false);
          }
        }
      });
  };

  const context = {
    educationList: educationList,
    specialityList: specialityList,
    hospitalList: hospitalList,
    patientProfile: patientProfile,
    upComingAppointment: upComingAppointment,
    getPreviusCunsult: getPreviusCunsult,
    getPatientRecentReports: getPatientRecentReports,
    getMedicineTaken: getMedicineTaken,
    doctorProfile: doctorProfile,
    doctorList: doctorList,
    appointmentId: appointmentId,
    doctorDetails: doctorDetails,
    doctorSearch: doctorSearch,
    appointmentAvailabilityList: appointmentAvailabilityList,
    errorMsg: errorMsg,
    appointmentTimingList: appointmentTimingList,
    saveAppointmentData: saveAppointmentData,
    docReviewList: docReviewList,
    doctorInfo: doctorInfo,
    todaysAppointment: todaysAppointment,
    getHomePageData: getHomePageData,
    getHomeSliderData: getHomeSliderData,
    config: config,
    getReportsData: getReportsData,
    makeAppointmentWithQrData: makeAppointmentWithQrData,
    getUploadedReports: getUploadedReports,
    getPatientDetailsFromPin: getPatientDetailsFromPin,
    subscriptionList: subscriptionList,
    pageLoading: pageLoading,
    reportDeleted: reportDeleted,
    patientProfileData: patientProfileData,
    footerData: footerData,
    presetQuestions: presetQuestions,
    getDiseaseName: getDiseaseName,
    getSymptomName: getSymptomName,
    getDiseaseSypmtom: getDiseaseSypmtom,
    getDoctorAvailability: getDoctorAvailability,
    sendPresetQuestionAnswer: sendPresetQuestionAnswer,
    sendTypeOfConsultData: sendTypeOfConsultData,
    presetAnswer: presetAnswer,
    presetAnswerStatus: presetAnswerStatus,
    getPresetQuestionAnswer: getPresetQuestionAnswer,
    consultTypeData: consultTypeData,
    selectedHospitalList: selectedHospitalList,
    getSelectedHospitalAvalibility: getSelectedHospitalAvalibility,
    consultType: consultType,
    addNewDoctorQuestion: addNewDoctorQuestion,
    doctorTypeQuestion: doctorTypeQuestion,
    getPatientAppointments: getPatientAppointments,
    getAppointmentDetails: getAppointmentDetails,
    getApiData: getApiDataHandler,
    appointmentDetails: appointmentDetails,
    getPresetAnswer: getPresetAnswer,
    postAPI: postAPIhandler,
    sendOtp: onSendOtp,
    saveAppointment: saveAppointment,
    otpVerified: otpVerified,
    patientUploadReports: patientUploadReports,
    deleteUploadReport: deleteUploadReport,
    getPatientReports: getPatientReports,
    getPatientProfileData: getPatientProfileData,
    updateDoctorBio: updateDoctorBio,
    docReviews: docReviews,
    getDoctorDetails: getDoctorDetails,
    getAppointmentAvailability: getAppointmentAvailability,
    getPagesData: getPagesData,
    doctorFilter: doctorFilter,
    QuestionForPatient: QuestionForPatient,
    getAppointmentTiming: getAppointmentTiming,
    makeAppointmentWithQr: makeAppointmentWithQr,
    addQuestion: addQuestion,
    updatePatientProfile: updatePatientProfile,
    pinVerifyForPatientDetails: pinVerifyForPatientDetails,
    postPresetQuestion: postPresetQuestion,
    selectedDiseaseSymptoms: selectedDiseaseSymptoms,
    updateDoctorAvailability: updateDoctorAvailability,
    selectedDiseaseSymptoms: selectedDiseaseSymptoms,
    updateDoctorAvailability: updateDoctorAvailability,
    postPresetQuestion: postPresetQuestion,
    postTypeOfConsult: postTypeOfConsult,
    getConsultType: getConsultType,
    addDoctorQuestion: addDoctorQuestion,
    deleteDoctorAddedQuestions: deleteDoctorAddedQuestions,
    patientAppointments: patientAppointments,
  };

  return (
    <FetchDataContext.Provider value={context}>
      {props.children}
    </FetchDataContext.Provider>
  );
}

export default FetchDataContext;

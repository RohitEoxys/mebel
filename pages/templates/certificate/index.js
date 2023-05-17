import React from "react";
import Header from "@/components/reports/components/Header/Header";
import Footer from "@/components/reports/components/Footer/Footer";
import NameAndDetails from "@/components/reports/components/NameAndDetails/NameAndDetails";
import DocterAbout from "@/components/reports/components/Docterabout/DocterAbout";
import Certificate from "./Certificate/certificate";


const index = () => {
  return (
    <div>
      <Header />
      <NameAndDetails />
  <Certificate/>
      <DocterAbout />
      <Footer />
    </div>
  );
};

export default index;

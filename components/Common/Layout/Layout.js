import Footer from "./Footer/Footer";
import Header from "./Header/Header";

export const Layout = (props) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};

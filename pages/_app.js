import { useEffect } from "react";
import { Layout } from "@/components/Common/Layout/Layout";
import "@/styles/globals.css";
import "@/styles/CustomCalendar.scss";
import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
import { FetchDataContextProvider } from "@/store/api-Context";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.js");
  }, []);

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  return (
    <FetchDataContextProvider>
      <Layout>
        <Head>
          <title>Mebel Hospital</title>
          <meta name="description" content="Mebel Hospital" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Component {...pageProps} />
      </Layout>
    </FetchDataContextProvider>
  );
}

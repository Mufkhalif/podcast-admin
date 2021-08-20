import { createGlobalStyle, ThemeProvider } from "styled-components";
import "antd/dist/antd.css";
import "./style.css";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { Spin } from "antd";

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <Spin spinning={loading}> */}
        <Component {...pageProps} />
        {/* </Spin> */}
      </ThemeProvider>
    </>
  );
}

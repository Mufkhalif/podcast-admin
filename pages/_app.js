import { createGlobalStyle, ThemeProvider } from "styled-components";
import "antd/dist/antd.css";
import "./style.css";

const GlobalStyle = createGlobalStyle`
  /* body,*,h1,h2,h3 {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: #1F1D2B;
    font-family: poppins;
  }

  p {
    margin: 0;
    padding: 0;
    background:transparent;
  } */
`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

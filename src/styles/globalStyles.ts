import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "Raleway", sans-serif;
}

  svg {
    max-width: 24px;
    max-height: 24px;
  }
`;

export default GlobalStyle;

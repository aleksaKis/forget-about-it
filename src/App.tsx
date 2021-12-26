import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Main from "./common/main/Main";
import GlobalStyle from "./styles/globalStyles";
import { CustomTheme, darkTheme, lightTheme } from "./styles/theme";
import { selectTheme } from "./common/main/slice/reducer";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector(selectTheme);
  const selectedTheme: CustomTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <Router>
      <GlobalStyle />
      <ThemeProvider theme={selectedTheme}>
        <Main />
      </ThemeProvider>
    </Router>
  );
}

export default App;

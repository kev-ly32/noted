import React from "react";
import { Navbar, Footer } from "./components/AppBars";
import Landing from "./components/Landing";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffb74d",
    },
    secondary: {
      main: "#01579b",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
        <Landing />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;

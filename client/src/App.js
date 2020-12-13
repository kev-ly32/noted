import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Footer } from "./components/AppBars";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
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
      <Router>
        <div className="App">
          <Navbar />

          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/dashboard" exact component={Dashboard} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

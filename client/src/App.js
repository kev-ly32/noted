import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUserInfo(loggedInUser);
      setLoggedIn(true);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Navbar
            setLoggedIn={setLoggedIn}
            loggedIn={loggedIn}
            setUserInfo={setUserInfo}
            userInfo={userInfo}
          />

          <Switch>
            <Route path="/" exact>
              {loggedIn ? (
                <Redirect to="/dashboard" />
              ) : (
                <Landing setLoggedIn={setLoggedIn} setUserInfo={setUserInfo} />
              )}
            </Route>
            <Route path="/dashboard">
              {!loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Dashboard userInfo={userInfo} />
              )}
            </Route>
            <Route render={() => <Redirect to="/dashboard" />} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

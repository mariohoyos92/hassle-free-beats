import React from "react";

import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App/App.jsx";
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

import "./index.css";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#96031a",
    primary2Color: "#616161",
    primary3Color: "rgba(0, 0, 0, 0.87)",
    accent1Color: "#616161",
    pickerHeaderColor: "#ffffff",
    alternateTextColor: "rgba(255, 255, 255, 0.87)",
    clockCircleColor: "rgba(0, 0, 0, 0.26)"
  }
});

ReactDOM.render(
  <div className="container">
    <BrowserRouter>
    <ScrollToTop>
      <MuiThemeProvider muiTheme={muiTheme}>
        <App />
      </MuiThemeProvider>
      </ScrollToTop>
    </BrowserRouter>
  </div>,
  document.getElementById("root")
);

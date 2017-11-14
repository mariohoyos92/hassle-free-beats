import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./components/App/App.jsx";
import registerServiceWorker from "./registerServiceWorker";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator'

const muiTheme= getMuiTheme({
    palette: {
        "primary1Color": "#96031a",
        "primary2Color": "#616161",
        "primary3Color": "rgba(0, 0, 0, 0.87)",
        "accent1Color": "#616161",
        "pickerHeaderColor": "#ffffff",
        "alternateTextColor": "rgba(255, 255, 255, 0.87)",
        "clockCircleColor": "rgba(0, 0, 0, 0.26)",
    }
})

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();

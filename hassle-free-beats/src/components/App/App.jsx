import React, { Component } from "react";

import router from "../../router";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {router}
        <Footer />
      </div>
    );
  }
}

export default App;

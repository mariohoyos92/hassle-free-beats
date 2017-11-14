import React, { Component } from "react";

// IMPORT MODULES
import { Link } from "react-router-dom";
import FlatButton from "material-ui/FlatButton";

// IMPORT CSS
import "./Header.css";

class Header extends Component {
  // LIFESTYLE FUNCTIONS

  // CUSTOM FUNCS

  //RENDER
  render() {
    return (
      <div className="header">
        <div className="header-logo">
          <Link to="/">
            <img
              className="header-image"
              src="https://s3.us-east-2.amazonaws.com/hassle-free-beats-untagged-audio/header-logo.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="header-button">
          <FlatButton label="Home" />
          <FlatButton label="About Us" />
          <FlatButton label="Dashboard" />
          <FlatButton label="Contact" />
        </div>
      </div>
    );
  }
}
// MAPSTATE TO PROPS FOR REDUX
// function mapStateToProps(state){
//     return state
// }

//EXPORT COMPONENT
export default Header;
//REDUX
// export default connect(mapStateToProps, outputActions)();

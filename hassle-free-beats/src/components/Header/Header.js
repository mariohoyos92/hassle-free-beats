import React, { Component } from "react";

// IMPORT MODULES
import { Link } from "react-router-dom";
import FlatButton from "material-ui/FlatButton";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";

import LoginButton from "../LoginButton/LoginButton";

// IMPORT CSS
import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleDrawer = this.handleDrawer.bind(this);
  }
  // CUSTOM FUNCS
  handleDrawer() {
    this.setState({ open: !this.state.open });
  }
  // RENDER
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
        <i
          className="fa fa-bars hamburger"
          aria-hidden="true"
          style={{ color: "white" }}
          onClick={this.handleDrawer}
        />
        <Drawer
          open={this.state.open}
          docked={false}
          width="60%"
          className="header-drawer"
          onRequestChange={this.handleDrawer}
          containerStyle={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around"
          }}
        >
          <MenuItem onClick={this.handleDrawer}>
            <Link to="/">
              <FlatButton style={{ color: "black" }} label="Home" />
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleDrawer}>
            <Link to="/about">
              <FlatButton style={{ color: "black" }} label="About Us" />
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleDrawer}>
            <Link to="/FAQ">
              <FlatButton style={{ color: "black" }} label="FAQ" />
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleDrawer}>
            <Link to="contact">
              <FlatButton style={{ color: "black" }} label="Contact" />
            </Link>
          </MenuItem>
          <MenuItem>
            <LoginButton />
          </MenuItem>
        </Drawer>
        <div className="header-button">
          <Link to="/">
            <FlatButton style={{ color: "white" }} label="Home" />
          </Link>
          <Link to="/about">
            <FlatButton style={{ color: "white" }} label="About Us" />
          </Link>
          <Link to="/FAQ">
            <FlatButton style={{ color: "white" }} label="FAQ" />
          </Link>
          <Link to="contact">
            <FlatButton style={{ color: "white" }} label="Contact" />
          </Link>
          <LoginButton />{" "}
        </div>
      </div>
    );
  }
}

export default Header;

import React, { Component } from "react";

// IMPORT MODULES
import { Link, withRouter } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";

// IMPORT CSS
import "./Header.css";
import headerLogo from "../../assets/header-logo-min.jpg";

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
            <img className="header-image" src={headerLogo} alt="logo" />
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
            justifyContent: "flex-start",
            paddingTop: "10%"
          }}
        >
          <MenuItem onClick={this.handleDrawer}>
            <Link to="/">
              <FlatButton style={{ color: "black" }} label="Home" />
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleDrawer}>
            <HashLink to="/#about-us">
              <FlatButton style={{ color: "black" }} label="About Us" />
            </HashLink>
          </MenuItem>
          <MenuItem onClick={this.handleDrawer}>
            <HashLink to="/#faq">
              <FlatButton style={{ color: "black" }} label="FAQ" />
            </HashLink>
          </MenuItem>
          <MenuItem onClick={this.handleDrawer}>
            <HashLink to="/#contact">
              <FlatButton style={{ color: "black" }} label="Contact" />
            </HashLink>
          </MenuItem>
          <MenuItem>
            <HashLink to="/#musicStore">
              <RaisedButton
                primary={true && true}
                labelColor={"#fbfffe"}
                label={"Shop Now"}
                style={{ boxShadow: "none" }}
              />
            </HashLink>
          </MenuItem>
        </Drawer>
        <div className="header-button">
          <Link to="/">
            <FlatButton style={{ color: "white" }} label="Home" />
          </Link>
          <HashLink to="/#about-us">
            <FlatButton style={{ color: "white" }} label="About Us" />
          </HashLink>
          <HashLink to="/#faq">
            <FlatButton style={{ color: "white" }} label="FAQ" />
          </HashLink>
          <HashLink to="/#contact">
            <FlatButton style={{ color: "white" }} label="Contact" />
          </HashLink>
          <HashLink to="/#musicStore">
            <RaisedButton
              primary={true && true}
              labelColor={"#fbfffe"}
              label={"Shop Now"}
            />
          </HashLink>{" "}
        </div>
      </div>
    );
  }
}

export default withRouter(Header);

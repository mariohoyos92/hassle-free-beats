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
    console.log(this.props);
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
          <Link to="/about">
            <FlatButton style={{ color: "white" }} label="About Us" />
          </Link>
          <Link to="/FAQ">
            <FlatButton style={{ color: "white" }} label="FAQ" />
          </Link>
          <Link to="contact">
            <FlatButton style={{ color: "white" }} label="Contact" />
          </Link>
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

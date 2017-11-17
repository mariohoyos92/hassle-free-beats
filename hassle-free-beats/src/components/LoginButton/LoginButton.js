import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";

export default class LoginButton extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    window.location.href = "http://localhost:3001/api/login";
  }

  render() {
    return (
      <RaisedButton
        primary={true}
        labelColor={"#fbfffe"}
        label={"Log In"}
        onClick={() => this.handleLogin()}
      />
    );
  }
}

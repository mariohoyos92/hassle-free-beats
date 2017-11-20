import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";
import { withRouter } from "react-router-dom";

class LoginButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    axios.get("/api/logstatus").then(response => {
      console.log(response);
      if (response.data.passport) {
        this.setState({ loggedIn: true });
      }
    });
  }

  handleLogin() {
    if (!this.state.loggedIn) {
      window.location.href = "http://localhost:3001/api/login";
    } else {
      axios
        .get("/api/logout")
        .then(this.props.history.push("/"))
        .catch(console.log);
    }
  }

  render() {
    return (
      <RaisedButton
        primary={true}
        labelColor={"#fbfffe"}
        label={this.state.loggedIn ? "Log Out" : "Log In"}
        onClick={() => this.handleLogin()}
      />
    );
  }
}

export default withRouter(LoginButton);

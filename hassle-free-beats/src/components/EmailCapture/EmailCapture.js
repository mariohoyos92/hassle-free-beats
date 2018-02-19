import React, { Component } from "react";

import axios from "axios";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Card from "material-ui/Card";
import { HashLink as Link } from "react-router-hash-link";

import "./EmailCapture.css";

export default class EmailCapture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      sent: false,
      emailError: null
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validateEmail(this.state.email)) {
      axios
        .post("/api/submitEmail", {
          email: this.state.email
        })
        .then(response => {
          if (response.status === 200) {
            this.setState({ sent: true });
          }
        })
        .catch(console.log);
    }
    if (!this.validateEmail(this.state.email)) {
      this.setState({ emailError: "Please enter a valid email address" });
    } else {
      this.setState({ emailError: null });
    }
  }

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render() {
    let cardDisplay = this.state.sent ? (
      <div>
        <p>
          Thank you! We just sent your free beat to:<br />
          <br />
          {this.state.email}
          <br />
          <br />Please check your spam.
          <br />
          <br />
          <Link to="/#musicStore">
            <RaisedButton
              label="Quality Beats This Way"
              primary={true}
              style={{ marginBottom: "10px" }}
              onClick={() => this.props.handleEmailToggle()}
            />
          </Link>
        </p>
      </div>
    ) : (
      <div>
        <h1>Please Drop A Valid Email Below!</h1>
        <form className="contact-form">
          <TextField
            style={{ width: "90%" }}
            hintText={"john@gmail.com"}
            floatingLabelText="Your Email"
            onChange={this.handleEmail}
            value={this.state.email}
            errorText={this.state.emailError}
          />
          <br />
          <br />
          <RaisedButton
            primary={true}
            labelColor={"#fbfffe"}
            label={"SEND MY BEAT"}
            onClick={this.handleSubmit}
            style={{ marginBottom: "10px" }}
          />
          <br />
        </form>
        <p>
          We HATE spam so we promise to keep your email safe{" "}
          <i className="fa fa-lock" aria-hidden="true" />
        </p>
      </div>
    );
    return (
      <div className="email-modal">
        <Card className="contact-card">{cardDisplay}</Card>
      </div>
    );
  }
}

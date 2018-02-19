import React, { Component } from "react";

import axios from "axios";
import { HashLink as Link } from "react-router-hash-link";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Card from "material-ui/Card";

import "./Contact.css";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      subject: "",
      emailBody: "",
      sent: false,
      emailError: null,
      nameError: null,
      messageError: null
    };
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubject = this.handleSubject.bind(this);
    this.handleBody = this.handleBody.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateMessage = this.validateMessage.bind(this);
    this.validateName = this.validateName.bind(this);
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleSubject(event) {
    this.setState({ subject: event.target.value });
  }

  handleBody(event) {
    this.setState({ emailBody: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (
      this.validateEmail(this.state.email) &&
      this.validateName(this.state.name) &&
      this.validateMessage(this.state.emailBody)
    ) {
      axios
        .post("/api/contact", {
          name: this.state.name,
          email: this.state.email,
          subject: this.state.subject,
          emailBody: this.state.emailBody
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
    if (!this.validateMessage(this.state.emailBody)) {
      this.setState({
        messageError: "Please enter a message longer than 20 characters"
      });
    } else {
      this.setState({ messageError: null });
    }
    if (!this.validateName(this.state.name)) {
      this.setState({
        nameError: "Please enter a name"
      });
    } else {
      this.setState({
        nameError: null
      });
    }
  }

  validateMessage(message) {
    return message.length > 20;
  }

  validateName(name) {
    return name.length > 0;
  }

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render() {
    let cardDisplay = this.state.sent ? (
      <div>
        <p>
          Thank you for reaching out to us! We will be in touch at:<br />
          <br /> {this.state.email}
          <br />
          <br /> within 12-24 hours.
          <br />
          <br />
          <Link to="/#musicStore">
            <RaisedButton
              label="Quality Beats This Way"
              primary={true}
              style={{ marginBottom: "10px" }}
            />
          </Link>
        </p>
      </div>
    ) : (
      <div>
        <h1>Have a question? We have an answer!</h1>
        <form className="contact-form">
          <TextField
            hintText={`eg. "John Doe"`}
            floatingLabelText="Your Name"
            onChange={this.handleName}
            value={this.state.name}
            errorText={this.state.nameError}
          />
          <br />
          <TextField
            hintText={`eg. "johndoe@gmail.com"`}
            floatingLabelText="Your Email"
            onChange={this.handleEmail}
            value={this.state.email}
            errorText={this.state.emailError}
          />
          <br />
          <TextField
            hintText={`eg. "Question about hot beats"`}
            floatingLabelText="Email Subject"
            onChange={this.handleSubject}
            value={this.state.subject}
          />
          <br />
          <TextField
            hintText={`eg. "I love Hassle-Free-Beats"`}
            floatingLabelText="Your Message"
            multiLine={true}
            onChange={this.handleBody}
            value={this.state.emailBody}
            rows={1}
            errorText={this.state.messageError}
          />
          <br />
          <br />
          <RaisedButton
            primary={true}
            labelColor={"#fbfffe"}
            label={"SEND"}
            onClick={this.handleSubmit}
            style={{ marginBottom: "10px" }}
          />
          <br />
        </form>
        <p>
          Email:{" "}
          <a
            href="mailto:support@hasslefreebeats.com"
            style={{ color: "#F8AA15" }}
          >
            support@hasslefreebeats.com
          </a>
        </p>
      </div>
    );
    return (
      <div className="contact-container">
        <Card className="contact-card">{cardDisplay}</Card>
      </div>
    );
  }
}

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
      sent: false
    };
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubject = this.handleSubject.bind(this);
    this.handleBody = this.handleBody.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        <h1>HAVE A QUESTION? WE HAVE AN ANSWER!</h1>
        <form className="contact-form">
          <TextField
            hintText={`eg. "John Doe"`}
            floatingLabelText="Your Name (required)"
            onChange={this.handleName}
            value={this.state.name}
          />
          <br />
          <TextField
            hintText={`eg. "johndoe@gmail.com"`}
            floatingLabelText="Your Email (required)"
            onChange={this.handleEmail}
            value={this.state.email}
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

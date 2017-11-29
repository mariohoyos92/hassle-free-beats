import React, { Component } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { withRouter } from "react-router-dom";



const CURRENCY = "USD";

const fromDollarToCent = amount => amount * 100;

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.successPayment = this.successPayment.bind(this);
    this.errorPayment = this.errorPayment.bind(this);
    this.onToken = this.onToken.bind(this);
  }

  successPayment(data) {
    this.props.history.push("/success");
  }

  errorPayment(data) {
    alert("Payment Error");
  }

  onToken(amount, description) {
    return token =>
      axios
        .post("/api/charge", {
          description,
          source: token.id,
          currency: CURRENCY,
          amount: fromDollarToCent(amount)
        })
        .then(this.successPayment)
        .catch(this.errorPayment);
  }

  render() {
    const { name, description, amount } = this.props;
    return <StripeCheckout name={name} description={description} image="https://s3.us-east-2.amazonaws.com/hassle-free-beats-untagged-audio/header-logo.png" panelLabel="Buy Beats:" amount={fromDollarToCent(amount)} token={this.onToken(amount, description)} currency={CURRENCY} stripeKey={`pk_live_UAtbgRScKq81NMYFOpua52J9`} zipCode={true} />;
  }
}

export default withRouter(Checkout);

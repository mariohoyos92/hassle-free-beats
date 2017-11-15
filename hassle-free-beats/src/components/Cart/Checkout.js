import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

import { publishableKey } from "../../frontConfig";

const CURRENCY = "USD";

const fromDollarToCent = amount => amount * 100;

const successPayment = data => {
  console.log(data);
  alert("Payment Successful");
};

const errorPayment = data => {
  alert("Payment Error");
};

const onToken = (amount, description) => token =>
  axios
    .post("/api/charge", {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    description={description}
    image="https://s3.us-east-2.amazonaws.com/hassle-free-beats-untagged-audio/header-logo.png"
    panelLabel="Buy Beats:"
    amount={fromDollarToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={publishableKey}
    zipCode={true}
  />
);

export default Checkout;

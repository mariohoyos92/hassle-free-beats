import React, { Component } from "react";
import axios from "axios";
import IconButton from "material-ui/IconButton";

import Checkout from "../Cart/Checkout";
import LoginButton from "../LoginButton/LoginButton";

import "./CheckoutView.css";

export default class CheckoutView extends Component {
  constructor(props) {
    super(props);
    this.state = { cart: [] };

    this.handleDeleteFromCart = this.handleDeleteFromCart.bind(this);
  }

  componentDidMount() {
    axios.get("api/cart").then(response => {
      this.setState({
        cart: response.data.tracks
      });
    });
  }
  handleDeleteFromCart(track) {
    axios
      .delete(`/api/cart/${track}`)
      .then(response =>
        this.setState({
          cart: response.data.tracks
        })
      )
      .catch(console.log);
  }

  render() {
    let cartViewDisplay =
      this.state.cart.length > 0 ? (
        this.state.cart.map(track => {
          return (
            <div className="cart-item" key={track}>
              <p>
                {track}
                <IconButton
                  onClick={() => this.handleDeleteFromCart(track)}
                  iconClassName="fa fa-trash"
                  iconStyle={{
                    iconHoverColor: "#faa916"
                  }}
                  tooltip={"Delete From Cart"}
                  touch={true}
                  tooltipPosition="top-left"
                />
              </p>
            </div>
          );
        })
      ) : (
        <p>Your Cart is Empty </p>
      );

    return (
      <div className="checkout-container">
        <div className="login-option">
          <p>
            If you would like to be able to access the download links for this
            order and any in the future, Login/Register using the button below.
            We use Auth0 to verify that you are who you say you are, which keeps
            your sensitive information off of our servers so you can be sure
            that you are protected.
          </p>
          <LoginButton />
        </div>
        <div className="checkout-cart">
          <p>
            Verify that the contents of your car are accurate below, then click
            Pay With Card to check out securely using Stripe
          </p>
          {cartViewDisplay}
        </div>
        <Checkout
          name={"Hassle Free Beats"}
          description={"No Waiting, No Royalties, No Limits"}
          amount={10 * this.state.cart.length}
        />
      </div>
    );
  }
}

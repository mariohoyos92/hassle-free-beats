import React, { Component } from "react";
import axios from "axios";
import IconButton from "material-ui/IconButton";

import Checkout from "../Cart/Checkout";
import LoginButton from "../LoginButton/LoginButton";
import Divider from "material-ui/Divider";
import Card from "material-ui/Card";

import "./CheckoutView.css";

export default class CheckoutView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      loggedIn: false
    };

    this.handleDeleteFromCart = this.handleDeleteFromCart.bind(this);
  }

  componentDidMount() {
    axios.get("api/cart").then(response => {
      this.setState({
        cart: response.data.tracks
      });
    });

    axios.get("/api/logstatus").then(response => {
      if (response.data.passport) {
        this.setState({ loggedIn: true });
      }
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
            <div className="checkout-view-cart" key={track}>
              <div className="checkout-view-cart-left">
                <p>
                  {track}
                  <IconButton
                    onClick={() => this.handleDeleteFromCart(track)}
                    iconClassName="fa fa-trash"
                    iconStyle={{ iconHoverColor: "#faa916" }}
                    tooltip={"Delete From Cart"}
                    touch={true}
                    tooltipPosition="bottom-right"
                  />
                </p>
              </div>
              <div className="checkout-view-cart-right">
                <span style={{ "font-weight": "bold" }}>$10.00</span>
              </div>
            </div>
          );
        })
      ) : (
        <p>Your Cart is Empty </p>
      );

    let loginView = this.state.loggedIn ? (
      <div>
        <h1>You're logged in.</h1>
        <p>
          Upon your purchase, we will save the download links to your account so
          that you can download your instrumentals again in the future if you
          need to.
        </p>
      </div>
    ) : (
      <div>
        <h1> Login </h1>
        <Divider />
        <p className="login-paragraph">
          If you would like to be able to access the download links for this
          order and any in the future, please Login/Register using the button
          below.
        </p>
        <LoginButton />
        <br />
        <br />
        <br />
        <span>
          ** Protected with{" "}
          <a
            href="https://auth0.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://s3.us-east-2.amazonaws.com/hassle-free-beats-untagged-audio/logo-100-grey.png"
              alt="auth0 logo"
              className="auth0logo"
            />
          </a>{" "}
          **
        </span>
      </div>
    );

    return (
      <div className="checkout-container">
        <div className="login-option">
          <Card className="checkout-card">{loginView}</Card>
        </div>
        <div className="checkout-cart">
          <Card className="checkout-card">
            <h1> Checkout </h1>
            <Divider />
            {cartViewDisplay}
            <Divider />
            <div
              style={{
                "text-align": "right",
                "font-weight": "bold",
                marginBottom: "20px"
              }}
            >
              Total: ${this.state.cart.length * 10}.00
            </div>
            <Checkout
              name={"Hassle Free Beats"}
              description={"No Waiting, No Royalties, No Limits"}
              amount={10 * this.state.cart.length}
            />
            <br />
            <br />
            <br />
            <span>
              ** Protected with{" "}
              <a
                href="https://stripe.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-cc-stripe" aria-hidden="true" />
              </a>{" "}
              **
            </span>
          </Card>
        </div>
      </div>
    );
  }
}

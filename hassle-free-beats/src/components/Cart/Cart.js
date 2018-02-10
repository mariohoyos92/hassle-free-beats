import React, { Component } from "react";

// IMPORT MODULES
import axios from "axios";
import IconButton from "material-ui/IconButton";
import Divider from "material-ui/Divider";

// IMPORT COMPONENTS

// IMPORT CSS
import "./Cart.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };

    // BIND FUNCTIONS HERE
    this.handleDeleteFromCart = this.handleDeleteFromCart.bind(this);
  }

  // LIFESTYLE FUNCTIONS
  componentDidMount() {
    axios.get("api/cart").then(response => {
      this.setState({ cart: response.data.tracks });
    });
  }

  // CUSTOM FUNCS
  handleDeleteFromCart(track) {
    axios
      .delete(`/api/cart/${track}`)
      .then(response => this.setState({ cart: response.data.tracks }))
      .catch(console.log);
  }

  // RENDER
  render() {
    let cartDisplay =
      this.state.cart && this.state.cart.length > 0 ? (
        this.state.cart.map(track => {
          return (
            <div className="cart-item" key={track}>
              <div className="cart-left">
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
              <div className="cart-right">
                <span className="struck">$50.00  {"  "}</span><span style={{ fontWeight: "bold" }}>$25.00</span>
              </div>
            </div>
          );
        })
      ) : (
        <p>Your Cart is Empty </p>
      );
    return (
      <div>
        <div>{cartDisplay}</div>
        <Divider />
        <div
          style={{
            textAlign: "right",
            fontWeight: "bold"
          }}
        >
          Total: ${this.state.cart.length * 25}.00
        </div>
      </div>
    );
  }
}

export default Cart;

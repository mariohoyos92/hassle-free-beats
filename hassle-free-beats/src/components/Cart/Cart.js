import React, { Component } from "react";
import IconButton from "material-ui/IconButton";
import axios from "axios";

// IMPORT MODULES

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

  //   LIFESTYLE FUNCTIONS
  componentDidMount() {
    axios.get("api/cart").then(response => {
      this.setState({ cart: response.data.tracks });
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ cart: nextProps.cart });
  // }

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
                <span style={{ "font-weight": "bold" }}>$10.00</span>
              </p>
            </div>
          );
        })
      ) : (
        <p>Your Cart is Empty </p>
      );
    return (
      <div>
        <div>{cartDisplay}</div>
        <div
          style={{
            "text-align": "right",
            "font-weight": "bold"
          }}
        >
          Total: ${this.state.cart.length * 10}.00
        </div>
      </div>
    );
  }
}
// MAPSTATE TO PROPS FOR REDUX
// function mapStateToProps(state){
//     return state
// }

// EXPORT COMPONENT
export default Cart;
// REDUX
// export default connect(mapStateToProps, outputActions)();

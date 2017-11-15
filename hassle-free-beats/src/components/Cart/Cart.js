import React, { Component } from "react";

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
  }

  //   LIFESTYLE FUNCTIONS
  componentWillReceiveProps(nextProps) {
    this.setState({ cart: nextProps.cart });
  }

  // CUSTOM FUNCS

  // RENDER
  render() {
    console.log(this.props);

    let cartDisplay =
      this.state.cart.length > 0 ? (
        this.state.cart.map(track => {
          return <p key={Math.random()}>{track}</p>;
        })
      ) : (
        <p>Your Cart is Empty </p>
      );
    return <div>{cartDisplay}</div>;
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

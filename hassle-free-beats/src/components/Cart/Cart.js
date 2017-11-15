import React, { Component } from "react";
import IconButton from "material-ui/IconButton";

// IMPORT MODULES

// IMPORT COMPONENTS
import Checkout from "./Checkout";

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
    let cartDisplay =
      this.state.cart.length > 0 ? (
        this.state.cart.map(track => {
          return (
            <div className="cart-item">
              <p key={Math.random()}>{track}</p>
              <IconButton
                iconClassName="fa fa-trash"
                iconStyle={{ iconHoverColor: "#faa916" }}
                tooltip={"Delete From Cart"}
                touch={true}
                tooltipPosition="top-left"
              />
            </div>
          );
        })
      ) : (
        <p>Your Cart is Empty </p>
      );
    return (
      <div>
        <div>{cartDisplay}</div>
        <Checkout
          name={"Hassle Free Beats"}
          description={"No Waiting, No Royalties, No Limits"}
          amount={10 * this.state.cart.length}
        />
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

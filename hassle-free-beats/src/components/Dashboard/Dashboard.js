import React, { Component } from "react";

// IMPORT MODULES
import axios from "axios";
import Card from "material-ui/Card";
import Divider from "material-ui/Divider";
import Checkout from "../Cart/Checkout";
import IconButton from "material-ui/IconButton";
import LoginButton from "../LoginButton/LoginButton";
import { HashLink as Link } from "react-router-hash-link";

// IMPORT COMPONENTS

// IMPORT CSS
import "./Dashboard.css";
import { RaisedButton } from "material-ui";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pastPurchases: [],
      cart: []
    };
  }
  // LIFESTYLE FUNCTIONS

  componentDidMount() {
    axios
      .get("/api/pastpurchases")
      .then(response => this.setState({ pastPurchases: response.data }))
      .catch(console.log);

    axios.get("api/cart").then(response => {
      this.setState({ cart: response.data.tracks });
    });
  }

  // CUSTOM FUNCS

  // RENDER
  render() {
    const pastPurchases =
      this.state.pastPurchases.length > 0 ? (
        <div>
          <h1>Welcome Back!</h1>
          <Divider />
          <p className="login-paragraph">
            If you would like to redownload an instrumental click the
            corresponding link below!
            <br />
            <br />
            {this.state.pastPurchases.map(track => (
              <div key={track.title}>
                <a className="past-purchase-link" href={track.url} download>
                  {track.title}
                </a>
              </div>
            ))}
          </p>
          <LoginButton />
          <br />
          <br />
          <br />
        </div>
      ) : (
        <div>
          <h1>Welcome!</h1>
          <p>
            Thank you for joining our team of creators! It doesn't look like you
            have purchased any instrumentals yet. To start creating, click the
            button below and go check out our beats!
          </p>
          <Link to="/#musicStore">
            <RaisedButton label="Quality Beats This Way" primary={true} />
          </Link>
        </div>
      );

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
                <span style={{ fontWeight: "bold" }}>$10.00</span>
              </div>
            </div>
          );
        })
      ) : (
        <p>Your Cart is Empty </p>
      );

    return (
      <div className="dashboard-container">
        <div className="login-option">
          <Card className="checkout-card">{pastPurchases}</Card>
        </div>
        <div className="checkout-cart">
          <Card className="checkout-card">
            <h1> Checkout </h1>
            <Divider />
            {cartViewDisplay}
            <Divider />
            <div
              style={{
                textAlign: "right",
                fontWeight: "bold",
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
// MAPSTATE TO PROPS FOR REDUX
// function mapStateToProps(state){
//     return state
// }

// EXPORT COMPONENT

export default Dashboard;
// REDUX

// export default connect(mapStateToProps, outputActions)();

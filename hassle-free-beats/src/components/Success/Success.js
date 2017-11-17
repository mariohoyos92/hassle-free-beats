import React, { Component } from "react";

// IMPORT MODULES
import axios from "axios";

// IMPORT COMPONENTS

// IMPORT CSS
import "./Success.css";

class Success extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchases: []
    };
  }
  // LIFESTYLE FUNCTIONS
  componentDidMount() {
    axios
      .get("/api/purchases")
      .then(response => {
        console.log(response);
        this.setState({ purchases: response.data }, () =>
          console.log(this.state)
        );
      })
      .catch(console.log);
  }

  // CUSTOM FUNCS

  // RENDER
  render() {
    const purchaseLinks = this.state.purchases.map(track => (
      <div key={track.title}>
        <a href={track.url} download>
          {track.title}
        </a>
      </div>
    ));
    return (
      <div className="success-container">
        <div>Hello there</div>
        <p>Please click the links below to download your beats!</p>
        <div>{purchaseLinks}</div>
      </div>
    );
  }
}
// MAPSTATE TO PROPS FOR REDUX
// function mapStateToProps(state){
//     return state
// }

// EXPORT COMPONENT

export default Success;
// REDUX

// export default connect(mapStateToProps, outputActions)();

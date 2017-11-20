import React, { Component } from "react";

// IMPORT MODULES
import axios from "axios";

// IMPORT COMPONENTS

// IMPORT CSS
import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pastPurchases: []
    };
  }
  // LIFESTYLE FUNCTIONS

  componentDidMount() {
    axios
      .get("/api/pastpurchases")
      .then(response => this.setState({ pastPurchases: response.data }))
      .catch(console.log);
  }

  // CUSTOM FUNCS

  // RENDER
  render() {
    const pastPurchases = this.state.pastPurchases.map(track => (
      <div key={track.title}>
        <a href={track.url} download>
          {track.title}
        </a>
      </div>
    ));
    return (
      <div className="dashboard-container">
        <div>Hello there</div>
        <p>
          {" "}
          Thank you for returning! If you would like to redownload the songs you
          have purchased in the past, just click the links below!{" "}
        </p>
        {pastPurchases}
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

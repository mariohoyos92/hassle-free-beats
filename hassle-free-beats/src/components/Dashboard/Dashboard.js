import React, { Component } from "react";
import axios from "axios";

// IMPORT MODULES

// IMPORT COMPONENTS

// IMPORT CSS
import "./Dashboard.css";

class Dashboard extends Component {
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
        this.setState({ purchases: response.data });
      })
      .catch(console.log);
  }

  // CUSTOM FUNCS

  // RENDER
  render() {
    return <div>Hello there</div>;
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

import React, { Component } from "react";

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

  // CUSTOM FUNCS

  // RENDER
  render() {
    return (
      <div className="dashboard-container">
        <div>Hello there</div>
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

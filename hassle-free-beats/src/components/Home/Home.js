import React, { Component } from "react";

// IMPORT MODULES

import MusicPlayer from "react-responsive-music-player";

// IMPORT COMPONENTS

// IMPORT CSS
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    window.location.href = "http://localhost:3001/api/login";
  }

  // RENDER
  render() {
    return (
      <div>
        <button onClick={() => this.handleLogin()}> Log In </button>
        <MusicPlayer
          playlist={[
            {
              url: "http://fakeurl.mp3",
              cover: "path/to/jpg",
              title: "Despacito",
              artist: ["Luis Fonsi", "Daddy Yankee"]
            }
          ]}
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
export default Home;
// REDUX
// export default connect(mapStateToProps, outputActions)();

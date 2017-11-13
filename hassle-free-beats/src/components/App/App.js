import React, { Component } from "react";
import "./App.css";
import MusicPlayer from "react-responsive-music-player";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    window.location.href = "http://localhost:3001/api/login";
  }

  render() {
    return (
      <div className="App">
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

export default App;

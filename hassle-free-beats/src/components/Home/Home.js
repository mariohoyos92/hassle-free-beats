import React, { Component } from "react";

// IMPORT MODULES
import RaisedButton from "material-ui/RaisedButton";
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
        <MusicPlayer
          playlist={[
            {
              url:
                "https://s3.us-east-2.amazonaws.com/hassle-free-beats-untagged-audio/LANDR-Say+You+Want+Me+take+3.mp3",
              cover:
                "https://s3.us-east-2.amazonaws.com/hassle-free-beats-untagged-audio/fullsizeoutput_2.jpeg",
              title: "Say You Want Me",
              artist: ["Mario, an Organism", "Liz Ancel"]
            },
            {
              url:
                "https://s3.us-east-2.amazonaws.com/hassle-free-beats-untagged-audio/beat+10+sample.wav",
              cover:
                "https://s3.us-east-2.amazonaws.com/hassle-free-beats-untagged-audio/fullsizeoutput_2.jpeg",
              title: "Grungy Tech",
              artist: ["Mario, an Organism"]
            }
          ]}
          color={"#6d676e"}
          btnColor={"#96031a"}
        />
        <RaisedButton
          primary={true}
          labelColor={"#fbfffe"}
          label={"Log In"}
          onClick={() => this.handleLogin()}
        />
        <p>this is a test to look at the font </p>
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

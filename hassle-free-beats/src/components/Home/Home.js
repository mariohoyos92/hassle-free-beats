import React, { Component } from "react";

// IMPORT MODULES
import RaisedButton from "material-ui/RaisedButton";
import MusicPlayer from "react-responsive-music-player";
import axios from "axios";

// IMPORT COMPONENTS
import Header from "../Header/Header";
import Cart from "../Cart/Cart";

// IMPORT CSS
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlist: [],
      cart: []
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    axios.get("api/cart").then(response => {
      console.log(response);
      this.setState({ cart: response.data.tracks });
    });
  }

  handleLogin() {
    window.location.href = "http://localhost:3001/api/login";
  }

  handleAddToCart() {
    const title = document.getElementsByClassName("title")[0].innerHTML;
    const track = {
      title
    };
    axios
      .post("/api/cart", track)
      .then(response => {
        console.log(response);
        this.setState({ cart: response.data.tracks });
      })
      .catch(console.log);
  }

  // RENDER
  render() {
    return (
      <div>
        <Header />
        <div className="splash">
          <div className="splash-logo">
            <img
              className="logo"
              src="https://s3.us-east-2.amazonaws.com/hassle-free-beats-untagged-audio/HassleFreeBeats.png"
              alt="logo"
            />
          </div>
        </div>
        <Cart cart={this.state.cart} />
        <MusicPlayer
          playlist={[
            {
              url:
                "https://s3.us-east-2.amazonaws.com/hassle-free-beats-untagged-audio/LANDR-Say+You+Want+Me+take+3.mp3",
              cover:
                "https://s3.us-east-2.amazonaws.com/hassle-free-beats-untagged-audio/header-logo.png",
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
            },
            {
              url:
                "http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3",
              cover:
                "http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg",
              title: "Despacito",
              artist: ["Luis Fonsi", "Daddy Yankee"]
            },
            {
              url:
                "http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3",
              cover:
                "http://res.cloudinary.com/alick/image/upload/v1502375978/bedtime_stories_bywggz.jpg",
              title: "Bedtime Stories",
              artist: ["Jay Chou"]
            },
            {
              url:
                "http://res.cloudinary.com/alick/video/upload/v1502444212/Actor_ud8ccw.mp3",
              cover:
                "http://res.cloudinary.com/alick/image/upload/v1502444304/actor_umzdur.jpg",
              title: "演员",
              artist: ["薛之谦"]
            },
            {
              url:
                "http://res.cloudinary.com/alick/video/upload/v1502444215/Bridge_of_Fate_aaksg1.mp3",
              cover:
                "http://res.cloudinary.com/alick/image/upload/v1502444306/Bridge_of_Fate_o36rem.jpg",
              title: "Bridge of Fate",
              artist: ["王力宏", "谭维维"]
            },
            {
              url:
                "http://res.cloudinary.com/alick/video/upload/v1502444222/Goodbye_byaom5.mp3",
              cover:
                "http://res.cloudinary.com/alick/image/upload/v1502444310/Goodbye_hpubmk.jpg",
              title: "Goodbye",
              artist: ["G.E.M."]
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
        />{" "}
        <RaisedButton
          primary={true}
          labelColor={"#fbfffe"}
          label={"Add To Cart"}
          onClick={() => this.handleAddToCart()}
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

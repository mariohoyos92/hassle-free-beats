import React, { Component } from "react";

// IMPORT MODULES
import RaisedButton from "material-ui/RaisedButton";
import MusicPlayer from "react-responsive-music-player";
import axios from "axios";
import { Link } from "react-router-dom";

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

    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    axios.get("/api/beats").then(response => {
      let playlist = [];
      response.data.forEach(element => {
        playlist.push({
          url: element.url,
          artist: [element.artist],
          cover: element.cover,
          title: element.title
        });
      });
      this.setState({ playlist: playlist }, () => console.log(this.state));
    });
    axios.get("api/cart").then(response => {
      this.setState({ cart: response.data.tracks });
    });
  }

  handleAddToCart() {
    const title = document.getElementsByClassName("title")[0].innerHTML;
    const track = {
      title
    };
    axios
      .post("/api/cart", track)
      .then(response => {
        this.setState({ cart: response.data.tracks });
      })
      .catch(() => alert("This beat is already in your cart!"));
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
        <MusicPlayer
          playlist={
            this.state.playlist.length > 0
              ? this.state.playlist
              : [
                  {
                    id: 1,
                    url: `https://s3.us-east-2.amazonaws.com/hassle-free-beats-untagged-audio/LANDR-Say+You+Want+Me+take+3.mp3`,
                    cover: `https://s3.us-east-2.amazonaws.com/hassle-free-beats-untagged-audio/header-logo.png`,
                    title: "Say You Want Me",
                    artist: ["Mario, an Organism", "Liz Ancel"]
                  }
                ]
          }
          progressColor={"#96031a"}
        />
        <RaisedButton
          primary={true}
          labelColor={"#fbfffe"}
          label={"Add To Cart"}
          onClick={() => this.handleAddToCart()}
        />{" "}
        <Link to="/checkout">
          <RaisedButton
            primary={true}
            labelColor={"#fbfffe"}
            label={"CHECKOUT"}
          />
        </Link>
        <Cart cart={this.state.cart} />
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

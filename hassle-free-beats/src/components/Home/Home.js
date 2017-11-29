import React, { Component } from "react";

// IMPORT MODULES
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import axios from "axios";
import { Link } from "react-router-dom";

// IMPORT COMPONENTS
import Header from "../Header/Header";
import MusicStore from "../MusicStore/MusicStore";
import Testimonials from "../Testimonials/Testimonials";

// IMPORT CSS
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlist: []
    };
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
      this.setState({ playlist: playlist });
    });
    axios.get("api/cart").then(response => {
      this.setState({ cart: response.data.tracks });
    });
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
        <div className="music-store" id="musicStore">
          <h1 style={{ color: "white", fontSize: "2.5em", fontWeight: "bold" }}>
            BEAT STORE
          </h1>
          <MusicStore
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
          />
          <p className="vocal-tag-disclaimer">
            **Vocal Tags Are Removed Automatically Upon Purchase**
          </p>
        </div>
        <div className="licensing-card-container" id="license">
          <Paper
            style={{
              height: "auto",
              width: "60%",
              margin: "20",
              textAlign: "center",
              zIndex: "5",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
            zDepth={5}
          >
            <h1 className="license-header">Hassle-Free-License</h1>
            <Divider className="license-divide" />
            <p>Mp3 (320 kbps)</p>
            <Divider className="license-divide" />
            <p>100% Royalty-Free</p>
            <Divider className="license-divide" />
            <p>No Restrictions on Youtube use</p>
            <Divider className="license-divide" />
            <p>No Expiration Date</p>
            <Divider className="license-divide" />
            <p>No Exclusive Rights</p>
            <Divider className="license-divide" />
            <p>UNLIMITED Radio Spins</p>
            <Divider className="license-divide" />
            <p>UNLIMITED Performances</p>
            <Divider className="license-divide" />
            <p>UNLIMITED Total Earnings Allowed</p>
            <Divider className="license-divide" />
            <p>INSTANT Download</p>
            <Divider className="license-divide" />
            <p />
          </Paper>
        </div>
        <div className="home-testimonials" id="testimonials">
          <h1 className="testimonial-header">
            {" "}
            What Our <span style={{ color: "#FAA916" }}>Friends</span> Have To
            Say{" "}
          </h1>
          <Testimonials />
        </div>
        <div className="bottom-portion info">
          <div className="faq-contact  info bottom-portion">
            <span>
              If you have ANY questions at all check out our{" "}
              <Link to="/faq" className="home-bottom-link">
                FAQ
              </Link>{" "}
              or{" "}
              <Link to="/contact" className="home-bottom-link">
                hit us up
              </Link>!
            </span>
          </div>
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
export default Home;
// REDUX
// export default connect(mapStateToProps, outputActions)();

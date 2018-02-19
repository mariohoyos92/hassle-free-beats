import React, { Component } from "react";

// IMPORT MODULES
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import axios from "axios";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";

// IMPORT COMPONENTS
import Header from "../Header/Header";
import MusicStore from "../MusicStore/MusicStore";
import Testimonials from "../Testimonials/Testimonials";
import EmailCapture from "../EmailCapture/EmailCapture";
import FAQ from "../FAQ/FAQ";
import About from "../About/About";
import Contact from "../Contact/Contact";

// IMPORT CSS
import "./Home.css";
import splashLogo from "../../assets/HassleFreeBeats (2).png";
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlist: [],
      emailModalOpen: false
    };
    this.handleEmailModalToggle = this.handleEmailModalToggle.bind(this);
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
    axios
      .get("api/cart")
      .then(response => {
        this.setState({ cart: response.data.tracks });
      })
      .catch(console.log);
  }

  handleEmailModalToggle() {
    this.setState({
      emailModalOpen: !this.state.emailModalOpen
    });
  }

  // RENDER
  render() {
    return (
      <div>
        <Header />
        <div className="splash">
          <div className="splash-logo">
            <img className="logo" src={splashLogo} alt="logo" />
          </div>
        </div>
        <div className="call-to-action">
          <h2>
            Test out our immediate delivery by letting us send you a FREE beat!
          </h2>
          <RaisedButton
            onClick={this.handleEmailModalToggle}
            label={"Send Me a Free Beat"}
            primary={true}
          />
          <Dialog
            modal={false}
            open={this.state.emailModalOpen}
            onRequestClose={this.handleEmailModalToggle}
          >
            <EmailCapture handleEmailToggle={this.handleEmailModalToggle} />
          </Dialog>
          {
            //  <h1 className="mobile">Sound too good to be true?</h1>
            // <a
            //   className="download-link mobile"
            //   href="https://s3.us-east-2.amazonaws.com/hassle-free-beats-untagged-audio/Untagged+Mastered+Beats+Ready+For+Website/Motherland+-+Alt-Rap.mp3"
            //   download
            // >
            //   <h3 className="mobile">Here, have a free beat.</h3>
            // </a>
            // <h3 className="mobile">Easy enough, right?</h3>
            // <h3 className="mobile">
            //   Want to be free to create AND maximize your profits?
            // </h3>
            // <RaisedButton
            //   primary={true && true}
            //   labelColor={"#fbfffe"}
            //   label={"Shop Now"}
            //   onClick={() => scrollToComponent(this.Store)}
            //   style={{ marginBottom: "20%" }}
            // />
          }
        </div>
        <div
          className="music-store"
          id="musicStore"
          ref={div => {
            this.Store = div;
          }}
        >
          <h1 className="beat-store-headers">BEAT STORE</h1>
          {
            // <h1 className="beat-store-headers promotion">
            //   *** 50% OFF ALL BEATS FOR VALENTINE'S DAY BECAUSE WE{" "}
            //   <span style={{ color: "#96031a" }}>❤</span> YOU ***
            // </h1>
          }
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
            **Beats available for download without vocal tags via email and via
            website immediately upon purchase**
          </p>
        </div>
        <About />
        <FAQ />
        <div className="licensing-card-container" id="license">
          <Paper
            style={{
              height: "auto",
              width: "70%",
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
            <h1 className="license-header">Our Hassle-Free-License</h1>
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
            <p />
          </Paper>
        </div>
        <Contact />
        {
          // <div className="home-testimonials" id="testimonials">
          //   <h1 className="testimonial-header">
          //     {" "}
          //     What Our <span style={{ color: "#FAA916" }}>Friends</span> Have To
          //     Say{" "}
          //   </h1>
          //   <Testimonials />
          // </div>
        }
        <div className="bottom-portion info">
          <div className="faq-contact  info bottom-portion">
            <span>
              Questions? Check out our{" "}
              <Link to="/faq" className="home-bottom-link">
                FAQ
              </Link>{" "}
              or{" "}
              <Link to="/contact" className="home-bottom-link">
                contact us
              </Link>!
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

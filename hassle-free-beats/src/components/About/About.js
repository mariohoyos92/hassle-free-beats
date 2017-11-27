import React, { Component } from "react";

// IMPORT MODULES
import { HashLink as Link } from "react-router-hash-link";
// IMPORT COMPONENTS

// IMPORT CSS
import "./About.css";

class About extends Component {
  render() {
    return (
      <div className="about-container">
        <img
          className="about-logo"
          src="https://s3.us-east-2.amazonaws.com/hassle-free-beats-untagged-audio/fullsizeoutput_b.jpeg"
          alt="logo"
        />
        <h1>We Exist To Let You Be Creative</h1>
        <p className="about-blurb">
          Hassle-Free-Beats, founded in 2015, was created with the vision of
          allowing artists to channel their full creativity without worrying
          about license terms and other legal issues. Our founders realized that
          every time they wanted to purchase an instrumental they had to waste
          time reading through different licensing terms and trying to find{" "}
          <Link className="about-blurb-link" to="/#musicStore">
            quality beats at a reasonable price
          </Link>, so they set out to change that. Our production team enjoys
          what they do, and it shows in the quality instrumentals that they
          craft. Whether you are looking for Rap, RnB, Hip-Hop, or anything
          else, our years of production allow us to meet all of your production
          needs. We pride ourselves on making quality beats accessible to any
          and everybody by providing a low price tag,{" "}
          <Link className="about-blurb-link" to="/#license">
            a single non-restrictive license
          </Link>, and a quality sound.{" "}
          <Link className="about-blurb-link" to="/#testimonials">
            Check out what some of our customers have to say!
          </Link>{" "}
        </p>
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
    );
  }
}
// MAPSTATE TO PROPS FOR REDUX
// function mapStateToProps(state){
//     return state
// }

// EXPORT COMPONENT
export default About;
// REDUX
// export default connect(mapStateToProps, outputActions)();

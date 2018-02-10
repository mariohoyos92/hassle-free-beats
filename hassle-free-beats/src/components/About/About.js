import React, { Component } from "react";

// IMPORT MODULES
import { HashLink as Link } from "react-router-hash-link";

// IMPORT COMPONENTS

// IMPORT CSS
import "./About.css";
import aboutLogo from '../../assets/fullsizeoutput_b.jpeg'

class About extends Component {
  render() {
    return (
      <div className="about-container">
        <img
          className="about-logo"
          src={aboutLogo}
          alt="logo"
        />
        <h1>We Exist To Let You Be Creative</h1>
        <p className="about-blurb">
          Hassle-Free-Beats was created with the vision of allowing artists to
          channel their full creativity without worrying about license terms and
          other legal issues. Our founders realized that every time they wanted
          to purchase an instrumental they had to waste time reading through
          different licensing terms and trying to find{" "}
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
        <div className="additional-info">
          <div className="about-us-triplet">
            <i className="fa fa-cc-stripe triplet" aria-hidden="true" />
            <h3 style={{ color: "#faa916" }}>Secure Payment</h3>
            <p>
              We use Stripe to handle our payments so that you can be sure your
              financial information is secure
            </p>
          </div>
          <div className="about-us-triplet">
            <i className="fa fa-download triplet" aria-hidden="true" />
            <h3 style={{ color: "#faa916" }}>Instant Download</h3>
            <p>
              Immediately after processing your payment you will be redirected
              to a page with your download links so that you can begin creating
              NOW!
            </p>
          </div>
          <div className="about-us-triplet">
            <i className="fa fa-music triplet" aria-hidden="true" />
            <h3 style={{ color: "#faa916" }}>Quality Music</h3>
            <p>
              Our team of producers uses the latest in production techniques to
              ensure that you are receiving quality instrumentals that are ready
              for your recordings.
            </p>
          </div>
        </div>
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

export default About;

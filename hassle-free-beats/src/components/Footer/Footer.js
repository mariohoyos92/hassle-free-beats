import React from "react";
import { HashLink as Link } from "react-router-hash-link";

import "../Footer/Footer.css";

export default Footer => {
  return (
    <div className="footer-container">
      <span className="copyright">
        Copyright <i className="fa fa-copyright" aria-hidden="true" /> 2017
        Hassle-Free-Beats, LLC.{"  "}
      </span>
      <span className="footer-span">
        |{" "}
        <Link
          to="/faq"
          className="footer-link"
          style={{ textDecoration: "none" }}
        >
          F.A.Q{" "}
        </Link>|<Link
          to="/about"
          className="footer-link"
          style={{ textDecoration: "none" }}
        >
          About Us{" "}
        </Link>|{" "}
        <Link
          to="/#license"
          className="footer-link"
          style={{ textDecoration: "none" }}
        >
          Hassle-Free-License{" "}
        </Link>|{" "}
        {
          // <Link
          //   to="/#testimonials"
          //   className="footer-link"
          //   style={{ textDecoration: "none" }}
          // >
          //   Testimonials{" "}
          // </Link>|
        }
      </span>
    </div>
  );
};

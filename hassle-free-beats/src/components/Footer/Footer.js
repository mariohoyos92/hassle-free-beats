import React from "react";

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
        <a href="#" className="footer-link">
          F.A.Q{" "}
        </a>|<a href="#" className="footer-link">
          {" "}
          About Us{" "}
        </a>|{" "}
        <a href="#" className="footer-link">
          Hassle-Free-License{" "}
        </a>|{" "}
        <a href="#" className="footer-link">
          Testimonials
        </a>
      </span>
    </div>
  );
};

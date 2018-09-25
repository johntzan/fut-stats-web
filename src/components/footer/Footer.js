import React, { Component } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import FaFacebookSquare from "react-icons/lib/fa/facebook-square";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/futStatsTracker/"
        >
          <FaFacebookSquare />
        </a>

        <h6>
          &copy; 2018 &bull; Fut Stats &bull;
          <Link style={{ color: "white" }} to="/privacy-policy">
            {" "}
            Privacy Policy{" "}
          </Link>
          &bull;
          <Link style={{ color: "white" }} to="/terms">
            {" "}
            Terms & Conditions
          </Link>
        </h6>
      </div>
    );
  }
}

export default Footer;

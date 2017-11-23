import React, {Component} from 'react';
import './Footer.css';
import FaFacebookSquare from 'react-icons/lib/fa/facebook-square';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <h6>
                    &copy; 2018 &bull; Fut Stats
                </h6>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.facebook.com/futStatsTracker/"><FaFacebookSquare/></a>

            </div>
        );
    }
}

export default Footer;
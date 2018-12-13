import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons' 


const Footer = () => (
    <footer id="footer" >
        <div className="container">
            <div className="row">
                <div className="col-sm-3 myCols">
                    <h5>Get started</h5>
                     <ul>
                        <li><a href="/" to="/">Home</a></li>
                        <li><a href="/signup" to="/signup">Sign up</a></li>
                        <li><a href="/news" to="/news">News</a></li>
                    </ul>
                </div>
                <div className="col-sm-3 myCols">
                    <h5>About us</h5>
                    <ul>
                        <li><a href="#">Company Information</a></li>
                        <li><a href="#">Contact us</a></li>
                        <li><a href="#">Reviews</a></li>
                    </ul>
                </div>
                <div className="col-sm-3 myCols">
                    <h5>Support</h5>
                    <ul>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Help desk</a></li>
                        <li><a href="#">Forums</a></li>
                    </ul>
                </div>
                <div className="col-sm-3 myCols">
                    <h5>Legal</h5>
                    <ul>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Terms of Use</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="social-networks">
            <a href="#"><FontAwesomeIcon className="twitter" icon={faTwitter} size="lg"/> </a>
            <a href="#"><FontAwesomeIcon className="facebook" icon={faFacebook} size="lg"/> </a>
            <a href="#"><FontAwesomeIcon className="google" icon={faGoogle} size="lg"/> </a>
        </div>
        <div className="footer-copyright">
            <p>© 2018 Midas </p>
        </div>
    </footer>
)
export default Footer;
import React from 'react';
import '../css/SoulsmileFooter.css';
import { FaFacebookF } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { GrInstagram } from 'react-icons/gr';
import { GrTwitter } from 'react-icons/gr';

function SoulsmileFooter() {
  return (
    <>
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">Soulsmile Club is a non-profit that allows you to donate to causes you care about just from your everyday purchases, without spending any extra. By downloading our browser extension or shopping with the retailers on our website, customers automatically earn soulsmiles, which are donated by our retailers. Soulsmile Club donates 100% of the proceeds to organizations working on the most pressing humanitarian issues today.</p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Join Soulsmile Club</h6>
            <ul className="footer-links">
              <li><a href="/donate">Donate Now</a></li>
              <li><a href="https://tiny.cc/soulsmile-extension">Download Extension</a></li>
              <li><a href="/retailers">Shop with Retailers</a></li>
              <li><a href="/causes">View Causes</a></li>
              <li><a href="/how-it-works">Learn More</a></li>
            </ul>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li><a href="/vision">About Us</a></li>
              <li><a href="/team">Meet the Team</a></li>
              <li><a href="/faq">FAQs</a></li>
              <li><a href="privacy-policy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <hr></hr>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Questions? Contact us at <a href="mailto:team@soulsmile.club" id="email">team@soulsmile.club</a>.</p>
            <p className="copyright-text">Copyright &copy; 2020 Soulsmile Club, Inc.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li><a className="facebook" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/soulsmile.club"><FaFacebookF /></a></li>
              <li><a className="instagram" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/soulsmile.club/"><GrInstagram /></a></li>
              <li><a className="twitter" target="_blank" rel="noopener noreferrer" href="https://twitter.com/SoulsmileClub"><GrTwitter /></a></li>
              <li><a className="linkedin" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/soulsmile-club"><FaLinkedin /></a></li>   
            </ul>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}

export default SoulsmileFooter;

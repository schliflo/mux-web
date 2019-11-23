import React from "react";
import { Link } from "gatsby";

const Footer = class extends React.Component {
  render() {
    const year = new Date().getFullYear();

    return (
      <footer id="footer" className="footer">
        <div className="footer__row">
          <span>&copy; {year}</span>
          <Link to='/imprint'>Imprint</Link>
        </div>
        <div className="footer__row">
          <span>Max Neumeier</span>
          <a href="https://www.instagram.com/muxsux/" title="Instagram of Max Neumeier" rel="noopener" target="_blank">Instagram</a>
        </div>
      </footer>
    );
  }
};

export default Footer;

import React from "react";
import { Link } from "gatsby";

const Footer = class extends React.Component {
  render() {
    const year = new Date().getFullYear();

    return (
      <footer id="footer" className="footer">
        <span className="footer__copyright">&copy; {year} Max Neumeier</span>
        <nav id="nav-footer" className="footer__nav">
          <ul>
            <li>
              <Link to='/imprint'>Imprint</Link>
            </li>
          </ul>
        </nav>
      </footer>
    );
  }
};

export default Footer;

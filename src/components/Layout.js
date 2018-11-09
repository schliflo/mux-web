import React from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";

import Navbar from "../components/Navbar";
import "./scss/main.scss";

const TemplateWrapper = ({ children }) => (
  <div id="page">
    <Helmet title="Max Neumeier - Video Editor"/>
    <Navbar/>
    <div className="pageContent">{children}</div>
    <footer id="footer" className="footer">
      <span className="footer__copyright">&copy; 2018 Max Neumeier</span>
      <nav id="nav-footer" className="footer__nav">
        <ul>
          <li>
            <Link to='/imprint'>Imprint</Link>
          </li>
        </ul>
      </nav>
    </footer>
  </div>
);

export default TemplateWrapper;

import React from 'react'
import { Link } from 'gatsby'

import logo from '../img/logo.svg'
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import vimeo from '../img/social/vimeo.svg'

const Footer = class extends React.Component {
  render() {
    return (
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
    )
  }
}

export default Footer

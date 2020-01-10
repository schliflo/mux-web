/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */

import React from 'react'
import { Link } from 'gatsby'
import logo from "../img/logos/MN_Logo_white-02.svg";

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'menuOpen': false,
    };
  };

  render() {
    return (
      <header id="header" className={`header ${this.state.menuOpen ? "nav-open" : ""}`}>
        <Link to='/' className="header__logo">
          <img src={logo} width="145" alt="Max Neumeier - Video Editor"/>
        </Link>
        <div className="nav-wrap">
          <div className="nav-toggle" onClick={() => {
            this.setState({
              'menuOpen': !this.state.menuOpen,
            });
          }}>
            <div className="nav-toggle__bar"/>
            <div className="nav-toggle__bar"/>
            <div className="nav-toggle__bar"/>
          </div>
          <nav id="nav-main" className="header__nav">
            <ul>
              <li>
                <Link to='/work' activeClassName='active' onClick={() => {
                  this.setState({
                    'menuOpen': !this.state.menuOpen,
                  });
                }}><span
                  data-text="Work">Work</span></Link>
              </li>
              <li>
                <Link to='/about' activeClassName='active' onClick={() => {
                  this.setState({
                    'menuOpen': !this.state.menuOpen,
                  });
                }}><span
                  data-text="About">About</span></Link>
              </li>
              <li>
                <Link to='/contact' activeClassName='active' onClick={() => {
                  this.setState({
                    'menuOpen': !this.state.menuOpen,
                  });
                }}><span
                  data-text="Contact">Contact</span></Link>
              </li>
            </ul>
          </nav>
          <div className="sub-nav">
            <Link to='/' activeClassName='active' onClick={() => {
              this.setState({
                'menuOpen': !this.state.menuOpen,
              });
            }}><span
              data-text="Work">Selected</span></Link>
            <Link to='/work' activeClassName='active' onClick={() => {
              this.setState({
                'menuOpen': !this.state.menuOpen,
              });
            }}><span
              data-text="Work">All</span></Link>
          </div>
        </div>
      </header>
    )
  }
}

export default Navbar

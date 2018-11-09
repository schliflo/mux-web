import React from "react";
import { Link } from "gatsby";
import logo from "../img/logos/MN_Logo_white-02.svg";

class Navbar extends React.Component {

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
          <img src={logo} width="90" height="54" alt="Max Neumeier - Video Editor"/>
        </Link>
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
      </header>
    );
  }
}

// const NavbarOld = () => (
//   <nav className="navbar is-transparent">
//     <div className="container">
//       <div className="navbar-brand">
//         <Link to="/" className="navbar-item">
//           <figure className="image">
//             <img src={logo} alt="Kaldi" style={{ width: "88px" }}/>
//           </figure>
//         </Link>
//       </div>
//       <div className="navbar-start">
//         <Link className="navbar-item" to="/about">
//           About
//         </Link>
//         <Link className="navbar-item" to="/products">
//           Products
//         </Link>
//       </div>
//       <div className="navbar-end">
//         <a
//           className="navbar-item"
//           href="https://github.com/AustinGreen/gatsby-netlify-cms-boilerplate"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <span className="icon">
//             <img src={github} alt="Github"/>
//           </span>
//         </a>
//       </div>
//     </div>
//   </nav>
// );

export default Navbar;

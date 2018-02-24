import React from 'react'
import {Container} from 'reactstrap'
import PropTypes from 'prop-types'
import graphql from 'graphql'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

// code syntax-highlighting theme
// feel free to change it to another one
import 'prismjs/themes/prism-twilight.css'

// main site style
import './scss/main.scss'

const TemplateWrapper = ({children, data}) => {
    let user
    if (typeof window !== 'undefined') {
        user = window.netlifyIdentity && window.netlifyIdentity.currentUser()
    }
    return (
        <div className='App'>
            <Helmet title={data.site.siteMetadata.title}/>
            <div id='page'>
                <header id="header" className="header">
                    <Link to='/' className="header__logo">
                        <img src="/files/logos/mnv.svg" width="90" height="57"/>
                    </Link>
                    <nav id="nav-main" className="header__nav">
                        <ul>
                            <li>
                                <Link to='/work' activeClassName='active'><span data-text="Work">Work</span></Link>
                            </li>
                            <li>
                                <Link to='/about' activeClassName='active'><span data-text="About">About</span></Link>
                            </li>
                            <li>
                                <Link to='/contact' activeClassName='active'><span data-text="Contact">Contact</span></Link>
                            </li>
                        </ul>
                    </nav>
                </header>

                <main id="main">
                    <div className='pageContent'>{children()}</div>
                </main>

                <footer id="footer" className="footer">
                    <Link to='/' className="footer__logo">
                        <img src="/files/logos/muxn_logo_03.svg" width="353" height="199"/>
                    </Link>
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
        </div>
    )
}

TemplateWrapper.propTypes = {
    children: PropTypes.func
}

export const pageQuery = graphql`
  query LayoutIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default TemplateWrapper

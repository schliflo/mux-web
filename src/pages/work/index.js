import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'
import { Link } from "gatsby";

export default class BlogIndexPage extends React.Component {
  render() {

  return (
      <Layout>
        <section className="section">
          <div className="container">
            <h1 className="sr-only">
              My work
            </h1>
            <div className="featured_all">
              <Link className="btn" activeClassName='active' to="/">
                featured
              </Link>
              <Link className="btn" activeClassName='active' to="/work">
                all
              </Link>
            </div>
            <BlogRoll />
          </div>
        </section>
      </Layout>
    )
  }
}

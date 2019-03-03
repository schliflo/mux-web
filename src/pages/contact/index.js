import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'

export default class Index extends React.Component {
  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1>Contact</h1>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

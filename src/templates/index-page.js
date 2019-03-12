import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from "gatsby";

import Layout from '../components/Layout'
import {BlogRoll} from '../components/BlogRoll'

export const IndexPageTemplate = ({
  image,
  title,
}) => (
    <div className="container">
      <div className="">
        <h1 className="sr-only">
          {title}
        </h1>
        <StaticQuery
          query={graphql`
            query IndexBlogRollQuery {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
                filter: { frontmatter: { templateKey: { eq: "blog-post" }, isFrontPage: { eq: true } } }
                ) {
                  edges {
                    node {
                      id
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        subtitle
                        templateKey
                        date(formatString: "MMMM DD, YYYY")
                        image {
                          childImageSharp {
                            fluid(maxWidth: 720, quality: 82) {
                              ...GatsbyImageSharpFluid
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            `}
          render={(data, count) => (
            <BlogRoll data={data} count={count}/>
          )}
        />
        <div className="more-link">
          <Link className="btn" to="/work">
            All my work
          </Link>
        </div>
      </div>
    </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  description: PropTypes.string,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        description={frontmatter.description}
        data={data}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
query IndexPageTemplate {
  markdownRemark(frontmatter: {templateKey: {eq: "index-page"}}) {
      frontmatter {
        title
        description
      }
    }
  }
`

import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { BlogRoll } from "../components/BlogRoll";

export default () => (
  <StaticQuery
    query={graphql`
    query BlogRollIndexQuery {
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
)

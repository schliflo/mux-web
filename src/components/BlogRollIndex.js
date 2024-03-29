import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { BlogRoll } from "../components/BlogRoll";

export default () => (
  <StaticQuery
    query={graphql`
    query BlogRollIndexQuery {
      allMarkdownRemark(
        sort: {frontmatter: {date: DESC}}
        filter: {frontmatter: {templateKey: {eq: "blog-post"}, isFrontPage: {eq: true}}}
        limit: 9
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
              date(formatString: "YYYY")
              tags
              isFrontPage
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

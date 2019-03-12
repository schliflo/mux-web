import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'

export class BlogRoll extends React.Component {

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="video-grid">
        {posts && (posts
          .map(({ node: post }) => (
            <div
              className="video-grid__item"
              key={post.id}
            >
            <article className="">
                <Link className="" to={post.fields.slug}>
                  <Img alt={post.frontmatter.title} fluid={{ ...post.frontmatter.image.childImageSharp.fluid, aspectRatio: 16/9 }} />
                  <h2 className="video-grid__title">
                    {post.frontmatter.title}
                  </h2>
                  <h3 className="video-grid__subtitle">
                    {post.frontmatter.subtitle}
                  </h3>
                </Link>
              </article>
            </div>
          )))}
      </div>
    );
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
    query BlogRollQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] },
        filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
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

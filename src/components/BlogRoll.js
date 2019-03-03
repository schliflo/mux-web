import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

class BlogRoll extends React.Component {

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
                  <PreviewCompatibleImage
                    className="video-grid__image"
                    imageInfo={{
                    image: post.frontmatter.image,
                    alt: post.frontmatter.title
                  }} />
                  <h2 className="video-grid__title">
                    {post.frontmatter.title}
                  </h2>
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
        filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            id
            fields {
              slug
            }
            frontmatter {
              title
              templateKey
              date(formatString: "MMMM DD, YYYY")
              image {
                childImageSharp {
                  fluid(maxWidth: 2048, quality: 100) {
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
      <BlogRoll data={data} count={count} />
    )}
  />
)

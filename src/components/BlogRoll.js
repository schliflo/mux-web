import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { kebabCase } from "lodash";

export class BlogRoll extends React.Component {

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="video-grid">
        {posts && (posts
          .map(({ node: post }) => (
            <div
              className={`video-grid__item ${post.frontmatter.isFrontPage ? 'is--featured' : ''}`}
              key={post.id}
            >
            <article className="">
                <Link className="" to={post.fields.slug}>
                  <div className="glitch">
                    <Img alt={post.frontmatter.title} fluid={{ ...post.frontmatter.image.childImageSharp.fluid, aspectRatio: 16/9 }} />
                    <Img alt={post.frontmatter.title} fluid={{ ...post.frontmatter.image.childImageSharp.fluid, aspectRatio: 16/9 }} />
                    <Img alt={post.frontmatter.title} fluid={{ ...post.frontmatter.image.childImageSharp.fluid, aspectRatio: 16/9 }} />
                    <Img alt={post.frontmatter.title} fluid={{ ...post.frontmatter.image.childImageSharp.fluid, aspectRatio: 16/9 }} />
                    <Img alt={post.frontmatter.title} fluid={{ ...post.frontmatter.image.childImageSharp.fluid, aspectRatio: 16/9 }} />
                  </div>
                  <h2 className="video-grid__title">
                    {post.frontmatter.title}
                  </h2>
                  <h3 className="video-grid__subtitle">
                    {post.frontmatter.subtitle}
                  </h3>
                  <div className="video-grid__meta">
                    {post.frontmatter.tags && post.frontmatter.tags.length ? (
                      <ul className="list--unstyled video-grid__tags">
                        {post.frontmatter.tags.map(tag => (
                          <li key={tag + `tag`}>
                            <Link to={`/tags/${kebabCase(tag)}/`}>//{tag}</Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <div className="video-grid__date">
                      {post.frontmatter.date}
                    </div>
                  </div>
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

import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import Award from "./Award";

export class Awards extends React.Component {

  render() {
    const { data } = this.props
    const { edges: awards } = data.allMarkdownRemark

    return (
      <div className="awards">
        {awards && (awards
          .map(({ node: award }) => (
            <Award year={award.frontmatter.year} grade={award.frontmatter.grade} title={award.frontmatter.title} category={award.frontmatter.category} href={award.frontmatter.href}/>
          )))}
      </div>
    );
  }
}

Awards.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
    query AwardsQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] },
        filter: { frontmatter: { templateKey: { eq: "award" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              templateKey
              date(formatString: "MMMM DD, YYYY")
              year
              grade
              category
              href
            }
          }
        }
      }
    }
    `}
    render={(data, count) => (
      <Awards data={data} count={count}/>
    )}
  />
)

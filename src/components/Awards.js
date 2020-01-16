import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery } from "gatsby";
import Award from "./Award";

export class Awards extends React.Component {

  render() {
    const { data, count } = this.props;
    const { edges: awards } = data.allMarkdownRemark;

    return (
      <>
        {count !== 0 && <div className="awards">
          {awards && (awards
            .map(({ node: award }) => (
              <Award key={award.id} year={award.frontmatter.year} grade={award.frontmatter.grade}
                     title={award.frontmatter.title} category={award.frontmatter.category}
                     href={award.frontmatter.href}/>
            )))}
        </div>}
      </>
    );
  }
}

Awards.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
      count: PropTypes.number
    })
  })
};

export default ({ filter }) => (
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
              timestamp(formatString: "x")
            }
          }
        }
      }
    }
    `}
    render={(data) => {
      if (typeof data.allMarkdownRemark.edges === "undefined" || data.allMarkdownRemark.edges.length === 0) {
        return "";
      } else if (!filter || typeof filter !== "object") {
        return <Awards data={data} count={data.allMarkdownRemark.edges.length}/>;
      } else {
        // make sure we have an array
        filter = [...filter];
        // convert timestamps to unix milliseconds
        filter = filter.map(item => `${parseInt((new Date(item).getTime()).toFixed(0))}`);
        const result = {
          allMarkdownRemark: {
            edges: data.allMarkdownRemark.edges.filter(item => filter.includes(item.node.frontmatter.timestamp))
          }
        };
        return <Awards data={result} count={result.allMarkdownRemark.edges.length}/>;
      }
    }}
/>
)

/* eslint-disable react/jsx-no-comment-textnodes */

import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import { BlogRoll } from "../components/BlogRoll";

class TagRoute extends React.Component {
  render() {
    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;
    const totalCount = this.props.data.allMarkdownRemark.edges.length;
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
      } tagged with “${tag}”`;

    return (
      <Layout>
        <section className="section">
          <Helmet title={`${tag} | ${title}`}/>
          <h1 className="text--mono">//{tag}</h1>
          <p className="text--small">{tagHeader}</p>
          <div className="content"></div>
          <BlogRoll data={this.props.data}/>
          <div className="more-link">
            <Link className="btn" to="/tags/">Browse all tags</Link>
          </div>
        </section>
      </Layout>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" }, tags: { in: [$tag] } } }
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
`;

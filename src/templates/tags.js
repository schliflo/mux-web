import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import { BlogRoll } from "../components/BlogRoll";

class TagRoute extends React.Component {
  render() {
    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;
    const totalCount = this.props.data.allMarkdownRemark.totalCount;
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
      } tagged with “${tag}”`;

    return (
      <Layout>
        <section className="section">
          <Helmet title={`${tag} | ${title}`}/>
          <div className="container">
            <h1 className="text--center">#{tag}</h1>
            <p className="text--center text--small">{tagHeader}</p>
            <BlogRoll data={this.props.data}/>
          </div>
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
`;

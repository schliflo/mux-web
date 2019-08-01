import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import BlogRollIndex from "../components/BlogRollIndex";

export const IndexPageTemplate = ({
                                    title
                                  }) => (
  <div className="container">
    <div className="">
      <h1 className="sr-only">
        {title}
      </h1>
      <div className="featured_all">
        <Link className="btn" activeClassName='active' to="/">
          featured
        </Link>
        <Link className="btn" activeClassName='active' to="/work">
          all
        </Link>
      </div>
      <BlogRollIndex/>
      <div className="more-link">
        <Link className="btn" to="/work">
          All my work
        </Link>
      </div>
    </div>
  </div>
);

IndexPageTemplate.propTypes = {
  title: PropTypes.string
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        title={frontmatter.title}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
query IndexPageTemplate {
  markdownRemark(frontmatter: {templateKey: {eq: "index-page"}}) {
      frontmatter {
        title
      }
    }
  }
`;

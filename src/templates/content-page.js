import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const ContentPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <section>
      <div className="container container--narrow">
        <div className="content">
          <h1>
            {title}
          </h1>
          <PageContent className="content" content={content}/>
        </div>
      </div>
    </section>
  );
};

ContentPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const ContentPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ContentPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  );
};

ContentPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default ContentPage;

export const contentPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

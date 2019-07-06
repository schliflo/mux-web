import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const ContentPageTemplate = ({ title, centeredContent, helmet, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <section className={centeredContent ? 'my-auto' : ''}>
      {helmet || ""}
      <div className="container container--narrow">
        <div className={`content ${centeredContent ? 'text--center' : ''}`}>
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
  description: PropTypes.string,
  centeredContent: PropTypes.bool,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const ContentPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ContentPageTemplate
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Max Neumeier - Video Editor">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description && post.frontmatter.description !== '' ? post.frontmatter.description : ''}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
        centeredContent={post.frontmatter.centeredContent}
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
  query ContentPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
        centeredContent
      }
    }
  }
`;

import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const ContentPageTemplate = ({
                                   content,
                                   contentComponent,
                                   title,
                                   helmet
                                 }) => {
  const PostContent = contentComponent || Content;

  return (
    <div className='template__content container container__narrow'>
      {helmet || ""}
      <PostContent className="container" content={content}/>
    </div>
  );
};

ContentPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet)
};

const ContentPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ContentPageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={<Helmet title={`${post.frontmatter.title} | ${data.site.siteMetadata.title}`}/>}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

ContentPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default ContentPage;

export const pageQuery = graphql`
  query ContentPageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;

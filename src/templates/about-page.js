import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import Img from "gatsby-image";
import Award from "../components/Award";

export const AboutPageTemplate = ({ title, image, centeredContent, helmet, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <section>
      {helmet || ""}
      <div className="container container--narrow">
        <div className={`content ${centeredContent ? "text--center" : ""}`}>
          <h1>
            {title}
          </h1>
          <div className="row contant">
            <div className="col--50">
              <p>
                {image && <Img alt={title} fluid={{ ...image.childImageSharp.fluid }}/>}
              </p>
            </div>
            <div className="col--50">
              <PageContent content={content}/>
            </div>
          </div>
        </div>
        <div className="awards">
          <Award year="2018" grade="silver" title="Art Directors Club" category="Best Editing" href="https://herznssach.de/"/>
          <Award year="2018" grade="silver" title="Art Directors Club" category="Best Editing"/>
          <Award year="2018" grade="silver" title="Art Directors Club" category="Best Editing"/>
          <Award year="2018" grade="silver" title="Art Directors Club" category="Best Editing"/>
          <Award year="2018" grade="silver" title="Art Directors Club" category="Best Editing"/>
          <Award year="2018" grade="silver" title="Art Directors Club" category="Best Editing"/>
        </div>
      </div>
    </section>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
  description: PropTypes.string,
  centeredContent: PropTypes.bool,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Max Neumeier - Video Editor">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description && post.frontmatter.description !== "" ? post.frontmatter.description : ""}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
        image={post.frontmatter.image}
        centeredContent={post.frontmatter.centeredContent}
        content={post.html}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
        centeredContent
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
`;

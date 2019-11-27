import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import Img from "gatsby-image";

export const ContactPageTemplate = ({ title, image, helmet, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <section>
      {helmet || ""}
      <div className={`content`}>
        <div className="row-headline">
          Get in touch
        </div>
        <div className="row">
          <div className="col--50">
            {image && <p>
              <Img alt={title} fluid={{ ...image.childImageSharp.fluid }}/>
            </p>}
            {!image && <>
              <p></p>
              <h1>
                {title}
              </h1>
            </>}
          </div>
          <div className="col--50">
            {image && <h1>
              {title}
            </h1>}
            <PageContent content={content}/>
          </div>
        </div>
      </div>

      <div className="more-link">
        <Link className="btn" to="/work">
          Check out my work
        </Link>
      </div>
    </section>
  );
};

ContactPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.any,
  description: PropTypes.string,
  content: PropTypes.string,
};

const ContactPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ContactPageTemplate
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
        image={post.frontmatter.image}
        content={post.html}
      />
    </Layout>
  );
};

ContactPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default ContactPage;

export const ContactPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
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

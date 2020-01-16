import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import Img from "gatsby-image";
import Awards from "../components/Awards";

export const AboutPageTemplate = ({ title, image, helmet, content, contentComponent, awards, selectedClients }) => {
  const PageContent = contentComponent || Content;
  const yourArray = selectedClients || [];
  const thirdwayThrough = Math.ceil(yourArray.length / 3);
  // or instead of floor you can use ceil depending on what side gets the extra data
  const selectedClients1 = yourArray.slice(0, thirdwayThrough);
  const selectedClients2 = yourArray.slice(thirdwayThrough, thirdwayThrough*2);
  const selectedClients3 = yourArray.slice(thirdwayThrough*2, yourArray.length);

  return (
    <section>
      {helmet || ""}
      <div className={`content`}>
        <div className="row-headline">
          About
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
        {awards && awards.length > 0 && <>
          <h3 className="row-headline">
            Awards
          </h3>
          <Awards filter={awards || []}/>
        </>}
        {selectedClients && selectedClients.length > 0 && <>
          <h3 className="row-headline">
            Selected clients
          </h3>
          <div className="selected-clients row">
            {selectedClients1 && selectedClients1.length > 0 &&
            <ul className="col--33">
              {selectedClients1.map(item => (
                  <li>{item.label}</li>
              ))}
            </ul>
            }
            {selectedClients2 && selectedClients2.length > 0 &&
            <ul className="col--33">
              {selectedClients2.map(item => (
                <li>{item.label}</li>
              ))}
            </ul>
            }
            {selectedClients3 && selectedClients3.length > 0 &&
            <ul className="col--33">
              {selectedClients3.map(item => (
                <li>{item.label}</li>
              ))}
            </ul>
            }
          </div>
        </>}
      </div>
      <div className="more-link">
        <Link className="btn" to="/contact">
          Get in touch
        </Link>
      </div>
    </section>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.any,
  description: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  awards: PropTypes.array,
  selectedClients: PropTypes.array,
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
            <meta name="description" content={`${post.frontmatter.description && post.frontmatter.description !== '' ? post.frontmatter.description : post.frontmatter.subtitle}`}/>
            <meta property='og:title' content={`${post.frontmatter.title} | Work | Max Neumeier - Video Editor`} />
          </Helmet>
        }
        title={post.frontmatter.title}
        image={post.frontmatter.image}
        content={post.html}
        awards={post.frontmatter.awards}
        selectedClients={post.frontmatter.selectedClients}
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
        awards
        selectedClients {
          name
        }
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

/* eslint-disable react/jsx-no-comment-textnodes */

import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import VideoEmbed from "../components/VideoEmbed";
import Content, { HTMLContent } from "../components/Content";
import Awards from "../components/Awards";

export const BlogPostTemplate = ({
                                   content,
                                   contentComponent,
                                   description,
                                   tags,
                                   title,
                                   subtitle,
                                   date,
                                   helmet,
                                   videoType,
                                   videoId,
                                   credits,
                                   awards,
                                   ratio,
                                 }) => {
  const PostContent = contentComponent || Content;
  const yourArray = credits || [];
  const halfwayThrough = Math.ceil(yourArray.length / 2);
  // or instead of floor you can use ceil depending on what side gets the extra data
  const credits1 = yourArray.slice(0, halfwayThrough);
  const credits2 = yourArray.slice(halfwayThrough, yourArray.length);

  return (
    <section className="section">
      {helmet || ""}
      <VideoEmbed videoType={videoType} videoId={videoId} videoTitle={title} ratio={ratio}/>
      <div className="row">
        <div className="col--50">
          <h1>{title}</h1>
          {subtitle && <h2>{subtitle}</h2>}
          {description &&
            <p className="text--center text--italic">{description}</p>
          }
          <div className="date">
            {date}
          </div>
          {tags && tags.length ? (
            <ul className="list--unstyled list--tags">
              {tags.map(tag => (
                <li key={tag + `tag`}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>//{tag}</Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="col--50">
          <PostContent content={content}/>
        </div>
      </div>
      {credits && credits.length > 0 && <>
        <h3 className="row-headline">
          Crew
        </h3>
        <div className="credits row">
          {credits1 && credits1.length > 0 &&
            <dl className="col--50">
              {credits1.map(item => (
                <>
                  <dt>{item.label}</dt>
                  <dd>{item.text}</dd>
                </>
              ))}
            </dl>
          }{credits2 && credits2.length > 0 &&
          <dl className="col--50">
            {credits2.map(item => (
              <>
                <dt>{item.label}</dt>
                <dd>{item.text}</dd>
              </>
            ))}
          </dl>
          }
        </div>
      </>}
      {awards && awards.length > 0 && <>
        <h3 className="row-headline">
          Awards
        </h3>
        <Awards filter={awards || []}/>
      </>}
      <div className="more-link">
        <Link className="btn" to="/work">
          See all work
        </Link>
      </div>
    </section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  date: PropTypes.string.isRequired,
  helmet: PropTypes.object,
  videoType: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
  awards: PropTypes.object,
  credits: PropTypes.object,
  ratio: PropTypes.number,
  image: PropTypes.string,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  console.log(post.frontmatter.image);

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Work | Max Neumeier - Video Editor">
            <title>{`${post.frontmatter.title}`}</title>
            <meta name="description" content={`${post.frontmatter.description && post.frontmatter.description !== '' ? post.frontmatter.description : post.frontmatter.subtitle}`}/>
            <meta property='og:title' content={`${post.frontmatter.title} | Work | Max Neumeier - Video Editor`} />
            <meta property='og:image' content={`https://maxneumeier.com/${post.frontmatter.image.childImageSharp.fixed.src}`} />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        subtitle={post.frontmatter.subtitle}
        date={post.frontmatter.date}
        videoType={post.frontmatter.videoType}
        videoId={post.frontmatter.videoId}
        credits={post.frontmatter.credits}
        awards={post.frontmatter.awards}
        ratio={post.frontmatter.ratio}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "YYYY")
        title
        subtitle
        description
        tags
        image {
          childImageSharp {
            fixed(width: 720, quality: 82) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        videoType
        videoId
        credits {
          label
          text
        }
        awards
        ratio
      }
    }
  }
`;

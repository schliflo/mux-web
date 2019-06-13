import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import VideoEmbed from "../components/VideoEmbed";
import Content, { HTMLContent } from "../components/Content";

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
                                   credits
                                 }) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container container--narrow">
        <div className="text--center">
        <h1>{title}</h1>
          {subtitle && <h2>{subtitle}</h2>}
          {tags && tags.length ? (
            <ul className="list--unstyled list--tags">
              {tags.map(tag => (
                <li key={tag + `tag`}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>#{tag}</Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      {description &&
      <div className="container container--narrow">
        <p className="text--center text--italic">{description}</p>
      </div>
       }
      <div className="container">
        <VideoEmbed videoType={videoType} videoId={videoId} videoTitle={title}/>
      </div>
      <div className="container container--narrow">
        <p className="text--small text--center">
          {date}
        </p>
        <div className="row">
          <PostContent content={content} className={`content ${credits ? 'col--50' : 'col--100'}`}/>
          {credits && <div className="content credits col--50">
            <dl>
                {credits.map(item => (
                  <>
                    <dt>{item.label}</dt>
                    <dd>{item.text}</dd>
                  </>
                ))}
            </dl>
          </div>}
        </div>
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
  videoId: PropTypes.string.isRequired
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        subtitle={post.frontmatter.subtitle}
        date={post.frontmatter.date}
        videoType={post.frontmatter.videoType}
        videoId={post.frontmatter.videoId}
        credits={post.frontmatter.credits}
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
        date(formatString: "MMMM YYYY")
        title
        subtitle
        description
        tags
        videoType
        videoId
        credits {
          label
          text
        }
      }
    }
  }
`;

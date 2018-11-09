import React from 'react'
import PropTypes from 'prop-types'
import {kebabCase} from 'lodash'
import Helmet from 'react-helmet'
import {graphql, Link} from 'gatsby'
import Layout from '../components/Layout'
import Content, {HTMLContent} from '../components/Content'

export const WorkItemTemplate = ({
                                     content,
                                     contentComponent,
                                     title,
                                     helmet,
                                 }) => {
    const PostContent = contentComponent || Content;

    return (
        <>
          {helmet || ''}
                      <h1>
                          {title}
                      </h1>
                      <PostContent content={content}/>
        </>
    )
};

WorkItemTemplate.propTypes = {
    content: PropTypes.node.isRequired,
    contentComponent: PropTypes.func,
    title: PropTypes.string,
    helmet: PropTypes.instanceOf(Helmet),
};

const WorkItem = ({data}) => {
    const {markdownRemark: post} = data;

    return (
        <Layout>
            <WorkItemTemplate
                content={post.html}
                contentComponent={HTMLContent}
                helmet={<Helmet title={`${post.frontmatter.title} | ${data.site.siteMetadata.title}`}/>}
                title={post.frontmatter.title}
            />
        </Layout>
    )
};

WorkItem.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object,
    }),
};

export default WorkItem

export const pageQuery = graphql`
  query WorkItemByID($id: String!) {
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

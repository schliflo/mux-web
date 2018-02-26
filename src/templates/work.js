import React from 'react'
import Helmet from 'react-helmet'
import graphql from 'graphql'
import {basename} from 'path'
import Link from 'gatsby-link'

// find a post title by path
const findNode = (path, data) => data.allMarkdownRemark.edges
    .map(edge => edge.node.frontmatter)
    .filter(r => r.path === path)
    .pop()

export default function Template({data}) {
    const {markdownRemark: post} = data
    return (
        <div>
            <Helmet title={`${post.frontmatter.title} | ${data.site.siteMetadata.title}`}/>
            <h1 className="sr-only">${data.site.siteMetadata.title}</h1>
            <div dangerouslySetInnerHTML={{__html: post.html}}/>
        </div>
    )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        disqus
        title
      }
    }
    
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
        subtitle
        videoType
        videoID
        videoThumbnail {
          filename
        }
      }
    }

    allMarkdownRemark{
      edges{
        node{
          frontmatter{
            title
            path
          }
        }
      }
    }
  }
`

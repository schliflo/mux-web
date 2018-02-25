import React from 'react'
import Helmet from 'react-helmet'
import graphql from 'graphql'

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

export const aboutPageQuery = graphql`
  query AboutPage($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`

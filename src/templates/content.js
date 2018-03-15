import React from 'react'
import Helmet from 'react-helmet'
import graphql from 'graphql'

export default function Template({data}) {
    const {markdownRemark: post} = data
    return (
        <div className='container container__narrow'>
            <Helmet title={`${post.frontmatter.title} | ${data.site.siteMetadata.title}`}/>
            <h1 className="sr-only">{post.frontmatter.title}</h1>
            <div className="container" dangerouslySetInnerHTML={{__html: post.html}}/>
        </div>
    )
}

export const contentPageQuery = graphql`
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

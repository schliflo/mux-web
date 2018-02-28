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
            <div className="container container__flexible">
                <div className="video-embed" dangerouslySetInnerHTML={{
                    __html:
                        (() => {
                            let thumbnail = '<img class="video-grid__item__image" src="' + post.frontmatter.videoThumbnail[0].filename + '"/>';
                            switch (post.frontmatter.videoType) {
                                case 'youtube':
                                    return thumbnail + '<iframe src="https://www.youtube.com/embed/' + post.frontmatter.videoID + '?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
                                case 'vimeo':
                                    // TODO: handle vimeo
                                    return '';
                                default:
                                    return '';
                            }
                        })()
                }}/>
                <div className="container container__narrow">
                    <h1>{post.frontmatter.title}</h1>
                    <h2>{post.frontmatter.subtitle}</h2>
                    <div dangerouslySetInnerHTML={{__html: post.html}}/>
                </div>
            </div>
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

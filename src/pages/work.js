import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import graphql from 'graphql'

const WorkPage = ({data}) => (
    <div>
        <Helmet title={`Work | ${data.site.siteMetadata.title}`}/>
        {data.allMarkdownRemark.edges.filter(post => post.node.frontmatter.contentType === 'work').map(({node: post}) => (
            <div key={post.id} id={post.id}>
                <h2>{post.frontmatter.title}</h2>
                <h2>{post.frontmatter.subtitle}</h2>
                <p>{post.frontmatter.videoType} /// {post.frontmatter.videoID}</p>
                <div dangerouslySetInnerHTML={{__html: post.html}}/>
                <img src={post.frontmatter.videoThumbnail}/>
                <div dangerouslySetInnerHTML={{__html:
                    (() => {
                        switch (post.frontmatter.videoType) {
                            case 'youtube':
                                return '<iframe src="https://www.youtube.com/embed/' + post.frontmatter.videoID + '?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
                            case 'vimeo':
                                return '';
                            default:
                                return '';
                        }
                    })()
                }}/>
            </div>
        ))}
    </div>
)

export default WorkPage

export const pageQuery = graphql`
  query WorkQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            subtitle
            contentType
            date(formatString: "MMMM DD, YYYY")
            path
            videoType
            videoID
            videoThumbnail
          }
        }
      }
    }
    
    site {
      siteMetadata {
        title
      }
    }
  }
`

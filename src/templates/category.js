import React from 'react'
import Helmet from 'react-helmet'
import graphql from 'graphql'
import {basename} from 'path'
import Link from 'gatsby-link'

const uniqueCategories = (posts) => {
    let uniqueTags = [];

    console.log(posts);

    for (let i = 0; i < posts.length; i++) {
        let post = posts[i].node;
        if (post.frontmatter.category) {
            uniqueTags.push(post.frontmatter.category);
        }
    }

    uniqueTags = uniqueTags.reverse().filter(function (e, i, arr) {
        return arr.indexOf(e, i + 1) === -1;
    }).reverse();

    return uniqueTags;
};

const WorkCategories = (data) => (
    <ul className="category-list">
        {data.categories.map((category) => (
            <li key={category} className={data.current === category ? 'active' : ''}>
                <Link to={{pathname: '/work/' + category + '/'}}>{category}</Link>
            </li>
        ))}
    </ul>
);

export default function Template({data}) {
    const {markdownRemark: post} = data;
    return (
        <div>
            <Helmet title={`${post.frontmatter.title} | ${data.site.siteMetadata.title}`}/>
            <div className="container container__flexible text__center">
                <WorkCategories categories={uniqueCategories(data.allMarkdownRemark.edges)} current={post.frontmatter.title}/>
            </div>
            <div className='video-grid'>
                {data.allMarkdownRemark.edges.filter(item => item.node.frontmatter.contentType === 'work' && item.node.frontmatter.category === post.frontmatter.title).map(({node: item}) => (
                    <Link className="video-grid__item" data-tag={item.frontmatter.category} key={item.id} id={item.id}
                          to={item.frontmatter.path}>
                        <h2 className="video-grid__item__title">{item.frontmatter.title}</h2>
                        <h3 className="video-grid__item__subtitle text__serif">{item.frontmatter.subtitle}</h3>
                        <img className="video-grid__item__image" src={item.frontmatter.videoThumbnail[0].filename}/>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export const pageQuery = graphql`
  query categoryQuery($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        date(formatString: "MM YYYY")
        title
        subtitle
        category
        videoType
        videoID
        videoThumbnail {
          filename
        }
      }
    }
    
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
            category
            videoType
            videoID
            videoThumbnail {
              filename
            }
          }
        }
      }
    }
  }
`;

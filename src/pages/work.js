import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import graphql from 'graphql'

const uniqueCategories = (data) => {
    let uniqueTags = [];

    for (let i = 0; i < data.allMarkdownRemark.edges.length; i++) {
        let post = data.allMarkdownRemark.edges[i].node;
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
        {data['categories'].map((category) => (
            <li key={category} className={data['current'] === category ? 'active' : ''}>
                <Link to={{pathname: '/work/' + category + '/'}}>{category}</Link>
            </li>
        ))}
    </ul>
);

const WorkPage = ({data}) => (
    <div>
        <Helmet title={`Work | ${data.site.siteMetadata.title}`}/>
        <div className="container container__flexible text__center">
            <WorkCategories categories={uniqueCategories(data)} current={'featured'}/>
        </div>
        <div className='video-grid'>
            {data.allMarkdownRemark.edges.filter(post => post.node.frontmatter.contentType === 'work').map(({node: post}) => (
                <Link className="video-grid__item" data-tag={post.frontmatter.category} key={post.id} id={post.id}
                      to={post.frontmatter.path}>
                    <h2 className="video-grid__item__title">{post.frontmatter.title}</h2>
                    <h3 className="video-grid__item__subtitle text__serif">{post.frontmatter.subtitle}</h3>
                    <img className="video-grid__item__image" src={post.frontmatter.videoThumbnail[0].filename}/>
                </Link>
            ))}
        </div>
    </div>
);

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
    
    site {
      siteMetadata {
        title
      }
    }
  }
`;

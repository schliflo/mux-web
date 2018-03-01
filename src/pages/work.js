import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import graphql from 'graphql'

const GLOBAL_WINDOW = typeof window !== 'undefined' && window;
let workFilter = undefined;

const uniqueTags = (data) => {
    let uniqueTags = ['all'];

    for (let i = 0; i < data.allMarkdownRemark.edges.length; i++) {
        let post = data.allMarkdownRemark.edges[i].node;
        if (post.frontmatter.label) {
            uniqueTags.push(post.frontmatter.label);
        }
    }

    uniqueTags = uniqueTags.reverse().filter(function (e, i, arr) {
        return arr.indexOf(e, i + 1) === -1;
    }).reverse();

    return uniqueTags;
};

const setFilter = (value) => {
    if (value === 'all' || workFilter === value) {
        workFilter = undefined;
    } else {
        workFilter = value;
    }
};

const getFilterFromUrl = () => {
    if (!workFilter && GLOBAL_WINDOW.location && GLOBAL_WINDOW.location.hash) {
        setFilter(GLOBAL_WINDOW.location.hash ? decodeURIComponent(GLOBAL_WINDOW.location.hash.substring(1)) : undefined);
    }
};

const WorkTags = (tags) => (
    <ul className="tag-list">
        {tags.data.map((tag) => (
            <li key={tag} className={(workFilter === tag || tag === 'all' && !workFilter) ? 'active' : ''}>
                <Link to={{pathname: '/work', hash: encodeURIComponent(tag)}}
                      onClick={setFilter.bind(this, tag)}>{tag}</Link>
            </li>
        ))}
    </ul>
);

const WorkPage = ({data}) => (
    <div>
        {getFilterFromUrl()}
        <Helmet title={`Work | ${data.site.siteMetadata.title}`}/>
        <div className="container container__flexible text__center">
            <WorkTags data={uniqueTags(data)}/>
        </div>
        <div className='video-grid'>
            {data.allMarkdownRemark.edges.filter(post => post.node.frontmatter.contentType === 'work' && (!workFilter || post.node.frontmatter.label === workFilter)).map(({node: post}) => (
                <Link className="video-grid__item" data-tag={post.frontmatter.label} key={post.id} id={post.id}
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
            label
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

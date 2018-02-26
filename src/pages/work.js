import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import graphql from 'graphql'
import {PhotoSwipeGallery} from 'react-photoswipe';

const options = {
    //http://photoswipe.com/documentation/options.html
    fullscreenEl: false,
    zoomEl: false,
    shareEl: false
};

const getThumbnailContent = (item) => {
    return (
        <img src={item.thumbnail}/>
    );
}

const getGalleryItems = (data) => {
    let items = [
        // {
        //     src: 'http://lorempixel.com/1200/900/sports/1',
        //     thumbnail: 'http://lorempixel.com/120/90/sports/1',
        //     w: 1200,
        //     h: 900,
        //     title: 'Image 1'
        // },
        // {
        //     src: 'http://lorempixel.com/1200/900/sports/2',
        //     thumbnail: 'http://lorempixel.com/120/90/sports/2',
        //     w: 1200,
        //     h: 900,
        //     title: 'Image 2'
        // }
    ];

    for (let i = 0; i < data.allMarkdownRemark.edges.length; i++) {
        let post = data.allMarkdownRemark.edges[i].node;
        if (post.frontmatter.contentType === 'work') {
            let item = {};

            item.thumbnail = post.frontmatter.videoThumbnail[0].filename;
            item.w = 1920;
            item.h = 1080;
            item.title = post.frontmatter.title + ' - ' + post.frontmatter.subtitle;

            switch (post.frontmatter.videoType) {
                case 'youtube':
                    item.html = '<iframe src="https://www.youtube.com/embed/' + post.frontmatter.videoID + '?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
                    break;
                case 'vimeo':
                    break;
            }

            items.push(item);
        }
    }

    console.log(items);

    return items;
}

const WorkPage = ({data}) => (
    <div>
        <Helmet title={`Work | ${data.site.siteMetadata.title}`}/>
        <div className='video-grid'>
            <PhotoSwipeGallery items={getGalleryItems(data)} options={options} thumbnailContent={getThumbnailContent}/>
        </div>
        {/*{data.allMarkdownRemark.edges.filter(post => post.node.frontmatter.contentType === 'work').map(({node: post}) => (*/}
            {/*<div key={post.id} id={post.id}>*/}
                {/*<h2>{post.frontmatter.title}</h2>*/}
                {/*<h2>{post.frontmatter.subtitle}</h2>*/}
                {/*<p>{post.frontmatter.videoType} /// {post.frontmatter.videoID}</p>*/}
                {/*<div dangerouslySetInnerHTML={{__html: post.html}}/>*/}
                {/*<img src={post.frontmatter.videoThumbnail}/>*/}
                {/*<div dangerouslySetInnerHTML={{*/}
                    {/*__html:*/}
                        {/*(() => {*/}
                            {/*switch (post.frontmatter.videoType) {*/}
                                {/*case 'youtube':*/}
                                    {/*return '<iframe src="https://www.youtube.com/embed/' + post.frontmatter.videoID + '?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';*/}
                                {/*case 'vimeo':*/}
                                    {/*return '';*/}
                                {/*default:*/}
                                    {/*return '';*/}
                            {/*}*/}
                        {/*})()*/}
                {/*}}/>*/}
            {/*</div>*/}
        {/*))}*/}
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
`

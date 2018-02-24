import React from 'react'
import {Container, Card, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import graphql from 'graphql'

const WorkPage = ({data}) => (
    <Container>
        <Helmet title={`Work | ${data.site.siteMetadata.title}`}/>
        {data.allMarkdownRemark.edges.filter(post => post.node.frontmatter.contentType === 'work').map(({node: post}) => (
            <Card style={{marginBottom: 10}} key={post.id}>
                <CardBody>
                    <CardTitle><Link to={post.frontmatter.path}>{post.frontmatter.title}</Link></CardTitle>
                    <CardSubtitle style={{marginBottom: 10}}>{post.frontmatter.date}</CardSubtitle>
                    <CardText>{post.excerpt}</CardText>
                </CardBody>
            </Card>
        ))}
    </Container>
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
            contentType
            date(formatString: "MMMM DD, YYYY")
            path
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

const path = require('path')

exports.createPages = ({boundActionCreators, graphql}) => {
    const {createPage} = boundActionCreators

    return graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
        edges {
          node {
            excerpt(pruneLength: 400)
            html
            id
            frontmatter {
              contentType
              path
              date
              title
            }
          }
        }
      }
    }
  `).then(result => {
        if (result.errors) {
            return Promise.reject(result.errors)
        }
        result.data.allMarkdownRemark.edges.forEach(({node}) => {
            createPage({
                path: node.frontmatter.path,
                component: path.resolve(`src/templates/${String(node.frontmatter.contentType)}.js`),
                context: {} // additional data can be passed via context
            })
        })
    })
}

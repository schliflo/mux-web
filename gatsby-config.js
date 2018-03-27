module.exports = {
    siteMetadata: {
        title: 'Max Neumeier - Video Editor',
        author: 'Florian Schlittenbauer',
        authorLink: 'https://schliflo.de'
    },
    plugins: [
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/pages`,
                name: 'pages'
            }
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    'gatsby-remark-prismjs',
                    'gatsby-remark-copy-linked-files'
                ]
            }
        },
        'gatsby-plugin-offline',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass'
    ]
};

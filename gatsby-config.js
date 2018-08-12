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
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-123798317-1",
                head: false,
                anonymize: true,
                respectDNT: true,
            },
        },
        'gatsby-plugin-offline',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass'
    ]
};

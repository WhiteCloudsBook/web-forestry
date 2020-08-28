const config = require("./config.json");
// const infoData = require("./content/data/info.json")

module.exports = {
  siteMetadata: {
    ...config,
    // title: config.title,
    // description: config.description,
    // repoUrl: config.repository_url,
    // about: config.about,
    // contact: config.contact,
    // primaryColor: config.primary_color,
    // infoData: infoData,
    // fb: config
  },
  plugins: [
    "gatsby-transformer-remark",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-yaml",
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "articles",
        path: `${__dirname}/content/articles`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "home",
        path: `${__dirname}/content`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: `${__dirname}/content/data`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: "images",
    //     path: `${__dirname}/content/images`,
    //   },
    // },
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaultQuality: 75,
      },
    },
    `gatsby-transformer-sharp`,
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-relative-images",
          "gatsby-remark-normalize-paths",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 2000,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    "gatsby-plugin-netlify", // make sure to keep it last in the array
  ],
}

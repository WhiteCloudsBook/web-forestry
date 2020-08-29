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
    {
      resolve: "gatsby-plugin-prefetch-google-fonts",
      options: {
        fonts: [
          {
            family: "Open Sans",
            variants: ["ital", "300", "400", "600"]
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-T374H34",

        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        // Defaults to null
        defaultDataLayer: { platform: "gatsby" },

        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        // dataLayerName: "YOUR_DATA_LAYER_NAME",
      },
    },
    // {
    //   resolve: "gatsby-plugin-sharp",
    //   options: {
    //     defaultQuality: 75,
    //   },
    // },
    // `gatsby-transformer-sharp`,
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
};

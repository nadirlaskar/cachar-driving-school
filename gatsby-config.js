module.exports = {
  siteMetadata: {
    title: `Cachar Driving School`,
    description: `We provide training for obtaining driving license of all types of vehicals and provide respective certification.`,
    author: `@nadirlaskar`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`
  },
  plugins: [
    `gatsby-theme-material-ui`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/logo.png` // This path is relative to the root of the site.
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.YOUR_GOOGLE_TAGMANAGER_ID,
  
        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
  
        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        //
        // Defaults to null
        defaultDataLayer: { platform: "gatsby" },
  
        // Specify optional GTM environment details.
        gtmAuth: process.env.YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING,
        gtmPreview: process.env.YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME,
        dataLayerName: "dataLayer",
        // Defaults to false
        enableWebVitalsTracking: true,
      },
    },
  ]
}

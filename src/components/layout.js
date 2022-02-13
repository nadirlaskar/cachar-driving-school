/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { Toolbar } from "@mui/material"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { graphql, useStaticQuery } from "gatsby"
import ThemeTopLayout from "gatsby-theme-material-ui-top-layout/src/components/top-layout"
import PropTypes from "prop-types"
import * as React from "react"
import theme from "../theme"
import Header from "./header"
import "./layout.css"



const Layout = ({ showApplyNow, ...props }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeTopLayout theme={theme}>
      <Header
        showApplyNow={showApplyNow}
        siteTitle={data.site.siteMetadata?.title || `Title`}
      />
      <Toolbar />
      <Container>
        <Box sx={{ my: 2 }}>
          <main>{props.children}</main>
        </Box>
        <footer
          style={{
            marginTop: `2rem`
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: "grey"
            }}
          >
            Cachar driving school © {new Date().getFullYear()}, All Rights Reserved.
          </div>
        </footer>
      </Container>
    </ThemeTopLayout>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout

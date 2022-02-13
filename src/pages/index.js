import { Button, Typography } from "@mui/material"
import { navigate } from "gatsby"
import * as React from "react"
import ContactInfo from "../components/ContactInfo"
import Layout from "../components/layout"
import Seo from "../components/seo"


const IndexPage = () => {
  return (
    <Layout showApplyNow={true}>
      <Seo title="Home" />
      <Typography variant="h5" component="div" gutterBottom>
        Hey! learners, we are open for registration.
      </Typography>
        <Typography variant="subtitle1" component="div" gutterBottom>
          Book your seats
          <Button size="small" sx={{ m: 1 }} variant="outlined" onClick={() => navigate("/admission")}>
            Register now
          </Button>
        </Typography>
      <ContactInfo/>
    </Layout>
  )
}

export default IndexPage

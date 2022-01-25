import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1>Hey! drivers to be,</h1>
    <h3>We are coming online soon,</h3>
    <p>Cooking something great, stay tuned.</p>
    <StaticImage
      src="../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={["auto", "webp", "avif"]}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    />
    <div>
      <h5>Till then, you can find us Offline here</h5>
      <a
        style={{
          fontSize: 14,
          color: "grey",
          textDecoration: "none"
        }}
        href="http://maps.google.com/#"
      >
        (Map)
      </a>
      <a
        style={{
          fontSize: 14,
          color: "grey",
          textDecoration: "none"
        }}
        href="tel:+911234567890"
      >
        {" | "} +911234567890
      </a>
      <p
        style={{
          lineHeight: "16px",
          maxWidth: 200,
          fontSize: 14,
          margin: "auto"
        }}
      >
        Ramnagar, National Highway 53, Bajantipur Pt I, Assam 788026
      </p>
    </div>
  </Layout>
)

export default IndexPage

import { Box, Typography, useMediaQuery } from "@mui/material";
import * as React from "react";

const ContactInfo = () => { 
  const matches = useMediaQuery('(max-width:500px)');
  return (
    <div>
      <Typography component="div" sx={{mt:2}} variant="caption">Office Location</Typography>
      <Box sx={{ my: 2, width: "100%" }}>
          <iframe
            title="cachar driving school map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57935.076082424916!2d92.68705452167966!3d24.831648300000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374e35ebcf412f11%3A0x2f447d0b9c16093d!2sCachar%20Driving%20School!5e0!3m2!1sen!2sin!4v1705215073458!5m2!1sen!2sin"
            width={"100%"}
            height={matches ? "200" : "450"}
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
          />
        </Box>
        <Typography component="div" variant="caption">Contact us</Typography>
        <a
          style={{
            fontSize: 14,
            color: "grey",
            textDecoration: "none"
          }}
          href="tel:+917035712308"
        >+91 7035712308</a>
        <p
          style={{
            lineHeight: "16px",
            maxWidth: 200,
            fontSize: 14
          }}
        >
          Ramnagar, National Highway 53, Bajantipur Pt I, Assam 788026
        </p>
  </div>
  )
}

export default ContactInfo;
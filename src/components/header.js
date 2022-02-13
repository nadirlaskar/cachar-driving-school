import { useMediaQuery } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import * as React from "react"


function ElevationScroll(props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  })
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
}

const Header = ({ siteTitle, showApplyNow, ...props }) => {
  const matches = useMediaQuery('(max-width:500px)');
  const handleApply = React.useCallback(() => {
    navigate("/admission")
  }, [])
  return (
    <ElevationScroll {...props}>
      <AppBar>
        <Toolbar disableGutters={matches}>
          <IconButton sx={{ p: 1 }}>
            <img
              style={{
                width: 80,
                margin: 0
              }}
              alt="Cachar driving school logo"
              src="../../logo.png"
            />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`
              }}
            >
              {siteTitle}
            </Link>
          </Typography>
          {showApplyNow && (
            <Button
              color="secondary"
              sx={{ color: "white" }}
              onClick={handleApply}
              variant={"contained"}
            >
              Apply now
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  showApplyNow: PropTypes.bool
}

Header.defaultProps = {
  siteTitle: ``,
  showApplyNow: false
}

export default Header

import React from "react";
import "./Header-legacy.css";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Box className="header-container">
      {/* ===== TOP CONTACT BAR ===== */}
      <Box className="top-bar">
        <Box className="contact-item">
          <EmailIcon className="icon" />
          <Typography>jeevansamvardhan@gmail.com</Typography>
        </Box>
        <Box className="contact-item">
          <PhoneIcon className="icon" />
          <Typography>+91 75069 27704</Typography>
        </Box>
      </Box>

      {/* ===== MAIN NAVBAR ===== */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar className="navbar">
          {/* Logo + Title */}
          <Box className="logo-section">
            <img
              src="/src/assets/logoback.png"
              alt="Jeevan Samvardhan Logo"
              className="logo-img"
            />
            <Typography variant="h6" className="logo-text">
              Jeevan Samvardhan
            </Typography>
          </Box>

          {/* Nav Links */}
          <Box className="nav-links">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/donation" className="nav-link">
              Donation
            </Link>
            {/* <Link to="/joinus" className="nav-link">Join Us</Link> */}
            <Link to="/contact" className="nav-link">
              Contact
            </Link>

            <Button variant="contained" className="donate-btn">
              <Link to="/donation" className="nav-link">
                Donate Now
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;

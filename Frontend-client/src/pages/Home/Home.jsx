import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import DonationContainer from "../../components/DonationContainer/DonationContainer";
// import "./Home.css";

import { Box, Typography, Button, Card, CardContent } from "@mui/material";

import heroBg from "../../assets/figmachildrens.jpg";
// import chalaGhariImg from "../../assets/lostandfound.jpg";
import aamlahiImg from "../../assets/4.png";
import bhuk from "../../assets/bhuk.jpg";
import croppedCircleImg from "../../assets/cropped_circle_image.png";
import q1 from "../../assets/q1.jpg";
import q2 from "../../assets/q2.jpg";
import q3 from "../../assets/q3.jpg";
import q4 from "../../assets/q4.jpg";
import q5 from "../../assets/q5.jpg";
import q6 from "../../assets/q6.jpg";

function Home() {
  return (
    <>
      <Header />

      {/* ===== HERO SECTION ===== */}
      <Box className="hero-section" sx={{ backgroundImage: `url(${heroBg})` }}>
        <Box className="hero-inner">
          <Typography variant="h2" className="hero-title">
            We change the lives of those who have no hope.
          </Typography>

          {/* <Box className="hero-cards"> */}
            {/* <Card className="hero-card">
              <img src={chalaGhariImg} alt="Chala Ghari" />
              <CardContent>
                <Typography variant="h6" className="hero-card-title">
                  Chala Ghari Jaudya
                </Typography>
                <Typography className="hero-card-description">
                  We work to protect vulnerable children from child labor,
                  trafficking, and exploitation by reuniting them with families
                  or providing safe rehabilitation.
                </Typography>
                <Button variant="contained" className="hero-card-btn">
                  Learn More
                </Button>
              </CardContent>
            </Card> */}

            {/* <Card className="hero-card">
              <img src={aamlahiImg} alt="Aamhalahi Shikudya" />
              <CardContent>
                <Typography variant="h6" className="hero-card-title">
                  Aamhalahi shikudya
                </Typography>
                <Typography className="hero-card-description">
                  Educational campaigns to guide underprivileged children
                  towards learning, skill development, and a brighter future.
                </Typography>
                <Button variant="contained" className="hero-card-btn">
                  Learn More
                </Button>
              </CardContent>
            </Card> */}
          {/* </Box> */}
        </Box>
      </Box>

      {/* ===== WELCOME SECTION ===== */}
      <Box className="welcome-section">
        <Typography variant="h4">
          Welcome to Jeevan Samvardhan Foundation
        </Typography>

        <Typography variant="body1">
          Jeevan Samvardhan Foundation (JSJF), founded by Sadeshiv Chavan, is
          dedicated to uplifting homeless and underprivileged children. Rooted
          in rural Maharashtra, JSF works to provide education, nutrition,
          health awareness, sanitation, and vocational training—empowering
          children, youth, and women towards a dignified and self-reliant
          future.
        </Typography>

        <Box className="welcome-buttons">
          <Button variant="contained">Get Involved</Button>
          <Button variant="contained">Donate Now</Button>
        </Box>
      </Box>

      {/* ===== EMPOWERING SECTION ===== */}
      <Box className="empowering-section">
        <Box className="empowering-image">
          <img src={croppedCircleImg} alt="Children" />
        </Box>

        <Box className="empowering-content">
          <Typography variant="h4" className="empowering-title">
            Empowering Homeless & Underprivileged Children
          </Typography>

          <Typography variant="h5" className="empowering-subtitle">
            Help us bring education, health, and dignity to every child.
          </Typography>

          <Typography variant="body1" className="empowering-description">
            <strong>J</strong>eevan Samvardhan Foundation (JSF), founded by
            Sadashiv Chavan, is dedicated to rescuing, rehabilitating, and
            uplifting homeless and vulnerable children in urban and rural
            communities. We provide education, nutrition, healthcare, sanitation
            awareness, and vocational training—helping children, youth, and
            women move towards a brighter and self-reliant future.
          </Typography>

          <Button variant="contained" className="learn-more-btn">
            Learn More
          </Button>
        </Box>
      </Box>

      {/* ===== FEATURED CAMPAIGNS SECTION ===== */}
      <Box className="featured-campaigns-section">
        <Typography variant="h6" className="section-subtitle">
          WE NEED YOUR HELP
        </Typography>
        <Typography variant="h4" className="section-title">
          Featured Campaigns
        </Typography>
        <Typography variant="body1" className="section-description">
          It's through mistakes that you actually can grow you gert rid of
          everything that is not essential to makhave to get bad.
        </Typography>

        <Box className="donation-cards-container">
          <DonationContainer
            image={aamlahiImg}
            title="Aamhalahi shikudya"
            content="Empowers underprivileged children through education and skill development, helping them build a brighter future."
            amountRaised={120000}
            goalAmount={240000}
            memberCount={900}
          />

          <DonationContainer
            image={bhuk}
            title="One time dinner for all"
            content="Empowers underprivileged children through education and skill development, helping them build a brighter future."
            amountRaised={120000}
            goalAmount={240000}
            memberCount={900}
          />
        </Box>
      </Box>

      {/* ===== CONTACT / QUESTIONS SECTION ===== */}
      <Box className="contact-section">
        <Box className="contact-images">
          <img src={q1} alt="Activity 1" />
          <img src={q2} alt="Activity 2" />
          <img src={q3} alt="Activity 3" />
          <img src={q4} alt="Activity 4" />
          <img src={q5} alt="Activity 5" />
          <img src={q6} alt="Activity 6" />
        </Box>

        <Box className="contact-form">
          <Typography variant="h4" className="contact-title">
            Questions? Ask!
          </Typography>
          <Typography variant="body2" className="contact-subtext">
            When you donate to Jeevan Samvardhan, you can be sure that the money
            is used responsibly. If you have questions before you make a
            donation, please feel free to contact us.
          </Typography>

          <form className="form-fields">
            <label>Name</label>
            <input type="text" placeholder="Your Name" />

            <label>Mobile Number</label>
            <input type="text" placeholder="Your Mobile Number" />

            <label>Email Address</label>
            <input type="email" placeholder="Your Email Address" />

            <label>Question</label>
            <textarea placeholder="Your Question"></textarea>

            <Button variant="contained" className="submit-btn" sx={{ mt: 2 }}>
              Submit
            </Button>
          </form>
        </Box>
      </Box>

      {/* ===== TRANSPARENCY SECTION ===== */}
      <Box className="transparency-section">
        <Typography variant="h5" className="transparency-title">
          Committed to Transparency
        </Typography>
        <Typography variant="body1" className="transparency-text">
          84% of our total operating expenses fund programs for children in the
          countries we serve. So when you make a monthly gift or donation to our
          organization, the majority of your dollars go toward exactly what you
          intended — supporting children in poverty.
        </Typography>
      </Box>

      <Footer />
    </>
  );
}

export default Home;

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Donation from "./pages/Donation/Donation";
import Landing from "./pages/Landing/Landing";
import { Slide, ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DonateToFundraiser from "./pages/DonateToFundraiser/DonateToFundraiser";
import News from "./pages/News/News";
import JoinUs from "./pages/JoinUs/JoinUs";
import Awards from "./components/Awards/Awards";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/legacy" element={<Home />} />
        <Route
          path="/donate-to-fundraiser/:fundraiserId"
          element={<DonateToFundraiser />}
        />

        <Route path="/News" element={<News />} />
        <Route path="/joinus" element ={<JoinUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/donations" element={<Donation />} />
        <Route path="/awards" element={<Awards />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./Dashboard.css";
import Header from "../../components/Header/Header";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import Footer from "../../components/footer/Footer";
// import Analytics from "../../components/analytics/Analytics";
// import Searchbar from "../../components/searchbar/searchbar";
// import CornerMenu from "../../components/cornerMenu/CornerMenu";
// import Search from "../../components/Search/Search";
// import { MdCrisisAlert, MdOutlineAnalytics } from "react-icons/md";
import { RiRefund2Fill } from "react-icons/ri";
import { LuHouse } from "react-icons/lu";
// import { IoSearch } from "react-icons/io5";
// import { TiWeatherPartlySunny } from "react-icons/ti";
import { MdKeyboardArrowRight } from "react-icons/md";
import Fundraiser from "../../components/Fundraiser/Fundraiser";
import { MdOutlineInventory2 } from "react-icons/md";
// import Fundraiser from "../../components/Fundraiser/Fundraiser";
// import { useTranslation } from "react-i18next";
// import SOSDisplay from "../../components/sosDisplay/SOSDisplay";
// import Forecasting from "../../components/forecasting/Forecasting";
// import { TbReportAnalytics } from "react-icons/tb";
// import ReportGen from "../../components/report-gen/ReportGen";
import CentreForm from "../Centre/CentreForm";
// import CentreForm from "../Centre/CentreForm";
import ChildrenFilterPage from "../ChildrenFilter/ChildrenFilterPage";
// import ChildrenFilterPage from "../Children/ChildrenFilterPage";
import ChildDetailsPage from "../ChildrenDetails/ChildDetailsPage";
// import ChildDetailsPage from "../Children/ChildDetailsPage";
import EditChildPage from "../UpdateChildren/EditChildPage";
import CentresPage from "../CentresPage/CentresPage";
import CentreDetails from "../CentreDetails/CentreDetails";
import VaultPage from "../Vault/VaultPage";

// import VaultPage from "../ChildrenFilter/VaultPage";
// import EditChildPage from "../Children/EditChildPage";
// import CentrePage from "../Centre/CentrePage";
// import ManageCentres from "../Centre/ManageCentres";
import ReportPage from "../Report/ReportPage";

import { FaChildren } from "react-icons/fa6";
import { IoIosDocument } from "react-icons/io";

const Dashboard = () => {
  //   const { t } = useTranslation();
  const { tab } = useParams();
  const location = useLocation();
  const [dashboardPage, setDashboardPage] = useState(tab);
  // let navigateContent = useNavigate();
  const navigate = useNavigate();

  /* 🔹 read query params */
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode"); // view | edit | null
  const childId = searchParams.get("id"); // child ObjectId
  const centreId = searchParams.get("id");

  /* 🔹 keep dashboardPage in sync with URL */
  useEffect(() => {
    setDashboardPage(tab);
  }, [tab, location.search]);

  const changeSidebarContent = (path) => {
    navigate(`/dashboard/${path}`);
    setDashboardPage(path);
  };

  const sidebarContentTop = [
    // {
    //   name: "Donations",
    //   icon: <MdOutlineAnalytics className="sidebar-icon" />,
    //   to: "donations",
    //   color: "white",
    // },
    // {
    //   name: t("dashboard_search"),
    //   icon: <IoSearch className="sidebar-icon" />,
    //   to: "search",
    //   color: "white",
    // },
    {
      name: "Donations",
      icon: <RiRefund2Fill className="sidebar-icon" />,
      to: "donations",
      color: "white",
    },
    {
      name: "Centres",
      icon: <LuHouse className="sidebar-icon" />,
      to: "centrepage",
      color: "white",
    },

    {
      name: "Children",
      icon: <FaChildren className="sidebar-icon" />,
      to: "childrenfilter",
      color: "white",
    },
    {
      name: "Doc Vault",
      icon: <IoIosDocument className="sidebar-icon" />,
      to: "vault",
      color: "white",
    },
    {
      name: "Report",
      icon: <MdOutlineInventory2 className="sidebar-icon" />,
      to: "Report",
    },
    // {
    //   name: "Housing",
    //   icon: <LuHouse className="sidebar-icon" />,
    //   to: "housing",
    //   color: "white",
    // },
    // {
    //   name: "Inventory",
    //   icon: <MdOutlineInventory2 className="sidebar-icon" />,
    //   to: "inventory",
    //   color: "white",
    // },
  ];

  //   const sidebarContentBottom = [
  //     // {
  //     //   name: "Report Generation",
  //     //   icon: <TbReportAnalytics className="sidebar-icon" />,
  //     //   to: "report-gen",
  //     //   color: "white",
  //     // },
  //   ];

  return (
    <>
      <Header />
      <div className="dashboard-wrapper">
        <div className="dashboard-sidebar">
          {sidebarContentTop.map((sidebarItem, idx) => {
            return (
              <div
                className="sidebar-item"
                onClick={() => changeSidebarContent(sidebarItem.to)}
                key={idx}
                style={{
                  backgroundColor: `${
                    sidebarItem.to === dashboardPage
                      ? "var(--primary-color)"
                      : "white"
                  }`,
                  color: `${
                    sidebarItem.to === dashboardPage
                      ? "white"
                      : "var(--primary-color)"
                  }`,
                  fontWeight: `${sidebarItem.to === dashboardPage ? 600 : 400}`,
                }}
              >
                <div className="sidebar-content-wrapper">
                  <div className="sidebar-item-icon">{sidebarItem.icon}</div>
                  <div className="sidebar-item-text">{sidebarItem.name}</div>
                </div>
                <MdKeyboardArrowRight
                  size="2rem"
                  color={
                    sidebarItem.to === dashboardPage
                      ? "white"
                      : "var(--primary-color)"
                  }
                />
              </div>
            );
          })}
          {/* <div className="sos-toggle">
            <div
              className="sidebar-item"
              onClick={() => setSOSToggle((prev) => !prev)}
              style={{
                backgroundColor: `${
                  SOSToggle ? "var(--primary-color)" : "white"
                }`,
                color: `${SOSToggle ? "white" : "var(--primary-color)"}`,
                fontWeight: `${setSOSToggle ? 600 : 400}`,
              }}
            >
              <div className="sidebar-content-wrapper">
                <div className="sidebar-item-icon">
                  <MdCrisisAlert className="sidebar-icon" />
                </div>
                <div className="sidebar-item-text">
                  {SOSToggle ? "Hide SOS" : "Show SOS"}
                </div>
              </div>
            </div>
          </div> */}
          {/* {sidebarContentBottom.map((sidebarItem, idx) => {
            return (
              <div
                className="sidebar-item"
                onClick={() => changeSidebarContent(sidebarItem.to)}
                key={idx}
                style={{
                  backgroundColor: `${
                    sidebarItem.to === dashboardPage
                      ? "var(--primary-color)"
                      : "white"
                  }`,
                  color: `${
                    sidebarItem.to === dashboardPage
                      ? "white"
                      : "var(--primary-color)"
                  }`,
                  fontWeight: `${sidebarItem.to === dashboardPage ? 600 : 400}`,
                }}
              >
                <div className="sidebar-content-wrapper">
                  <div className="sidebar-item-icon">{sidebarItem.icon}</div>
                  <div className="sidebar-item-text">{sidebarItem.name}</div>
                </div>
                <MdKeyboardArrowRight
                  size="2rem"
                  color={
                    sidebarItem.to === dashboardPage
                      ? "white"
                      : "var(--primary-color)"
                  }
                />
              </div>
            );
          })} */}
        </div>
        <div className="dashboard-content">
          {/* {dashboardPage === "analytics" && <Analytics />}
          {dashboardPage === "search" && <Search />} */}
          {dashboardPage === "donations" && <Fundraiser />}

          {/* 🔥 CHILDREN LOGIC */}
          {dashboardPage === "childrenfilter" && !mode && (
            <ChildrenFilterPage />
          )}

          {dashboardPage === "childrenfilter" && mode === "view" && (
            <ChildDetailsPage childId={childId} />
          )}

          {dashboardPage === "childrenfilter" && mode === "edit" && (
            <EditChildPage childId={childId} />
          )}
          {dashboardPage === "centre" && <CentreForm />}
          {dashboardPage === "centrepage" && !mode && <CentresPage />}

          {dashboardPage === "centrepage" && mode === "view" && (
            <CentreDetails centreId={centreId} />
          )}
          {dashboardPage === "vault" && <VaultPage />}
          {dashboardPage === "Report" && <ReportPage />}
          {/* {dashboardPage === "forecasting" && <Forecasting />}
          {dashboardPage === "report-gen" && <ReportGen />} */}
          {dashboardPage === "housing" && (
            <div
              style={{
                height: "85vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1 style={{ overflow: "hidden" }}>🚧Under Construction🚧</h1>
            </div>
          )}
        </div>
        {/* {SOSToggle && (
          <div className="dashboard-sos">
            <SOSDisplay />
          </div>
        )} */}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Dashboard;

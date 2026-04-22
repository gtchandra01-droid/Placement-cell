import { Outlet, useLocation } from "react-router-dom";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import NotificationTicker from "../components/NotificationTicker";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import FeatureCards from "../components/FeatureCards";
import CompanyLogos from "../components/CompanyLogos";
import Footer from "../components/Footer";

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <Navbar />
      <NotificationTicker />

      {isHomePage ? (
        <>
          <Hero />
          <Intro />
          <FeatureCards />
          <CompanyLogos />
        </>
      ) : (
        <Outlet />
      )}

      <Footer />
    </div>
  );
}

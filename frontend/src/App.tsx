import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import MainLayout from "./layouts/MainLayout";
import AdminRoutes from "./admin/routes/AdminRoutes";

// Public pages
import About from "./pages/About";
import Drives from "./pages/Drives";
import Companies from "./pages/Companies";
import Pages from "./pages/Pages";
import Statistics from "./pages/Statistics";
import Notifications from "./pages/Notifications";
import Contact from "./pages/Contact";
import HelpSupport from "./pages/HelpSupport";
import Gallery from "./pages/Gallery";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Main site */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={null} />
            <Route path="about" element={<About />} />
            <Route path="drives" element={<Drives />} />
            <Route path="companies" element={<Companies />} />
            <Route path="pages" element={<Pages />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="help" element={<HelpSupport />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Admin panel */}
          <Route path="/admin/*" element={<AdminRoutes />} />\n        </Routes>
      </Router>
    </ThemeProvider>
  );
}

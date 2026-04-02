import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import WasteManagement from "./pages/WasteManagement";
import About from "./pages/About"
import Contact from "./pages/Contact"
import ScrollToTop from "./utils/ScrollToTop";

const App = () => {
  return (
    <BrowserRouter>
        <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/biomedical-waste" element={<WasteManagement />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

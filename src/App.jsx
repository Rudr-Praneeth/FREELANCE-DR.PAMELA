import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import WasteManagement from "./pages/WasteManagement";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/biomedical-waste" element={<WasteManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

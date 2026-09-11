import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardAdmin from "./pages/DashboardAdmin";
import LandingPage from "./pages/LandingPage"
import RatingPage from "./pages/RatingPage"
import SuccessPage from "./pages/SuccessPage"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardAdmin />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/rating" element={<RatingPage />} />
        <Route path="/success" element={<SuccessPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardAdmin from "./pages/DashboardAdmin";
import LandingPage from "./pages/LandingPage";
import RatingPage from "./pages/RatingPage";
import SuccessPage from "./pages/SuccessPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import KelolaAdmin from "./pages/KelolaAdmin";
import Laporan from "./pages/Laporan";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardAdmin />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/rating" element={<RatingPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/kelola"
          element={
            <ProtectedRoute>
              <KelolaAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/laporan"
          element={
            <ProtectedRoute>
              <Laporan />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Laporan from "./pages/Laporan";
import KelolaAdmin from "./pages/KelolaAdmin";

function ProtectedRoute({ children }) {
  const userLogin =
    localStorage.getItem("userLogin");

  if (!userLogin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/laporan"
          element={
            <ProtectedRoute>
              <Laporan />
            </ProtectedRoute>
          }
        />

        <Route
          path="/kelola-admin"
          element={
            <ProtectedRoute>
              <KelolaAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <Navigate to="/" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
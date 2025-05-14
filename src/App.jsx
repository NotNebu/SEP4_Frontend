import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";

import DashboardPage from "@Presentation/Pages/DashboardPage.jsx";
import TestPage from "@Presentation/Pages/TestPage";
import PredictionFormPage from "@/Presentation/Features/Prediction/PredictionFormPage.jsx";
import Navbar from "@Presentation/Components/Navbar";
import LoginPage from "@Presentation/Features/Login/LoginPage";
import ProfilePage from "./Presentation/Features/Profile/ProfilePage";
import ErrorPage from "@Presentation/Pages/ErrorPage";
import { useAuth } from "@Shared/Context/AuthContext.jsx";


function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return user ? children : <Navigate to="/login" replace />;
}


function Layout({ children }) {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/error";

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {!isAuthPage && <Navbar />}
      {children}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/test"
            element={
              <ProtectedRoute>
                <TestPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/prediction-form"
            element={
              <ProtectedRoute>
                <PredictionFormPage />
              </ProtectedRoute>
            }
          />
          <Route path="/error" element={<ErrorPage />} />
          <Route
            path="*"
            element={
              <Navigate
                to="/error"
                replace
                state={{
                  code: 404,
                  message: "Vi kunne ikke finde den ønskede anmodning.",
                }}
              />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

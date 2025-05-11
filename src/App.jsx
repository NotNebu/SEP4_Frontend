import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import DashboardPage from '@Presentation/Pages/DashboardPage.jsx';
import TestPage from "@Presentation/Pages/TestPage";
import PredictionFormPage from '@Presentation/Pages/PredictionFormPage.jsx';
import Navbar from "@Presentation/Components/Navbar";
import LoginPage from "@Presentation/Features/Login/LoginPage";
import ProfilePage from "./Presentation/Features/Profile/ProfilePage";
import ErrorPage from "@Presentation/Pages/ErrorPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar /> {/* Navbar always shows */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/prediction-form" element={<PredictionFormPage />} />
          <Route path="*" element={ 
            <Navigate to="/error" 
              replace state=
              {
                { 
                  code: 404,
                  message: "Vi kunne ikke finde den ønskede anmodning.",
        }
      }
      />
    }
  />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

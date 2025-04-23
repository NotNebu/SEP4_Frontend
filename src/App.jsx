import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from '@Presentation/Pages/DashboardPage.jsx';
import TestPage from "@Presentation/Pages/TestPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

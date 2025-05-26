import React from "react";

// DashboardBox-komponenten bruges til at indpakke indholdet i en boks
const DashboardBox = ({ children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
      {children}
    </div>
  );
};

export default DashboardBox;

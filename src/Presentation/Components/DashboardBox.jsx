import React from "react";

const DashboardBox = ({ children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
      {children}
    </div>
  );
};

export default DashboardBox;


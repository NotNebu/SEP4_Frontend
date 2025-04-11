import React from "react";
import GreenhouseRow1 from "../../../scenes/GreenhouseRow1"; // Row 1 with charts
import GreenhouseRow2 from "../../../scenes/GreenhouseRow2"; // Row 2 with sensor table
import FlexBetween from "../components/FlexBetween"; // Import your FlexBetween component
import Navbar from "../components/Navbar"; // Import Navbar
import Footer from "../components/Footer"; // Import Footer

const DashboardPage = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen flex flex-col">
      <Navbar />

      <h1 className="text-3xl font-bold my-6 px-6 py-8">Dashboard</h1>

      <div className="px-6 py-8">
        <GreenhouseRow1 />
      </div>

      <div className="px-6 py-8">
        <FlexBetween>
          <GreenhouseRow2 />
        </FlexBetween>
      </div>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;

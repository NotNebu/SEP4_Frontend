import React from "react";
import GreenhouseRow1 from "@Presentation/Scenes/GreenhouseRow1";
import GreenhouseRow2 from "@Presentation/Scenes/GreenhouseRow2";
import FlexBetween from "@Presentation/Layout/FlexBetween";
import Footer from "@Presentation/Layout/Footer";

const DashboardPage = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen flex flex-col">

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

import React from "react";
import GreenhouseRow1 from "@Presentation/Scenes/GreenhouseRow1";
import GreenhouseRow2 from "@Presentation/Scenes/GreenhouseRow2";
import FlexBetween from "@Presentation/Layout/FlexBetween";
import Footer from "@Presentation/Layout/Footer";

/**
 * Dashboard komponenten viser det overordnede kontrolpanel for brugeren.
 * Her kan brugeren se sensordata, såsom temperatur, luftfugtighed, lysniveau og jordfugtighed i realtid.
 * Derudover kan dashboardet vise grafer, statistikker og forskellige informationsrækker.
 *
 * @returns {JSX.Element}
 */

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

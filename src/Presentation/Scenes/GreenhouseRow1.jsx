import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import DashboardBox from "@Presentation/Components/DashboardBox";
import BoxHeader from "@Presentation/Layout/BoxHeader";
import { GreenhouseViewModel } from "@Application/ViewModels/GreenhouseViewModel";

/**
 * GreenhouseRow1 viser data for én sensor (f.eks. temperatur).
 * Den viser sensorens data på en enkel måde.
 *
 * @param {Object} data - Sensor data for én måling (f.eks. temperatur).
 * @returns {JSX.Element}
 */

const GreenhouseRow1 = () => {
  const { temperatureData, humidityData, soilData, status } = GreenhouseViewModel();

  // Visuel indicator for system status
  const renderStatusIndicator = () => {
    switch (status) {
      case "loading":
        return <span className="text-yellow-500 text-lg sm:text-xl">Loading...</span>;
      case "error":
        return <span className="text-red-500 text-lg sm:text-xl">Error fetching data!</span>;
      case "success":
        return <span className="text-green-500 text-lg sm:text-xl">Data Loaded</span>;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* System Status Indicator */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-3 mb-4 flex justify-center items-center">
        {renderStatusIndicator()}
      </div>

      {/* Temperatur */}
      <DashboardBox>
        <BoxHeader
          title="Temperatur"
          subtitle="Udendørs vs Indendørs"
          sideText="Aktuel: 24°C"
        />
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={temperatureData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis unit="°C" />
            <Tooltip />
            <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* Luftfugtighed */}
      <DashboardBox>
        <BoxHeader
          title="Luftfugtighed"
          subtitle="Dagsudvikling"
          sideText="Aktuel: 51%"
        />
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={humidityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis unit="%" />
            <Tooltip />
            <Line type="monotone" dataKey="humidity" stroke="#00bcd4" />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* Jordfugtighed */}
      <DashboardBox>
        <BoxHeader
          title="Jordfugtighed"
          subtitle="Sensor A1"
          sideText="Aktuel: 37%"
        />
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={soilData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis unit="%" />
            <Tooltip />
            <Line type="monotone" dataKey="soil" stroke="#4caf50" />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </div>
  );
};

export default GreenhouseRow1;

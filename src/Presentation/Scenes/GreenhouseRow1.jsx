import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import DashboardBox from "@Presentation/Components/DashboardBox";
import BoxHeader from "@Presentation/Layout/BoxHeader";
import { GreenhouseViewModel } from "@Application/ViewModels/GreenhouseViewModel";

/**
 * GreenhouseRow1 viser data for drivhussensorer såsom temperatur, luftfugtighed og afstand 
 *
 * @returns {JSX.Element}
 */

const GreenhouseRow1 = () => {
  const { temperatureData, humidityData, distanceData, status } = GreenhouseViewModel();
  {/*Status Indicator */}
  const renderStatusIndicator = () => {
    switch (status) {
      case "loading":
        return <span className="text-yellow-500 text-lg sm:text-xl">Indlæser data...</span>;
      case "error":
        return <span className="text-red-500 text-lg sm:text-xl">Fejl ved hentning af data!</span>;
      case "success":
        return <span className="text-green-500 text-lg sm:text-xl">Data hentet</span>;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* System Status */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-3 mb-4 flex justify-center items-center">
        {renderStatusIndicator()}
      </div>

      {/* Temperatur */}
      <DashboardBox>
        <BoxHeader title="Temperatur" subtitle="Udendørs vs Indendørs" sideText="Live Data" />
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={temperatureData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis unit="°C" />
            <Tooltip />
            <Line type="monotone" dataKey="temperature" stroke="#ff7300" dot={{ r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* Luftfugtighed */}
      <DashboardBox>
        <BoxHeader title="Luftfugtighed" subtitle="Dagsudvikling" sideText="Live Data" />
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={humidityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis unit="%" domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="humidity" stroke="#00bcd4" dot={{ r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* Afstand */}
      <DashboardBox>
        <BoxHeader title="Afstand" subtitle="Vandstandsmåling" sideText="Live Data" />
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={distanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis unit="cm" />
            <Tooltip />
            <Line type="monotone" dataKey="distance" stroke="#8e24aa" dot={{ r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </div>
  );
};

export default GreenhouseRow1;

import React, { useMemo } from "react";
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

  // Dummy temperatur data 
  const temperatureDataWithTime = useMemo(() => [
    { time: '08:00', temperature: 15 },
    { time: '10:00', temperature: 23 },
    { time: '12:00', temperature: 24 },
    { time: '14:00', temperature: 37 }, 
  ], []);

  // Dummy luftfugtighed data
  const humidityDataWithTime = useMemo(() => [
    { time: '08:00', humidity: 55 },
    { time: '10:00', humidity: 62 },
    { time: '12:00', humidity: 64 },
    { time: '14:00', humidity: 70 }, 
  ], []);

  // Dummy afstandsdata 
  const distanceDataWithTime = useMemo(() => [
    { time: '08:00', distance: 6 },
    { time: '10:00', distance: 16 },
    { time: '12:00', distance: 17 },
    { time: '14:00', distance: 18 }, 
  ], []);

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
          <LineChart data={temperatureDataWithTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" interval={0} />
            <YAxis unit="°C" />
            <Tooltip />
            <Line type="monotone" dataKey="temperature" stroke="#ff7300" dot={{ r: 3 }} activeDot={{ r: 5 }} />
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
          <LineChart data={humidityDataWithTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" interval={0} />
            <YAxis unit="%" domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="humidity" stroke="#00bcd4" dot={{ r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* Distance */}
      <DashboardBox>
        <BoxHeader
          title="Afstand"
          subtitle="Vandstandsmåling"
          sideText="Aktuel: 15 cm"
        />
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={distanceDataWithTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" interval={0} />
            <YAxis unit="cm" domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="distance" stroke="#8e24aa" dot={{ r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </div>
  );
};

export default GreenhouseRow1;

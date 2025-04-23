import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import DashboardBox from "@Presentation/Components/DashboardBox";
import BoxHeader from "@Presentation/Layout/BoxHeader";
import { GreenhouseViewModel } from "@Application/ViewModels/GreenhouseViewModel";

const GreenhouseRow1 = () => {
  const { temperatureData, humidityData, soilData } = GreenhouseViewModel();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

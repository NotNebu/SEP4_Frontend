import React from 'react';
import DashboardBox from '@Presentation/Components/DashboardBox';
import BoxHeader from '@Presentation/Layout/BoxHeader';
import SensorTable from '@Presentation/Tables/SensorTable';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { GreenhouseViewModel } from '@Application/ViewModels/GreenhouseViewModel';

const GreenhouseRow2 = () => {
  const { soilData, temperatureData, humidityData, distanceData } = GreenhouseViewModel();

  // Dummy Sensor Table sammensætning fra ViewModel
  const sensorData = [
    { id: 1, sensor: 'Temperature', value: `${temperatureData?.at(-1)?.temperature ?? 'N/A'} °C`, lastUpdate: temperatureData?.at(-1)?.time ?? 'N/A' },
    { id: 2, sensor: 'Humidity', value: `${humidityData?.at(-1)?.humidity ?? 'N/A'} %`, lastUpdate: humidityData?.at(-1)?.time ?? 'N/A' },
    { id: 3, sensor: 'Soil Moisture', value: `${soilData?.at(-1)?.soil ?? 'N/A'} %`, lastUpdate: soilData?.at(-1)?.time ?? 'N/A' },
    { id: 4, sensor: 'Distance', value: `${distanceData?.at(-1)?.distance ?? 'N/A'} cm`, lastUpdate: distanceData?.at(-1)?.time ?? 'N/A' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Seneste Sensoropdateringer */}
      <DashboardBox>
        <BoxHeader title="Seneste Sensoropdateringer" subtitle="Real-time sensor opdateringer" />
        <SensorTable sensorData={sensorData} />
      </DashboardBox>

      {/* Jordfugtighed */}
      <DashboardBox className="flex justify-center items-center">
        <BoxHeader title="Jordfugtighed" subtitle="Sensor A1" sideText="Live Data" />
        <div className="w-full max-w-full flex justify-center"> 
          <ResponsiveContainer width="100%" height={250}> 
            <LineChart data={soilData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis unit="%" domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="soil" stroke="#4caf50" dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DashboardBox>
    </div>
  );
};

export default GreenhouseRow2;

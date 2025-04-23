import React, { useMemo } from 'react';
import DashboardBox from '@Presentation/Components/DashboardBox';
import BoxHeader from '@Presentation/Layout/BoxHeader';
import SensorTable from '@Presentation/Tables/SensorTable';

const GreenhouseRow2 = () => {
  // Dummy sensor data for the table (You can replace this with real data from your viewmodel later)
  const sensorData = useMemo(() => [
    { id: 1, sensor: 'Temperature', value: '22°C', lastUpdate: '2025-04-08 12:30' },
    { id: 2, sensor: 'Humidity', value: '60%', lastUpdate: '2025-04-08 12:31' },
    { id: 3, sensor: 'Soil Moisture', value: '40%', lastUpdate: '2025-04-08 12:32' },
    { id: 4, sensor: 'CO2 Level', value: '300 ppm', lastUpdate: '2025-04-08 12:33' },
    { id: 5, sensor: 'Light', value: '500 lux', lastUpdate: '2025-04-08 12:34' }
  ], []);  // Use real-time data or API calls here

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <DashboardBox>
        <BoxHeader
          title="Recent Sensor Updates"
          subtitle="Real-time sensor updates"
        />
        <SensorTable sensorData={sensorData} /> 
      </DashboardBox>
    </div>
  );
};

export default GreenhouseRow2;

import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import DashboardBox from "@Presentation/Components/DashboardBox";
import BoxHeader from "@Presentation/Layout/BoxHeader";

/**
 * DistanceGraph viser udviklingen af højden (distance) over tid.
 *
 * @param {Object} props
 * @param {Array} props.data - Array af distance målinger
 */
const DistanceGraph = ({ data }) => {
  return (
    <DashboardBox>
      <BoxHeader
        title="Plantehøjde"
        subtitle="Udvikling over tid"
        sideText="Aktuel: 14 cm"
      />
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis unit="cm" />
          <Tooltip />
          <Line type="monotone" dataKey="distance" stroke="#8e44ad" />
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default DistanceGraph;

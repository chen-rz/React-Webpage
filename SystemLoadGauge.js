import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Box, Typography, Card } from '@mui/material';

const SystemLoadGauge = ({ systemLoad }) => {
  // Data for the gauge chart
  const data = [{ value: systemLoad }];

  // Function to get the color based on system load
  const getLoadColor = (load) => {
    if (load <= 30) return '#10b981'; // Green
    if (load <= 70) return '#fbbf24'; // Yellow
    return '#ef4444'; // Red
  };

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, p: 3 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6" fontWeight="bold">
          System Load
        </Typography>
        <Box width={150} height={150} position="relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="80%"
              outerRadius="100%"
              barSize={15}
              data={data}
              startAngle={180}
              endAngle={0}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar
                dataKey="value"
                cornerRadius={5}
                background
                fill={getLoadColor(systemLoad)}
                fillOpacity={0.7}
              />
              {/* Add percentage text directly using SVG <text> */}
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                fill={getLoadColor(systemLoad)}
                fontSize={20}
                fontWeight="bold"
                dy={10} // Adjust vertical position
              >
                {`${systemLoad}%`}
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Card>
  );
};

export default SystemLoadGauge;

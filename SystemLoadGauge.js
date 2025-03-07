import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Box, Typography, Card, Grid } from '@mui/material';

const SystemLoadGauge = ({ systemLoad, participationRate }) => {
  // Round off the values
  participationRate = Math.round(participationRate * 100); // Convert to percentage

  // Data for the gauges
  const systemLoadData = [{ value: systemLoad }];
  const deviceParticipationData = [{ value: participationRate }];

  // Function to get the color based on load
  const getLoadColor = (load) => {
    if (load <= 30) return '#10b981'; // Green
    if (load <= 70) return '#fbbf24'; // Yellow
    return '#ef4444'; // Red
  };

  // Function to get the color based on participation rate
  const getParticipationColor = (rate) => {
    if (rate >= 70) return '#10b981'; // Green
    if (rate >= 30) return '#fbbf24'; // Yellow
    return '#ef4444'; // Red
  };

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              System Load
            </Typography>
            <Box width={150} height={150} position="relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="80%"
                  outerRadius="100%"
                  barSize={15}
                  data={systemLoadData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar
                    dataKey="value"
                    cornerRadius={5}
                    background
                    fill={getLoadColor(systemLoad)}
                    fillOpacity={0.7}
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    fill={getLoadColor(systemLoad)}
                    fontSize={20}
                    fontWeight="bold"
                    dy={10}
                  >
                    {`${systemLoad}%`}
                  </text>
                </RadialBarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Device Participation Rate
            </Typography>
            <Box width={150} height={150} position="relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="80%"
                  outerRadius="100%"
                  barSize={15}
                  data={deviceParticipationData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar
                    dataKey="value"
                    cornerRadius={5}
                    background
                    fill={getParticipationColor(participationRate)}
                    fillOpacity={0.7}
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    fill={getParticipationColor(participationRate)}
                    fontSize={20}
                    fontWeight="bold"
                    dy={10}
                  >
                    {`${participationRate}%`}
                  </text>
                </RadialBarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SystemLoadGauge;

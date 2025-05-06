import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Box, Typography, Card, Grid } from '@mui/material';

const SystemLoadGauge = ({ systemLoad, participationRate, bandwidthUsage, localModelRatio }) => {
  // Round off the values
  participationRate = Math.round(participationRate * 100); // Convert to percentage

  // Data for the gauges
  const systemLoadData = [{ value: systemLoad }];
  const deviceParticipationData = [{ value: participationRate }];
  const bandwidthUsageData = [{ value: bandwidthUsage }];
  const localModelRatioData = [{ value: localModelRatio }];

  // Function to get the color based on load
  const lowGoodColor = (load) => {
    if (load <= 30) return '#10b981'; // Green
    if (load <= 70) return '#fbbf24'; // Yellow
    return '#ef4444'; // Red
  };

  // Function to get the color based on participation rate
  const highGoodColor = (rate) => {
    if (rate >= 70) return '#10b981'; // Green
    if (rate >= 30) return '#fbbf24'; // Yellow
    return '#ef4444'; // Red
  };

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              服务器负载
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
                    fill={lowGoodColor(systemLoad)}
                    fillOpacity={0.7}
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    fill={lowGoodColor(systemLoad)}
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
        <Grid item xs={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              传输带宽利用率
            </Typography>
            <Box width={150} height={150} position="relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="80%"
                  outerRadius="100%"
                  barSize={15}
                  data={bandwidthUsageData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar
                    dataKey="value"
                    cornerRadius={5}
                    background
                    fill={lowGoodColor(bandwidthUsage)}
                    fillOpacity={0.7}
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    fill={lowGoodColor(bandwidthUsage)}
                    fontSize={20}
                    fontWeight="bold"
                    dy={10}
                  >
                    {`${bandwidthUsage}%`}
                  </text>
                </RadialBarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              终端模型训练比例
            </Typography>
            <Box width={150} height={150} position="relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="80%"
                  outerRadius="100%"
                  barSize={15}
                  data={localModelRatioData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar
                    dataKey="value"
                    cornerRadius={5}
                    background
                    fill={lowGoodColor(localModelRatio)}
                    fillOpacity={0.7}
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    fill={lowGoodColor(localModelRatio)}
                    fontSize={20}
                    fontWeight="bold"
                    dy={10}
                  >
                    {`${localModelRatio}%`}
                  </text>
                </RadialBarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              终端设备参与率
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
                    fill={highGoodColor(participationRate)}
                    fillOpacity={0.7}
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    fill={highGoodColor(participationRate)}
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

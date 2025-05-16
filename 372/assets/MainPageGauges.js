import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Box, Typography, Card, Grid } from '@mui/material';

const MainPageGauges = ({ numberOfModels, numberOfDevices, numberOfDatasets }) => {

  // We'll set a nominal 'max' for the gauge display. The displayed text will be the actual number.
  // You can adjust 'maxGaugeValue' based on your expected typical maximums for a better visual representation.
  const maxGaugeValueModels = 7;    // Max for Models gauge
  const maxGaugeValueDevices = 70;  // Max for Devices gauge
  const maxGaugeValueDatasets = 8; // Max for Datasets gauge

  // Data for the gauges - ensure value doesn't exceed its specific max for bar display
  const modelsData = [{ name: 'Models', value: Math.min(numberOfModels, maxGaugeValueModels) }];
  const devicesData = [{ name: 'Devices', value: Math.min(numberOfDevices, maxGaugeValueDevices) }];
  const datasetsData = [{ name: 'Datasets', value: Math.min(numberOfDatasets, maxGaugeValueDatasets) }];

  // Color function for metrics where "lower is better" or a general status
  const getStatusColor = (value, maxValue, lowIsGood = true) => {
    const percentage = (value / maxValue) * 100;
    if (lowIsGood) {
      if (percentage <= 30) return '#10b981'; // Green
      if (percentage <= 70) return '#fbbf24'; // Yellow
      return '#ef4444'; // Red
    } else { // Higher is better
      if (percentage >= 70) return '#10b981'; // Green
      if (percentage >= 30) return '#fbbf24'; // Yellow
      return '#ef4444'; // Red
    }
  };

  // A more neutral color
  const neutralColor = '#2563eb'; // Blue

  // Updated renderGauge function to include onGaugeClick
  const renderGauge = (title, data, currentValue, displayValue, maxValueForGauge, color, onGaugeClick) => (
    <Grid item xs={12} sm={6} md={4}>
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center"
        onClick={onGaugeClick} // Attach the click handler here
        sx={{ 
          cursor: 'pointer', // Change cursor to indicate it's clickable
          padding: 2, // Add some padding for better click area
          borderRadius: 2,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)', // Subtle hover effect
          }
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ textAlign: 'center' }}>
          {title}
        </Typography>
        <Box width={150} height={150} position="relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="80%"
              outerRadius="100%"
              barSize={15}
              data={data} // data now uses value capped at maxValueForGauge for bar
              startAngle={90}
              endAngle={-270}
              cy="50%"
            >
              <PolarAngleAxis type="number" domain={[0, maxValueForGauge]} angleAxisId={0} tick={false} />
              <RadialBar
                dataKey="value"
                cornerRadius={5}
                background={{ fill: '#e0e0e0' }}
                fill={color}
                fillOpacity={0.85}
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                fill={color}
                fontSize={displayValue.toString().length > 3 ? 20 : 24} // Adjust font size for longer numbers
                fontWeight="bold"
                dy={10}
              >
                {displayValue} {/* Display the actual, non-capped number */}
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Grid>
  );

  // Define click handlers for each gauge
  const handleModelsClick = () => {
    alert(`可选${numberOfModels}种模型：\n· AlexNet\n· VGG11\n· VGG16\n· ViTb16\n· ResNet50\n· ResNet18`);
  };

  const handleDevicesClick = () => {
    alert(`在线设备数：${numberOfDevices}`);
  };

  const handleDatasetsClick = () => {
    alert(`可选${numberOfDatasets}种数据集：\n· CIFAR-10\n· CIFAR-100\n· FashionMNIST\n· MNIST\n· TinyImageNet`);
  };

  return (
    <Card sx={{ 
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)', 
        borderRadius: '12px', 
        p: { xs: 2, sm: 3 }, 
        backgroundColor: '#f9fafb' 
    }}>
      <Grid container spacing={{xs: 2, sm: 3}} justifyContent="center" alignItems="stretch">
        {renderGauge(
          "模型数量",
          modelsData,
          numberOfModels, // current actual value
          numberOfModels, // display value (actual number)
          maxGaugeValueModels, // max for this specific gauge's bar
          '#fbbf24', // Or use getStatusColor if appropriate
          handleModelsClick
        )}
        {renderGauge(
          "连接的设备数量",
          devicesData,
          numberOfDevices,
          numberOfDevices,
          maxGaugeValueDevices,
          getStatusColor(numberOfDevices, maxGaugeValueDevices, false), // Assuming higher is better for devices
          handleDevicesClick
        )}
        {renderGauge(
          "数据集数量",
          datasetsData,
          numberOfDatasets,
          numberOfDatasets,
          maxGaugeValueDatasets,
          neutralColor, // Or use getStatusColor if appropriate
          handleDatasetsClick
        )}
      </Grid>
    </Card>
  );
};

export default MainPageGauges;

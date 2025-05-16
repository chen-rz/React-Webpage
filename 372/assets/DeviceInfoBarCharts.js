import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Transform data for bar charts
const transformDataForBarChart = (data, key) => {
  return data.map((device) => ({
    id: device.id,
    value: device[key],
  }));
};

function DeviceInfoBarCharts({ deviceInfoData }) {
  return (
    <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "repeat(2, 1fr)" }} gap={3} mx="auto" mt={5}>
      {/* CPU Bar Chart */}
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom mb={2}>
            计算能力 (GFLOPS)
          </Typography>
          <Box width="100%" height={300}>
            <ResponsiveContainer>
              <BarChart data={transformDataForBarChart(deviceInfoData, "cpu")}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3b82f6" name="计算能力 (GFLOPS)" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Data Bar Chart */}
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom mb={2}>
            数据样本
          </Typography>
          <Box width="100%" height={300}>
            <ResponsiveContainer>
              <BarChart data={transformDataForBarChart(deviceInfoData, "data")}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#10b981" name="数据样本" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Transmission Power Bar Chart */}
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom mb={2}>
            传输功率 (mW)
          </Typography>
          <Box width="100%" height={300}>
            <ResponsiveContainer>
              <BarChart data={transformDataForBarChart(deviceInfoData, "trans")}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#f97316" name="传输功率 (mW)" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Progress Bar Chart */}
      {/* <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom mb={2}>
            训练进度 (%)
          </Typography>
          <Box width="100%" height={300}>
            <ResponsiveContainer>
              <BarChart data={transformDataForBarChart(deviceInfoData, "progress")}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8b5cf6" name="训练进度 (%)" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card> */}
    </Box>
  );
};

export default DeviceInfoBarCharts;

import { Typography, Box } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

function PerformanceCharts({ lossData, accuracyData }) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" align="center" gutterBottom>
        损失函数与训练精度
      </Typography>

      {/* Grid for Two Charts */}
      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={3} justifyContent="center">
        {/* Loss Chart */}
        <Box>
          <Typography variant="subtitle1" align="center" fontWeight="bold">
            损失函数
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lossData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="round" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="loss" stroke="#ef4444" strokeWidth={2} dot={false} name="损失函数值" />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Accuracy Chart */}
        <Box>
          <Typography variant="subtitle1" align="center" fontWeight="bold">
            训练精度
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="round" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} dot={false} name="精度值" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default PerformanceCharts;

import { Card, CardContent, Typography, Box } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

function PerformanceCharts({ lossData, accuracyData }) {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, p: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" align="center" gutterBottom>
          Loss and Accuracy Over Time
        </Typography>

        {/* Grid for Two Charts */}
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={3} justifyContent="center">
          {/* Loss Chart */}
          <Box>
            <Typography variant="subtitle1" align="center" fontWeight="bold">
              Loss
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lossData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="round" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="loss" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          {/* Accuracy Chart */}
          <Box>
            <Typography variant="subtitle1" align="center" fontWeight="bold">
              Accuracy
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="round" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PerformanceCharts;

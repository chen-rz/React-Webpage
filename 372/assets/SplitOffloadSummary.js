import { Box, Typography, Paper } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function SplitOffloadSummary({ splitPointStats }) {
  return (
    <Box mt={4}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        模型分割点分布统计
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 1 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={splitPointStats}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="splitPoint"
              label={{ value: "分割点", position: "insideBottom", dy: 10 }}
            />
            <YAxis
              label={{ value: "设备数量", angle: -90, position: "insideLeft", dx: -10 }}
            />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

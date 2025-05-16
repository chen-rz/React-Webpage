import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Paper
} from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function DeviceInvolve({ deviceInvolveList }) {

  // Format: [{ device: "0", count: 0 }, { device: "1", count: 1 }, ...]
  const data = deviceInvolveList.map((count, i) => ({
    device: String(i),
    count
  }));

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, p: 4 }}>
      <CardContent sx={{ padding: "24px" }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          align="center"
          gutterBottom
          sx={{ marginBottom: "24px" }}
        >
          终端设备历史参与次数
        </Typography>

        <Paper elevation={1} sx={{ height: 300, padding: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="device"
                label={{ value: "设备 ID", position: "insideBottom", dy: 10 }}
              />
              <YAxis
                allowDecimals={false}
                label={{ value: "参与次数", angle: -90, position: "insideLeft", dx: -10 }}
              />
              <Tooltip
                formatter={(value) => [`${value} 次`, "参与次数"]}
                labelFormatter={(label) => `设备 ${label}`}
              />
              <Bar
                dataKey="count"
                fill="#10b981"
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </CardContent>
    </Card>
  );
}

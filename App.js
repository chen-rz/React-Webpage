import { Box, Card, CardContent, Typography, LinearProgress, Chip } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Cpu, Database, HardDrive } from "lucide-react";
import SystemLoadGauge from "./SystemLoadGauge";
import DeviceParticipationCard from "./DeviceParticipationCard";

// Example Training Progress
const currentRound = 4;
const totalRounds = 10;
const progressPercentage = (currentRound / totalRounds) * 100;

const deviceData = [
  { id: "Device 1", cpu: 75, storage: 120, data: 500 },
  { id: "Device 2", cpu: 45, storage: 80, data: 300 },
  { id: "Device 3", cpu: 90, storage: 200, data: 700 },
];

// Example System Load (0 to 100)
const systemLoad = 72;

// Define FL training stages
const stages = ["Global Model Allocation", "Local Training", "Global Aggregation"];
const currentStage = stages[Math.floor(Math.random() * stages.length)]; // Random stage

export default function Dashboard() {
  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", p: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
        Federated Learning Training Dashboard
      </Typography>

      <Box maxWidth="1200px" mx="auto" display="grid" gridTemplateColumns={{ xs: "1fr", md: "repeat(2, 1fr)" }} gap={3} mt={5} alignItems="stretch" >
        {/* Progress & System Load Card */}
        <Card sx={{ boxShadow: 3, borderRadius: 2, p: 3 }}>
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom>
              Federated Training Progress
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              Round {currentRound} of {totalRounds}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progressPercentage}
              sx={{ height: 10, borderRadius: 5, backgroundColor: "#e0e0e0" }}
            />
          </CardContent>
        </Card>

        {/* System Load Gauge */}
        <SystemLoadGauge systemLoad={systemLoad} />

        {/* Device Participation Card */}
        <DeviceParticipationCard />

        {/* Federated Training Stage */}
        <Card sx={{ boxShadow: 3, borderRadius: 2, p: 3 }}>
          <CardContent>
            <Box textAlign="center">
              <Typography variant="subtitle1" fontWeight="bold">
                Current Federated Learning Stage:
              </Typography>
              <Chip label={currentStage} color="primary" sx={{ fontSize: 14, mt: 1 }} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Device Cards */}
      <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "repeat(3, 1fr)" }} gap={3} maxWidth="1200px" mx="auto" mt={5}>
        {deviceData.map((device) => (
          <Card key={device.id} sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {device.id}
              </Typography>

              {/* CPU Usage */}
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Cpu color="#3b82f6" size={20} />
                <Typography variant="body2">CPU Usage</Typography>
              </Box>
              <LinearProgress variant="determinate" value={device.cpu} sx={{ height: 8, borderRadius: 4, backgroundColor: "#e0e0e0" }} />

              {/* Data Processed */}
              <Box display="flex" alignItems="center" gap={1} mt={2}>
                <Database color="#10b981" size={20} />
                <Typography variant="body2">Data Processed: {device.data} MB</Typography>
              </Box>

              {/* Storage Used */}
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <HardDrive color="#f97316" size={20} />
                <Typography variant="body2">Storage Used: {device.storage} GB</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Performance Chart */}
      <Box mt={5} maxWidth="1200px" mx="auto">
        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom>
              Device Performance Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deviceData}>
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cpu" fill="#3b82f6" name="CPU Usage (%)" />
                <Bar dataKey="storage" fill="#f97316" name="Storage (GB)" />
                <Bar dataKey="data" fill="#10b981" name="Data (MB)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

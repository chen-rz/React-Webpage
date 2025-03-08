import { Button, Box, Card, CardContent, Typography, LinearProgress, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SystemLoadGauge from "./SystemLoadGauge";
import DeviceParticipationCard from "./DeviceParticipationCard";
import PerformanceCharts from "./PerformanceCharts";
import Logo from "./logo.svg";
import lossData from "./data/lossData";
import accuracyData from "./data/accuracyData";

export default function ControlPanel() {
  // Nagivate to Device Information page
  const navigate = useNavigate();
  const [timestamp, setTimestamp] = useState(new Date().toLocaleString());

  useEffect(() => {
    document.title = "Federated Learning Dashboard"; // Set the title dynamically

    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleString());
    }, 1000); // Update timestamp every second
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Example Training Progress
  const currentRound = 423;
  const totalRounds = 500;
  const progressPercentage = (currentRound / totalRounds) * 100;

  // Number of devices
  const totalDevices = 100;
  const participationRate = 0.3;
  const participatingDevices = new Set([25, 28, 23, 16, 37, 38, 3, 35, 17, 14, 9, 36, 12, 34, 29]);

  // Example System Load (0 to 100)
  const systemLoad = 86;

  // Define FL training stages
  const currentStage = "Local Training";

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", p: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
        Federated Learning Training Dashboard
      </Typography>

      <Box mt={3} display="flex" justifyContent="center">
        <Card sx={{ boxShadow: 3, borderRadius: 2, p: 3, width: "100%", maxWidth: "600px" }}>
          <CardContent>
            {/* Timestamp */}
            <Typography variant="subtitle1" align="center" color="textSecondary">
              {timestamp}
            </Typography>

            <Typography variant="h6" align="center" gutterBottom>
              Control Panel
            </Typography>

            {/* Buttons & Logo Layout */}
            <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
              <Button variant="contained" color="success" onClick={() => alert("Training Started!")}>
                Start Training
              </Button>

              {/* React Logo in the Center */}
              <Box mx={2}>
                <img src={Logo} alt="React Logo" width="40px" height="40px" />
              </Box>

              <Button variant="contained" color="error" onClick={() => alert("Training Ended!")}>
                End Training
              </Button>
            </Box>

            {/* Second Row of Buttons */}
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="contained" color="primary" onClick={() => navigate("/devices")}>
                Device Information
              </Button>
              <Button variant="contained" color="warning" onClick={() => alert("Exporting Statistics...")}>
                Export Statistics
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box maxWidth="1200px" mx="auto" display="grid" gridTemplateColumns={{ xs: "1fr", md: "repeat(2, 1fr)" }} gap={3} mt={5} alignItems="stretch" >
        {/* Progress & System Load Card */}
        <Card sx={{ boxShadow: 3, borderRadius: 2, p: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" align="center" gutterBottom>
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

        {/* Federated Training Stage */}
        <Card sx={{ boxShadow: 3, borderRadius: 2, p: 3 }}>
          <CardContent>
            <Box textAlign="center">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Current Federated Learning Stage
              </Typography>
              <Chip label={currentStage} color="primary" sx={{ fontSize: 14, mt: 1 }} />
            </Box>
          </CardContent>
        </Card>

        {/* System Load Gauge */}
        <SystemLoadGauge systemLoad={systemLoad} participationRate={participationRate} />

        {/* Device Participation Card */}
        <DeviceParticipationCard totalDevices={totalDevices} participatingDevices={participatingDevices} />
      </Box>

      {/* Performance Chart */}
      <Box mt={5} maxWidth="1200px" mx="auto">
        <PerformanceCharts lossData={lossData} accuracyData={accuracyData} />
      </Box>
    </Box>
  );
}

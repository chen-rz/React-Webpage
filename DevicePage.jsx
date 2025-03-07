import { Button, Box, Card, CardContent, Typography, LinearProgress } from "@mui/material";
import { Cpu, Database, HardDrive } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DevicePage() {
  // Dummy Device Data
  const deviceData = [
    { id: "Device 1", cpu: 75, storage: 120, data: 500 },
    { id: "Device 2", cpu: 45, storage: 80, data: 300 },
    { id: "Device 3", cpu: 90, storage: 200, data: 700 },
  ];

  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", p: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
        Device Information
      </Typography>

      <Button variant="contained" onClick={() => navigate("/")}>
        ⬅ Back to Dashboard
      </Button>

      {/* Device Cards */}
      <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "repeat(4, 1fr)" }} gap={3} maxWidth="1200px" mx="auto" mt={5}>
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
    </Box>
  );
}

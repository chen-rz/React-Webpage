import { Card, CardContent, Typography, Box } from "@mui/material";

// Number of devices
const totalDevices = 100;
const participationRate = 0.3; // 30% devices participate
const participatingDevices = new Set();

// Randomly select participating devices
while (participatingDevices.size < totalDevices * participationRate) {
  participatingDevices.add(Math.floor(Math.random() * totalDevices));
}

export default function DeviceParticipationCard() {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, p: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" align="center" gutterBottom>
          Device Participation in Current Round
        </Typography>

        {/* Adaptive Grid Layout */}
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(12px, 1fr))" gap={0.5} justifyContent="center">
          {Array.from({ length: totalDevices }, (_, i) => (
            <Box
              key={i}
              sx={{
                width: 12,
                height: 12,
                backgroundColor: participatingDevices.has(i) ? "#10b981" : "#ef4444",
                borderRadius: 1,
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

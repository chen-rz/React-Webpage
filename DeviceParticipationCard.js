import { Card, CardContent, Typography, Box, Tooltip } from "@mui/material";

const DeviceParticipationCard = ( {totalDevices, participatingDevices} ) => {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, p: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" align="center" gutterBottom>
          Device Participation in Current Round
        </Typography>

        {/* Adaptive Grid Layout */}
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(12px, 1fr))" gap={0.5} justifyContent="center">
          {Array.from({ length: totalDevices }, (_, i) => {
            const isParticipating = participatingDevices.has(i);
            return (
              <Tooltip key={i} title={`Device ${i + 1}: ${isParticipating ? "Involved" : "Not Involved"}`} arrow>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: isParticipating ? "#10b981" : "#ef4444",
                    borderRadius: 1,
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}

export default DeviceParticipationCard;

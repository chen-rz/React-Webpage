import { Card, CardContent, Typography, Box, Tooltip } from "@mui/material";

const DeviceParticipationCard = ({ totalDevices, participatingDevices }) => {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, p: 4 }}> {/* Increased padding for larger card */}
      <CardContent sx={{ padding: "24px" }}>
        {/* Title with increased font size and margin */}
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom sx={{ marginBottom: "24px" }}> {/* Increased font size and margin */}
          当前训练轮次终端设备参与情况
        </Typography>

        {/* Adaptive Grid Layout */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(40px, 1fr))"
          gap={3}
          justifyContent="center"
          sx={{ marginLeft: "24px", marginRight: "24px" }}
        >
          {Array.from({ length: totalDevices }, (_, i) => {
            const isParticipating = participatingDevices.has(i);
            return (
              <Box
                key={i}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Tooltip
                  title={`Device ${i}: ${isParticipating ? "Involved" : "Not Involved"}`}
                  arrow
                  sx={{
                    fontSize: "16px", // Larger font size
                    padding: "8px 12px", // Increased padding
                  }}
                >
                  <Box
                    sx={{
                      width: 28, // Increased square size
                      height: 28, // Increased square size
                      backgroundColor: isParticipating ? "#10b981" : "#ef4444",
                      borderRadius: 1,
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
                {/* Device ID Number */}
                <Typography variant="body2" sx={{ marginTop: 1, fontSize: "12px", color: "#3D315B" }}>
                  {i}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DeviceParticipationCard;

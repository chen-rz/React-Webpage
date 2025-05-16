import React, { useEffect } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ModelTrainingIcon from "@mui/icons-material/ModelTraining"; // FL & SL Training
import StorageIcon from "@mui/icons-material/Storage"; // Data Cache & Retrieval
import CloudSyncIcon from "@mui/icons-material/CloudSync"; // Distributed Inference
import DevicesIcon from "@mui/icons-material/Devices"; // Heterogeneous Devices
import InsightsIcon from "@mui/icons-material/Insights"; // Performance Monitoring
import DnsIcon from "@mui/icons-material/Dns"; // Distributed Systems

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "分布式人工智能与数据服务";
  }, []);

  // TODO Define sub-system panels with macaron pastel colors
  const panels = [
    { name: "分割联邦学习", icon: <ModelTrainingIcon fontSize="large" />, route: "/372/main", color: "#FFC3A0" },
    { name: "异构联邦学习", icon: <DevicesIcon fontSize="large" />, route: "/notyet", color: "#A0E7E5" },
    { name: "边缘大小模型协同", icon: <CloudSyncIcon fontSize="large" />, route: "/inference", color: "#B4F8C8" },
    { name: "分布式推理服务", icon: <StorageIcon fontSize="large" />, route: "/data-cache", color: "#FFDEAD" },
    { name: "数据缓存与检索", icon: <InsightsIcon fontSize="large" />, route: "/performance", color: "#A9DEF9" },
    { name: "端边协同智能", icon: <DnsIcon fontSize="large" />, route: "/distributed-systems", color: "#D9A7C7" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FAF3DD", // Soft cream background
        padding: 4,
      }}
    >
      {/* Title */}
      <Typography variant="h4" fontWeight="bold" mb={4} color="#8D6E63">
        分布式人工智能与数据服务
      </Typography>

      {/* Grid of Cards - Adaptive Centering */}
      <Grid container spacing={3} sx={{ maxWidth: "900px", justifyContent: "center" }}>
        {panels.map((panel) => (
          <Grid item key={panel.name} xs={12} sm={6} md={4}>
            <Card
              onClick={() => navigate(panel.route)}
              sx={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: 180,
                borderRadius: "16px",
                background: panel.color, // Apply macaron colors
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6, transform: "scale(1.05)" },
              }}
            >
              <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {panel.icon}
                <Typography variant="h6" fontWeight="bold" mt={2}>
                  {panel.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WelcomePage;

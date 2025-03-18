import { AppBar, Toolbar, Tabs, Tab, Button, Box, Card, CardContent, Typography, LinearProgress, Chip } from "@mui/material";
import React, { useState, useEffect } from "react";

import Navigation from "./assets/Navigation";
import SystemLoadGauge from "./assets/SystemLoadGauge";
import DeviceParticipationCard from "./assets/DeviceParticipationCard";
import PerformanceCharts from "./assets/PerformanceCharts";

import lossData from "./data/lossData";
import accuracyData from "./data/accuracyData";

export default function ControlPanel() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    document.title = "分布式人工智能与数据服务";
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const currentRound = 423;
  const totalRounds = 500;
  const progressPercentage = (currentRound / totalRounds) * 100;
  const totalDevices = 50;
  const participationRate = 0.3;
  const participatingDevices = new Set([25, 28, 23, 16, 37, 38, 3, 35, 17, 14, 9, 36, 12, 34, 29]);
  const systemLoad = 86;
  const currentStage = "终端设备本地训练";

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", p: 4 }}>

      <Navigation />

      <Box sx={{ flexGrow: 1, marginLeft: "240px" }}>
        {/* Top Bar */}
        <AppBar position="fixed" sx={{ background: "#B39CD0", height: "72px", zIndex: 1201, marginLeft: "240px", width: "calc(100% - 240px)", boxShadow: "none" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%", borderBottom: "2px solid #B39CD0" }}>
            <Typography variant="h6" noWrap fontWeight="bold" sx={{ color: "#3D315B", display: "flex", alignItems: "center", height: "100%" }}>
              分割联邦学习控制面板
            </Typography>
            
            <Tabs value={selectedTab} onChange={handleChange} textColor="inherit" indicatorColor="secondary" sx={{ height: "100%", display: "flex", alignItems: "center" }}>
              <Tab label="总览" sx={{ color: "#3D315B", fontWeight: "bold", height: "100%", display: "flex", alignItems: "center" }} />
              <Tab label="损失函数与训练精度" sx={{ color: "#3D315B", fontWeight: "bold", height: "100%", display: "flex", alignItems: "center" }} />
              <Tab label="终端设备参与情况" sx={{ color: "#3D315B", fontWeight: "bold", height: "100%", display: "flex", alignItems: "center" }} />
            </Tabs>

            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "#3D315B", display: "flex", alignItems: "center", height: "100%" }}>
              {currentTime}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Control Buttons Box */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            backgroundColor: "#F8E1F4", // Light purple matching sidebar hover
            padding: "12px",
            borderRadius: "12px",
            boxShadow: 2,
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          <Button variant="contained" color="success" onClick={() => alert("Training Started!")}>
            开始训练
          </Button>
          <Button variant="contained" color="error" onClick={() => alert("Training Ended!")}>
            结束训练
          </Button>
          <Button variant="contained" color="primary" onClick={() => alert("Exporting Statistics...")}>
            导出统计数据
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#FFB6B9", color: "#FFF" }} onClick={() => alert("Paused Training!")}>
            暂停训练并存档
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#FFDD67", color: "#000" }} onClick={() => alert("Resumed Training!")}>
            从存档恢复训练
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#A1C181", color: "#FFF" }} onClick={() => alert("Resetting Training...")}>
            重置训练
          </Button>
        </Box>

        {/* Content Area */}
        <Box sx={{ marginTop: "50px", padding: "12px" }}> {/* Reduced padding for less margin to page borders */}
          {selectedTab === 0 && (
            <Box
              maxWidth="1400px" // Increased max width for larger cards
              mx="auto"
              display="grid"
              gridTemplateColumns={{ xs: "1fr", md: "repeat(2, 1fr)" }}
              gap={4} // Increased gap between cards
            >
              {/* Federated Training Progress Card */}
              <Card sx={{ boxShadow: 3, borderRadius: 2, p: 4 }}> {/* Increased padding for larger cards */}
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" align="center" gutterBottom> {/* Increased font size */}
                    分割联邦学习训练进度
                  </Typography>
                  <Typography variant="h6" align="center" gutterBottom> {/* Increased font size */}
                    第 {currentRound} 轮，共 {totalRounds} 轮
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={progressPercentage}
                    sx={{ height: 12, borderRadius: 6, backgroundColor: "#e0e0e0" }} // Slightly thicker progress bar
                  />
                </CardContent>
              </Card>

              {/* Current Federated Learning Stage Card */}
              <Card sx={{ boxShadow: 3, borderRadius: 2, p: 4 }}> {/* Increased padding for larger cards */}
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" align="center" gutterBottom> {/* Increased font size */}
                    当前联邦学习阶段
                  </Typography>
                  <Box display="flex" justifyContent="center" mt={2}>
                    <Chip label={currentStage} color="primary" sx={{ fontSize: 16, padding: "8px 16px" }} /> {/* Increased font size and padding */}
                  </Box>
                </CardContent>
              </Card>

              {/* System Load Gauge Card */}
              <Box sx={{ gridColumn: { xs: "1", md: "1 / -1" } }}> {/* Span full width on larger screens */}
                <SystemLoadGauge systemLoad={systemLoad} participationRate={participationRate} />
              </Box>              
            </Box>
          )}

          {selectedTab === 1 && (
            <Box mt={6} maxWidth="1400px" mx="auto"> {/* Increased max width and top margin */}
              <PerformanceCharts lossData={lossData} accuracyData={accuracyData} />
            </Box>
          )}

          {selectedTab === 2 && (
            <Box mt={6} maxWidth="1400px" mx="auto"> {/* Span full width on larger screens */}
              <DeviceParticipationCard totalDevices={totalDevices} participatingDevices={participatingDevices} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

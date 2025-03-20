import { AppBar, Toolbar, Tabs, Tab, Button, Box, Card, CardContent, Typography, LinearProgress } from "@mui/material";
import { Cpu, Database, Wifi } from "lucide-react";
import React, { useState, useEffect } from "react";

import Navigation from "./assets/Navigation";
import DeviceInteractiveBarCharts from "./assets/DeviceInteractiveBarCharts";

import deviceKanbanData from "./data/deviceKanbanData";

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
              <Tab label="终端设备信息" sx={{ color: "#3D315B", fontWeight: "bold", height: "100%", display: "flex", alignItems: "center" }} />
              <Tab label="统计数据" sx={{ color: "#3D315B", fontWeight: "bold", height: "100%", display: "flex", alignItems: "center" }} />
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

          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
            终端设备信息
          </Typography>

          {selectedTab === 0 && (
            <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "repeat(5, 1fr)" }} gap={3} mx="auto" mt={5}>
              {deviceKanbanData.map((device) => (
                <Card key={device.id} sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom mb={2}>
                      终端设备 {device.id}
                    </Typography>
                    
                    <LinearProgress variant="determinate" value={device.progress} sx={{ height: 8, borderRadius: 4, backgroundColor: "#e0e0e0" }} />

                    {/* CPU */}
                    <Box display="flex" alignItems="center" gap={1} mt={2}>
                      <Cpu color="#3b82f6" size={20} />
                      <Typography variant="body2">计算能力: {device.cpu} GFLOPS</Typography>
                    </Box>

                    {/* Data */}
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <Database color="#10b981" size={20} />
                      <Typography variant="body2">数据样本: {device.data} </Typography>
                    </Box>

                    {/* Transmission Power */}
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <Wifi color="#f97316" size={20} />
                      <Typography variant="body2">传输功率: {device.trans} mW</Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {selectedTab === 1 && (
            <DeviceInteractiveBarCharts deviceKanbanData={deviceKanbanData} />
          )}
        </Box>
      </Box>
    </Box>
  );
}

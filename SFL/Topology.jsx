import React, { useState, useEffect, useRef } from "react";
import { AppBar, Toolbar, Tabs, Tab, Button, Box, Typography } from "@mui/material";
import { DataSet, Network } from "vis-network/standalone";

import Navigation from "./assets/Navigation";

export default function Topology() {
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
  const networkRef = useRef(null);

  useEffect(() => {
    const participatingDevices = [25, 28, 23, 16, 37, 38, 3, 35, 17, 14, 9, 36, 12, 34, 29];
    const offloadingDevices = [25, 34, 12, 23, 17, 35]

    const nodes = new DataSet([
      { id: "server", label: "联邦学习\n参数服务器", color: "#FFB6B9", shape: "circle", font: { color: "#3D315B" } },
      { id: "split", label: "分割学习\n辅助计算\n服务器", color: "#A2D5F2", shape: "circle", font: { color: "#3D315B" } },
      ...Array.from({ length: 50 }, (_, i) => ({
        id: i,
        label: `终端设备\n${i}`,
        color: participatingDevices.includes(i) ? "#FFDD67" : "#E3A587", // Macaron Yellow (active) vs Soft Peach (inactive)
        shape: "box",
        font: { color: "#3D315B" },
      })),
    ]);
    
    const edges = [
      ...participatingDevices.map((id) => ({
        from: "server",
        to: id,
        color: { color: "#FFDD67", highlight: "#FFD700", hover: "#FFD700" }, // Warm macaron yellow
        width: 2,
        length: 200,
      })),
      ...offloadingDevices.map((id) => ({
        from: "split",
        to: id,
        color: { color: "#A2D5F2", highlight: "#89CFF0", hover: "#89CFF0" }, // Soft blue connection
        width: 2,
        length: 240,
      })),
    ];    

    const container = networkRef.current;
    const data = { nodes, edges };
    const options = {
      layout: { improvedLayout: true },
      physics: { enabled: true },
      edges: { width: 2 },
    };
    new Network(container, data, options);
  }, []);

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
              <Tab label="网络拓扑与连接状态" sx={{ color: "#3D315B", fontWeight: "bold", height: "100%", display: "flex", alignItems: "center" }} />
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
        <Box sx={{ marginTop: "50px", padding: "12px" }}>

          {selectedTab === 0 && (
            <Box sx={{ width: "100%", height: "600px" }}>
              <Typography variant="h5" fontWeight="bold" mb={2}>分割联邦学习网络拓扑与连接状态</Typography>
              <Box ref={networkRef} sx={{ width: "100%", height: "100%", border: "1px solid #B39CD0" }} />
            </Box>
          )}
          
        </Box>
      </Box>
    </Box>
  );
}

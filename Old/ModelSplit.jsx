import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Tabs, Tab, Button, Box, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import Navigation from "./assets/Navigation";

export default function ModelSplit() {
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

  // Data for device split choices
  const deviceSplitChoices = [6, 6, 3, 3, 4, 7, 10, 4, 6, 8, 9, 3, 10, 2, 10, 10, 4, 8, 8, 3, 2, 5, 6, 6, 10, 9, 4, 10, 10, 10, 8, 
    3, 7, 8, 9, 4, 2, 4, 9, 6, 6, 9, 4, 9, 10, 7, 4, 9, 8, 8];

  // Transform data into the format required by recharts
  const chartData = deviceSplitChoices.map((choice, index) => ({
    device: `终端设备 ${index}`,
    choice,
  }));

  // Intermediate data size for each layer
  const interDataSize = [25690112, 12845056, 25690112, 6422528, 12845056, 3211264, 3211264, 802816, 320]

  // FLOPs data for each layer
  const layerFlops = [96337920, 929660928, 926449664, 1852096512, 925646848, 1850892288, 462622720, 462723072, 119620106];

  // Calculate total FLOPs
  const totalFlops = layerFlops.reduce((sum, flops) => sum + flops, 0);

  // Macaron-inspired color palette
  const macaronColors = [
    "#A8E6CF", // Mint Green
    "#DCEDC1", // Light Green
    "#FFD3B6", // Peach
    "#FFAAA5", // Coral
    "#FF8B94", // Pink
    "#D4A5A5", // Dusty Rose
    "#99C1B9", // Soft Teal
    "#8BAAAD", // Muted Blue
    "#7E8D85", // Sage Green
  ];

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
              <Tab label="模型数据" sx={{ color: "#3D315B", fontWeight: "bold", height: "100%", display: "flex", alignItems: "center" }} />
              <Tab label="终端设备模型分割" sx={{ color: "#3D315B", fontWeight: "bold", height: "100%", display: "flex", alignItems: "center" }} />
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
            <Box
              maxWidth="1400px" // Increased max width for larger cards
              mx="auto"
              display="flex"
              flexDirection="column"
              gap={4} // Increased gap between cards
            >
              {/* FLOPs Bar */}
              <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
                模型训练计算需求 (FLOPs/层)
              </Typography>
              <Box sx={{ width: "100%", height: "80px", position: "relative", backgroundColor: "#eee", borderRadius: "4px", overflow: "hidden" }}>
                {layerFlops.map((flops, index) => {
                  const width = (flops / totalFlops) * 100; // Calculate width as a percentage of total FLOPs
                  return (
                    <Box
                      key={index}
                      sx={{
                        width: `${width}%`,
                        height: "100%",
                        backgroundColor: macaronColors[index % macaronColors.length],
                        display: "inline-block",
                      }}
                    />
                  );
                })}
              </Box>
              {/* Legend for FLOPs Bar */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
                {layerFlops.map((flops, index) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: "16px",
                        height: "16px",
                        backgroundColor: macaronColors[index % macaronColors.length],
                        borderRadius: "4px",
                      }}
                    />
                    <Typography variant="body1" sx={{ fontSize: "14px" }}>
                      第 {index + 1} 层 ({flops.toLocaleString()} FLOPs)
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Intermediate Data Size Bar */}
              <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold", mt: 4 }}>
                中间数据传输大小 (bit)
              </Typography>
              <Box sx={{ width: "100%", height: "80px", position: "relative", backgroundColor: "#eee", borderRadius: "4px", overflow: "hidden" }}>
                {interDataSize.map((size, index) => {
                  const totalSize = interDataSize.reduce((sum, size) => sum + size, 0);
                  const width = (size / totalSize) * 100; // Calculate width as a percentage of total size
                  return (
                    <Box
                      key={index}
                      sx={{
                        width: `${width}%`,
                        height: "100%",
                        backgroundColor: macaronColors[index % macaronColors.length],
                        display: "inline-block",
                      }}
                    />
                  );
                })}
              </Box>
              {/* Legend for Intermediate Data Size Bar */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
                {interDataSize.map((size, index) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: "16px",
                        height: "16px",
                        backgroundColor: macaronColors[index % macaronColors.length],
                        borderRadius: "4px",
                      }}
                    />
                    <Typography variant="body1" sx={{ fontSize: "14px" }}>
                      第 {index + 1} 层 ({size.toLocaleString()} bits)
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {selectedTab === 1 && (
            <Box maxWidth="1400px" mx="auto" sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ width: "100%", height: "calc(100vh - 200px)" }}>
                <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
                  终端设备模型分割选择
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData} // Pass the transformed data
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }} // Added bottom margin for device labels
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="device" interval={0} angle={-45} textAnchor="end" /> {/* Rotate device labels for readability */}
                    <YAxis />
                    <Tooltip formatter={(value) => `Layer ${value}`} />
                    <Legend wrapperStyle={{ paddingTop: "60px" }} align="center" />
                    <Bar dataKey="choice" fill="url(#colorGradient)" name="Split Layer" />
                    {/* Define the gradient */}
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

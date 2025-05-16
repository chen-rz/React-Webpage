import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

import Navigation from "./assets/Navigation";
import MainPageGauges from "./assets/MainPageGauges";
import MainPageTable from "./assets/MainPageTable";

export default function Main372() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  // Add state for the new gauge metrics with initial static values
  const [experimentStats, setExperimentStats] = useState({
    models: 6,    // Static initial value
    devices: 50,  // Static initial value
    datasets: 5,  // Static initial value
  });

  useEffect(() => {
    document.title = "分布式智能与数据服务"; // "Distributed AI and Data Services"
    
    setExperimentStats({
      models: 6,    // Static initial value
      devices: 50,  // Static initial value
      datasets: 5,  // Static initial value
    });

    // Timer for current time
    const timeTimer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => {
      clearInterval(timeTimer);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", p: 4 }}>

      <Navigation />

      <Box sx={{ flexGrow: 1, marginLeft: "240px" }}>
        {/* Top Bar - Kept as per your original structure */}
        <AppBar position="fixed" sx={{ background: "#B39CD0", height: "72px", zIndex: 1201, marginLeft: "240px", width: "calc(100% - 240px)", boxShadow: "none" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%", borderBottom: "2px solid #B39CD0" }}>
            <Typography variant="h6" noWrap fontWeight="bold" sx={{ color: "#3D315B", display: "flex", alignItems: "center", height: "100%" }}>
              端边协同的分割联邦学习
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "#3D315B", display: "flex", alignItems: "center", height: "100%" }}>
              {currentTime}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Content Area - Kept as per your original structure */}
        
        {/* A spacer for the fixed AppBar might be needed if content is obscured */}
        <Box sx={{ height: "72px" }} /> {/* This acts as a spacer for the AppBar */}
        
        <Box sx={{ marginTop: "0px", padding: "12px" }}> {/* Adjusted marginTop due to spacer */}
          <Box
            maxWidth="1400px" // Increased max width for larger cards
            mx="auto"
            display="grid"
            gridTemplateColumns={{ xs: "1fr", md: "repeat(2, 1fr)" }}
            gap={4} // Increased gap between cards
          >
            <Box sx={{ gridColumn: { xs: "1", md: "1 / -1" } }}> {/* Span full width on larger screens */}
              <MainPageGauges 
                numberOfModels={experimentStats.models}
                numberOfDevices={experimentStats.devices}
                numberOfDatasets={experimentStats.datasets}
              />
              <Box sx={{ marginTop: '24px' }}> {/* Explicit margin-top for spacing. Adjust '24px' as needed. */}
                <MainPageTable />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

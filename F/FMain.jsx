import { AppBar, Toolbar, Tabs, Tab, Button, Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

import Navigation from "./assets/Navigation";

// ********************
import LogViewer from "./assets/LogViewer"; // Import LogViewer component
import { BACKEND_URL } from "./assets/Config"; // Import the fetch URL

export default function FMain() {
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    document.title = "分布式人工智能与数据服务";
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleClick = async () => {
    try {
      const res = await fetch(`http://${BACKEND_URL}/start`, {
        method: "POST",
      });
      const data = await res.json();
      console.log("Training started:", data);
    } catch (err) {
      console.error("Failed to start training:", err);
    }
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
              <Tab label="总览" sx={{ color: "#3D315B", fontWeight: "bold", height: "100%", display: "flex", alignItems: "center" }} />
            </Tabs>
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
          <Button onClick={handleClick}>Start Training</Button>
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
              <LogViewer />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

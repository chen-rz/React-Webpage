import { Toolbar, Typography, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { Home, BarChart, Settings } from "@mui/icons-material";
import { Outlet, Link } from "react-router-dom";
import React from "react";

import logo from "../../logo.svg";

const drawerWidth = 240;

export default function Navigation() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#D8BFD8", // Thistle Purple
            color: "#3D315B", // Deep Navy Purple
            borderRight: "2px solid #B39CD0", // Lavender Border
            overflowX: "hidden", // Prevents horizontal scroll
          },
        }}
      >
        {/* Sidebar Header */}
        <Toolbar sx={{ backgroundColor: "#B39CD0", height: "72px", display: "flex", alignItems: "center", paddingX: "16px" }}>
          <Box display="flex" alignItems="center" gap={1}>
            <img src={logo} alt="Logo" width={40} />
            <Typography variant="h6" noWrap fontWeight="bold">
              FL Dashboard
            </Typography>
          </Box>
        </Toolbar>
        
        <Divider sx={{ backgroundColor: "#B39CD0" }} />

        {/* Navigation Links */}
        <List sx={{ paddingX: "12px" }}>
          {[
            { text: "Home", icon: <Home />, link: "/" },
            { text: "Devices", icon: <BarChart />, link: "/SFL/devices" },
            { text: "Main Panel", icon: <Settings />, link: "/SFL/control" },
          ].map(({ text, icon, link }) => (
            <ListItem 
              button 
              key={text} 
              component={Link} 
              to={link}
              sx={{
                borderRadius: "12px",
                marginBottom: "8px",
                padding: "12px",
                color: "#3D315B",
                "&:hover": { backgroundColor: "#C5A3CF" }, // Light Purple Hover
                "&.Mui-selected, &.Mui-selected:hover": {
                  backgroundColor: "#8A6BBE", // Deeper Purple Active
                  color: "#FFF",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#3D315B" }}>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>        
        {/* Page Content */}
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

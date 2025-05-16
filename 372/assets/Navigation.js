import { Toolbar, Typography, Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Dashboard, Devices, Category, CloudUpload, Public, Home } from "@mui/icons-material";
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
        <Toolbar sx={{ backgroundColor: "#B39CD0", height: "72px", display: "flex", alignItems: "center", paddingX: "6px" }}>
          <Box display="flex" alignItems="center" gap={1}>
            <img src={logo} alt="Logo" width={30} />
            <Typography variant="h8" noWrap fontWeight="bold">
              分布式智能与数据服务
            </Typography>
          </Box>
        </Toolbar>

        {/* TODO Navigation Links */}
        <List sx={{ paddingX: "12px" }}>
          {[
            { text: "主面板", icon: <Dashboard />, link: "/372/main" },
            { text: "终端设备信息", icon: <Devices />, link: "/372/device" },
            { text: "A-设备选择", icon: <Category />, link: "/372/form_a" },
            { text: "B-本地训练卸载", icon: <CloudUpload />, link: "/372/form_b" },
            { text: "C-全局资源配置", icon: <Public />, link: "/372/form_c" },
            { text: "系统首页", icon: <Home />, link: "/" },
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

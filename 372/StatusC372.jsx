import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./assets/Navigation";
import { BACKEND_URL_C } from "./assets/Config";
import DeviceParticipation from "./assets/DeviceParticipation";
import DeviceReach from "./assets/DeviceReach";

export default function StatusC372() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const navigate = useNavigate();

  const totalDevices = 50;
  const [participatingDevices, setParticipatingDevices] = useState([]);
  const [reachedDevices, setReachedDevices] = useState([]);

  useEffect(() => {
    document.title = "分布式智能与数据服务";
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const socket = new WebSocket(`ws://${BACKEND_URL_C}/ws/logs`);
    socket.onmessage = (event) => {
      setLogs((prevLogs) => [...prevLogs, event.data]);

      const message = event.data;
      if (message.includes("chosen clients id: ")) {
        const match = message.match(/\[.*\]/);
        if (match) {
          try {
            const devices = JSON.parse(match[0].replace(/'/g, '"'));
            setParticipatingDevices(devices);
          } catch (e) {
            console.error("Failed to parse device list:", e);
          }
        }
      }
      else if (message.includes("reached clients id: ")) {
        const match = message.match(/\[.*\]/);
        if (match) {
          try {
            const devices = JSON.parse(match[0].replace(/'/g, '"'));
            setReachedDevices(devices);
          } catch (e) {
            console.error("Failed to parse device list:", e);
          }
        }
      }

    };
    return () => socket.close();
  }, [participatingDevices, reachedDevices]);

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", p: 4 }}>
      <Navigation />

      <Box sx={{ flexGrow: 1, marginLeft: "240px" }}>
        <AppBar
          position="fixed"
          sx={{
            background: "#B39CD0",
            height: "72px",
            zIndex: 1201,
            marginLeft: "240px",
            width: "calc(100% - 240px)",
            boxShadow: "none",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
              borderBottom: "2px solid #B39CD0",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ color: "#3D315B" }}
            >
              C - 全局资源配置
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ color: "#3D315B" }}
            >
              {currentTime}
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ height: "72px" }} /> {/* Spacer for AppBar */}

        <Box sx={{ marginTop: 1, padding: 3 }}>
          {/* Back Button */}
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{
              mb: 2,
              fontWeight: "bold",
              borderColor: "#3D315B",
              color: "#3D315B",
              "&:hover": {
                backgroundColor: "#e0d4f7",
                borderColor: "#5A4E8C",
              },
            }}
          >
            ← 返回
          </Button>

          {/* Log Console Section */}
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              mb: 4,
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              日志输出
            </Typography>
            {/* <LogViewer /> */}
            <div style={{
              padding: "1rem",
              backgroundColor: "black",
              color: "limegreen",
              fontFamily: "monospace",
              height: "24rem",
              overflowY: "scroll",
              borderRadius: "0.5rem"
            }}>
              {logs.map((log, index) => (
                <div key={index}>{log}</div>
              ))}
            </div>
          </Paper>

          {/* Device Participation Section */}
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              mb: 4,
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              设备参与情况
            </Typography>
            <DeviceParticipation totalDevices={totalDevices} participatingDevices={participatingDevices}/>
          </Paper>

          {/* Device Reach Section */}
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              mb: 4,
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              设备到达情况
            </Typography>
            <DeviceReach totalDevices={totalDevices} reachedDevices={reachedDevices}/>
          </Paper>

        </Box>
      </Box>
    </Box>
  );
}

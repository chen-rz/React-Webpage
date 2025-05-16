import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Paper,
  Table, TableHead, TableBody, TableRow, TableCell, TableContainer,
  LinearProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./assets/Navigation";
import SplitOffloadSummary from "./assets/SplitOffloadSummary";
import { BACKEND_URL_B } from "./assets/Config";

import { useRef } from "react";

export default function StatusB372() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const navigate = useNavigate();

  const totalDevices = 5;
  const numSplits = 5;

  // inside your component:
  const [deviceStats, setDeviceStats] = useState(
    Array.from({ length: totalDevices }, (_, i) => ({
      id: `Device ${i+1}`,
      compute: 0,
      storage: 0,
      network: 0,
      splitPoint: 0
    }))
  );
  const deviceStatsRef = useRef(deviceStats);

  // keep it in sync
  useEffect(() => {
    deviceStatsRef.current = deviceStats;
  }, [deviceStats]);

  const [splitPointStats, setSplitPointStats] = useState(
    Array.from({ length: totalDevices }, (_, idx) => ({ splitPoint: idx + 1, count: 0 }))
  );

  function ResourceBar({ value, color }) {
    return (
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: "#eee",
          "& .MuiLinearProgress-bar": {
            backgroundColor: color,
          },
        }}
      />
    );
  }

  useEffect(() => {
    document.title = "分布式智能与数据服务";
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    const socket = new WebSocket(`ws://${BACKEND_URL_B}/ws/logs`);
    socket.onmessage = (event) => {
      const msg = event.data;
      setLogs((prev) => [...prev, msg]);

      // 1. Parse each "Split layer for client" line as before...
      if (msg.startsWith("INFO") && msg.includes("Split layer for client")) {
        const m = msg.match(
          /Split layer for client\s+(\d+)\s+is\s+LAYER\s+(\d+),\s*Computing Resource is\s*([\d.]+),\s*Storage resource is\s*([\d.]+)/i
        );
        if (m) {
          const clientIdx  = parseInt(m[1], 10) - 1;
          const splitLayer = parseInt(m[2], 10);
          const compute    = parseFloat(m[3]);
          const storage    = parseFloat(m[4]);
          const network = Math.floor(Math.random() * 23);

          setDeviceStats((prev) => {
          const next = [...prev];
          next[clientIdx] = {
            ...next[clientIdx],
            compute,
            storage,
            network,
            splitPoint: splitLayer
          };
          return next;
          });
        }
      }

      // 2. On "ROUND X Start", recompute splitPointStats from the ref
      if (msg.match(/^INFO.*ROUND\s+\d+\s+Start/i)) {
        const current = deviceStatsRef.current;
        const counts = Array(numSplits).fill(0);

        current.forEach((dev) => {
          if (dev.splitPoint >= 1 && dev.splitPoint <= numSplits) {
            counts[dev.splitPoint - 1]++;
          }
        });

        setSplitPointStats(
          counts.map((c, idx) => ({ splitPoint: idx+1, count: c }))
        );
      }
    };

    return () => socket.close();
  }, []);  // empty deps so socket only opens once


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
              B - 本地训练卸载
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

          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: "16px",
              backgroundColor: "#ffffff",
            }}
          >
            {/* Part 1: Split Offload Summary */}
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              分割联邦学习训练卸载情况
            </Typography>
            <SplitOffloadSummary splitPointStats={splitPointStats} />

            {/* Part 2: Device Offloading Table */}
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
              服务器资源分配情况
            </Typography>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: "#F3E5F5" }}>
                  <TableRow>
                    <TableCell><strong>设备 ID</strong></TableCell>
                    <TableCell><strong>计算资源 (%)</strong></TableCell>
                    <TableCell><strong>存储资源 (%)</strong></TableCell>
                    <TableCell><strong>网络资源 (%)</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deviceStats.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell>{device.id}</TableCell>
                      <TableCell><ResourceBar value={device.compute} color="#82ca9d" /></TableCell>
                      <TableCell><ResourceBar value={device.storage} color="#ffc658" /></TableCell>
                      <TableCell><ResourceBar value={device.network} color="#8884d8" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          
        </Box>
      </Box>
    </Box>
  );
}

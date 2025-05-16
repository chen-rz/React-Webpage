import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  Paper,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "./assets/Navigation";

import { BACKEND_URL_B } from "./assets/Config"; // Import the fetch URL

export default function FormB372() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  const navigate = useNavigate();
  const navigateUrl = "/372/status_b";

  // Form states
  const [dataset, setDataset] = useState("CIFAR-10");
  const [model, setModel] = useState("VGG16");
  const [strategy, setStrategy] = useState("Adaptive");
  const [epochs, setEpochs] = useState(100);
  const [splitPoint, setSplitPoint] = useState("AdaptiveEarly");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://${BACKEND_URL_B}/start`, {
        dataset,
        model,
        strategy,
        epochs,
        splitPoint,
      });
      navigate(navigateUrl);
    } catch (err) {
      alert("Failed to start training.");
      console.error(err);
    }
  };

  useEffect(() => {
    document.title = "分布式智能与数据服务";
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
              noWrap
              fontWeight="bold"
              sx={{
                color: "#3D315B",
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              B - 本地训练卸载
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                color: "#3D315B",
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              {currentTime}
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ height: "72px" }} /> {/* Spacer for AppBar */}

        <Box sx={{ marginTop: "0px", padding: "12px" }}>
          <Box
            maxWidth="600px"
            mx="auto"
            component="form"
            onSubmit={handleSubmit}
          >
            <Paper elevation={3} sx={{ p: 4, borderRadius: "16px" }}>
              <Typography variant="h5" fontWeight="bold" mb={3}>
                分割式联邦学习本地卸载参数设置
              </Typography>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>数据集</InputLabel>
                <Select
                  value={dataset}
                  label="数据集"
                  onChange={(e) => setDataset(e.target.value)}
                >
                  <MenuItem value="CIFAR-10">CIFAR-10</MenuItem>
                  <MenuItem value="CIFAR-100">CIFAR-100</MenuItem>
                  <MenuItem value="FashionMNIST">FashionMNIST</MenuItem>
                  <MenuItem value="MNIST">MNIST</MenuItem>
                  <MenuItem value="TinyImageNet">TinyImageNet</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>本地模型结构</InputLabel>
                <Select
                  value={model}
                  label="本地模型结构"
                  onChange={(e) => setModel(e.target.value)}
                >
                  <MenuItem value="VGG16">VGG16</MenuItem>
                  <MenuItem value="VGG11">VGG11</MenuItem>
                  <MenuItem value="ResNet18">ResNet18</MenuItem>
                  <MenuItem value="ResNet50">ResNet50</MenuItem>
                  <MenuItem value="AlexNet">AlexNet</MenuItem>
                  <MenuItem value="ViTb16">ViTb16</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>卸载策略</InputLabel>
                <Select
                  value={strategy}
                  label="卸载策略"
                  onChange={(e) => setStrategy(e.target.value)}
                >
                  <MenuItem value="LatencyAware">延迟感知</MenuItem>
                  <MenuItem value="EnergyAware">能耗感知</MenuItem>
                  <MenuItem value="Adaptive">自适应卸载</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>切分点策略</InputLabel>
                <Select
                  value={splitPoint}
                  label="切分点策略"
                  onChange={(e) => setSplitPoint(e.target.value)}
                >
                  <MenuItem value="FixedEarly">固定切分点</MenuItem>
                  <MenuItem value="AdaptiveEarly">自适应切分点</MenuItem>
                </Select>
              </FormControl>

              <TextField
                type="number"
                label="本地训练轮数"
                fullWidth
                sx={{ mb: 3 }}
                value={epochs}
                onChange={(e) => setEpochs(Number(e.target.value))}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="button"
                onClick={() => navigate(navigateUrl)}
                sx={{
                  mb: 2,
                  backgroundColor: "#4B3D89",
                  fontWeight: "bold",
                  fontSize: "16px",
                  p: 1.5,
                  "&:hover": {
                    backgroundColor: "#6A5B9A",
                  },
                }}
              >
                查看运行状态
              </Button>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                sx={{
                  backgroundColor: "#3D315B",
                  fontWeight: "bold",
                  fontSize: "16px",
                  p: 1.5,
                  "&:hover": {
                    backgroundColor: "#5A4E8C",
                  },
                }}
              >
                开始训练
              </Button>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

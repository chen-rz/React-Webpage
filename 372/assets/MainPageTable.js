import React from 'react';
import { useState } from 'react';
import { X } from 'lucide-react';
import { 
    Box, Typography, Card,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
    Dialog, DialogTitle, DialogContent, IconButton
} from '@mui/material';

import PerformanceCharts from './PerformanceCharts';
import lossData from '../data/lossData';
import accuracyData from '../data/accuracyData';

const MainPageTable = () => {
  const [openRowId, setOpenRowId] = useState(null);

  const handleOpen = (rowId) => setOpenRowId(rowId);
  const handleClose = () => setOpenRowId(null);

  const trainingHistory = [
    { id: 1, time: '2024-05-12 10:30:04', model: 'ResNet50', dataset: 'CIFAR-100', infoLink: '#' },
    { id: 2, time: '2024-05-11 15:45:12', model: 'VGG16', dataset: 'TinyImageNet', infoLink: '#' },
    { id: 3, time: '2024-05-10 09:12:30', model: 'AlexNet', dataset: 'CIFAR-10', infoLink: '#' },
  ];

  return (
    <Card sx={{ 
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)', 
        borderRadius: '12px', 
        p: { xs: 2, sm: 3 }, 
        backgroundColor: '#f9fafb' 
    }}>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
          训练历史记录
        </Typography>
        <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid #ccc` }}>
          <Table aria-label="training history table">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>时间</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>模型</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>数据集</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trainingHistory.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#f0f0f0' } }}
                >
                  <TableCell component="th" scope="row">
                    {row.time}
                  </TableCell>
                  <TableCell>{row.model}</TableCell>
                  <TableCell>{row.dataset}</TableCell>
                  <TableCell align="center">
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => handleOpen(row.id)}
                      sx={{ 
                        borderColor: '#3D315B', 
                        color: '#3D315B',
                        '&:hover': {
                            backgroundColor: '#2C2A7F',
                            color: '#fff',
                            borderColor: '#2C2A7F',
                        }
                      }}
                    >
                      查看
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* MUI Dialog for showing charts */}
        {trainingHistory.map((row) => (
          <Dialog
            key={row.id}
            open={openRowId === row.id}
            onClose={handleClose}
            maxWidth="lg" // Makes the dialog wider to accommodate charts
            fullWidth // Uses the full width up to maxWidth
            PaperProps={{
              sx: {
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                minHeight: '60vh'
              }
            }}
          >
            <DialogTitle sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              borderBottom: '1px solid #eee',
              py: 2,
              px: 3
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                性能数据: {row.model} - {row.dataset} @ {row.time}
              </Typography>
              <IconButton onClick={handleClose} sx={{ color: 'text.secondary' }}>
                <X size={20} />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 3 }}>
              <PerformanceCharts 
                lossData={lossData} 
                accuracyData={accuracyData} 
              />
            </DialogContent>
          </Dialog>
        ))}
      </Box>
    </Card>
  );
};

export default MainPageTable;

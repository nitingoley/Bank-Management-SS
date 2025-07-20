import React, { useEffect } from "react";
import  useAdminStore  from "../store/adminStore";
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Divider,
  Card,
  CardContent,
  Stack,
  Avatar,
  LinearProgress,
  CircularProgress
} from "@mui/material";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import {
  AccountBalance,
  People,
  AttachMoney,
  TrendingUp,
  AccountCircle,
  Business
} from "@mui/icons-material";

// Mock data for demonstration (can be replaced with real data)
const mockStats = {
  totalUsers: 1242,
  activeUsers: 843,
  totalBalance: 1250000,
  growthRate: 12.5
};

const Dashboard = () => {
  const { accounts, fetchAccounts, loading, error } = useAdminStore();

  const token = localStorage.getItem('token');  

  useEffect(() => {
    if (token) {
      fetchAccounts(token);
    }
  }, [token, fetchAccounts]);

  // Handle empty or invalid data
  const validAccounts = Array.isArray(accounts) ? accounts : [];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  

  // Process data for charts
  const banks = [...new Set(validAccounts.map(acc => acc.bankName))];
  const accountsPerBank = banks.map(bank => 
    validAccounts.filter(acc => acc.bankName === bank).length
  );

  // Charts Data
  const barChartData = {
    labels: banks,
    datasets: [
      {
        label: "Accounts per Bank",
        data: accountsPerBank,
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: banks,
    datasets: [
      {
        label: "Bank Distribution",
        data: accountsPerBank,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: Array.from({length: 12}, (_, i) => `${i+1}/2023`),
    datasets: [
      {
        label: "New Accounts",
        data: [5, 10, 8, 15, 12, 18, 25, 22, 30, 28, 35, 40],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const doughnutData = {
    labels: ['Active', 'Inactive', 'Pending'],
    datasets: [
      {
        data: [65, 15, 20],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 206, 86, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Dashboard Overview
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                  <People fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Users
                  </Typography>
                  <Typography variant="h4">{mockStats.totalUsers}</Typography>
                </Box>
              </Stack>
              <LinearProgress 
                variant="determinate" 
                value={100} 
                sx={{ mt: 2, height: 6, borderRadius: 3 }} 
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56 }}>
                  <AccountBalance fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Active Accounts
                  </Typography>
                  <Typography variant="h4">{mockStats.activeUsers}</Typography>
                </Box>
              </Stack>
              <LinearProgress 
                variant="determinate" 
                value={75} 
                color="success"
                sx={{ mt: 2, height: 6, borderRadius: 3 }} 
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'warning.main', width: 56, height: 56 }}>
                  <AttachMoney fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Balance
                  </Typography>
                  <Typography variant="h4">
                    ${(mockStats.totalBalance / 1000).toFixed(1)}k
                  </Typography>
                </Box>
              </Stack>
              <LinearProgress 
                variant="determinate" 
                value={45} 
                color="warning"
                sx={{ mt: 2, height: 6, borderRadius: 3 }} 
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'info.main', width: 56, height: 56 }}>
                  <TrendingUp fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Growth Rate
                  </Typography>
                  <Typography variant="h4">{mockStats.growthRate}%</Typography>
                </Box>
              </Stack>
              <LinearProgress 
                variant="determinate" 
                value={mockStats.growthRate} 
                color="info"
                sx={{ mt: 2, height: 6, borderRadius: 3 }} 
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Accounts by Bank
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar 
                data={barChartData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 1
                      }
                    }
                  }
                }} 
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Bank Distribution
            </Typography>
            <Box sx={{ height: 300 }}>
              <Pie 
                data={pieChartData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                  },
                }} 
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Monthly Growth
            </Typography>
            <Box sx={{ height: 300 }}>
              <Line 
                data={lineChartData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }} 
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Account Status
            </Typography>
            <Box sx={{ height: 300 }}>
              <Doughnut 
                data={doughnutData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                  },
                }} 
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Accounts */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Recent Accounts
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle2" color="text.secondary">
              Account Holder
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle2" color="text.secondary">
              Bank
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle2" color="text.secondary">
              Account Number
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle2" color="text.secondary">
              User
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ mb: 2 }} />

        {validAccounts.slice(0, 5).map((acc, index) => (
          <React.Fragment key={index}>
            <Grid container spacing={2} alignItems="center" sx={{ py: 1.5 }}>
              <Grid item xs={12} md={3}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
                    <AccountCircle />
                  </Avatar>
                  <Typography variant="body1">
                    {acc.accountHolderName}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 36, height: 36 }}>
                    <Business />
                  </Avatar>
                  <Typography variant="body1">
                    {acc.bankName}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="body1">
                  •••• {acc.accountNumber.slice(-4)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="body1">
                  {acc?.user?.username || "Unknown"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {acc?.user?.email || "No email"}
                </Typography>
              </Grid>
            </Grid>
            {index < validAccounts.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Paper>
    </Box>
  );
};

export default Dashboard;
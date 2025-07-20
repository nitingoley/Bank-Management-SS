import React from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Register = () => {
  const navigate = useNavigate();
  const { form, setFormField, register } = useAuthStore();

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Account
        </Typography>
        <Typography variant="body2" align="center" mb={3} color="text.secondary">
          Please fill in the details to register.
        </Typography>
        <TextField
          label="Username"
          fullWidth
          name="username"
          value={form.username}
          onChange={(e) => setFormField('username', e.target.value)}
          margin="normal"
        />
        <TextField
          label="Email"
          fullWidth
          name="email"
          value={form.email}
          onChange={(e) => setFormField('email', e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          name="password"
          value={form.password}
          onChange={(e) => setFormField('password', e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
          onClick={() => register(navigate)}
        >
          Register
        </Button>
      </Paper>
    </Container>
  );
};

export default Register;

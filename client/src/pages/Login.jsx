import React from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Login = () => {
  const navigate = useNavigate();
  const { form, setFormField, login } = useAuthStore();

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" mb={3}>Login</Typography>
        <TextField
          fullWidth label="Email" margin="normal"
          value={form.email}
          onChange={(e) => setFormField('email', e.target.value)}
        />
        <TextField
          fullWidth label="Password" type="password" margin="normal"
          value={form.password}
          onChange={(e) => setFormField('password', e.target.value)}
        />
        <Button variant="contained" fullWidth onClick={() => login(navigate)}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;

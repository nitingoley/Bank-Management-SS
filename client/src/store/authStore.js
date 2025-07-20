import { create } from 'zustand';
import axios from 'axios';

export const useAuthStore = create((set) => ({
  form: {
    username: '',
    email: '',
    password: '',
  },
  setFormField: (field, value) =>
    set((state) => ({
      form: {
        ...state.form,
        [field]: value,
      },
    })),
  resetForm: () =>
    set({
      form: {
        username: '',
        email: '',
        password: '',
      },
    }),
  login: async (navigate) => {
    try {
      const { email, password } = useAuthStore.getState().form;
      const res = await axios.post('https://bank-management-ss.onrender.com/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  },
  register: async (navigate) => {
    try {
      const { username, email, password } = useAuthStore.getState().form;
      const res = await axios.post('https://bank-management-ss.onrender.com/api/auth/register', {
        username,
        email,
        password,
      });
      alert(res.data.message);
      useAuthStore.getState().resetForm();
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  },
}));

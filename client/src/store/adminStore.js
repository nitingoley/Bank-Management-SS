import { create } from 'zustand';
import axios from 'axios';

const useAdminStore = create((set) => ({
  accounts: [],
  loading: false,
  error: null,

  fetchAccounts: async (token) => {
    set({ loading: true });
    try {
      const res = await axios.get('https://bank-management-ss.onrender.com/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ accounts: res.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error", loading: false });
    }
  },

  fetchAllAccounts: async (token) => { // Keep this for backward compatibility
    return this.fetchAccounts(token);
  },

  searchAccounts: async (query, token) => {
    set({ loading: true });
    try {
      const res = await axios.get(`https://bank-management-ss.onrender.com/api/admin/search?query=${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ accounts: res.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Search failed", loading: false });
    }
  },
}));

export default useAdminStore;

import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./authStore";

const useAccountStore = create((set) => ({
  accounts: [],
  loading: false,

  fetchAccounts: async () => {
    set({ loading: true });
    const token = useAuthStore.getState().token;

    try {
      const { data } = await axios.get("https://bank-management-ss.onrender.com/api/accounts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ accounts: data, loading: false });
    } catch (err) {
      set({ loading: false });
      console.error("Failed to fetch accounts:", err);
    }
  },
}));

export default useAccountStore;

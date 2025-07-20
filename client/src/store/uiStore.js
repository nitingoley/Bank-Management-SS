import { create } from "zustand";

const useUIStore = create((set) => ({
  isSidebarOpen: true,
  selectedTab: "dashboard",

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setTab: (tab) => set({ selectedTab: tab }),
}));

export default useUIStore;

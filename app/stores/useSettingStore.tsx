import { create } from "zustand";
// import { ReactNode } from "react";

type SettingStore = {
  isOpen: boolean;
  position: { x: number; y: number } | null;
  openSetting: (pos: { x: number; y: number }) => void;
  closeSetting: () => void;
};

export const useSettingStore = create<SettingStore>((set) => ({
  isOpen: false,
  position: null,
  openSetting: (pos) => set({ isOpen: true, position: pos }),
  closeSetting: () => set({ isOpen: false, position: null }),
}));

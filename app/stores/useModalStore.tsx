import { create } from "zustand";
import { ReactNode } from "react";

type ModalStore = {
  isOpen: boolean;
  content: ReactNode;
  openPopup: (content: ReactNode) => void;
  closePopup: () => void;
};
export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  content: null,
  openPopup: (content) => set({ isOpen: true, content }),
  closePopup: () => set({ isOpen: false, content: null }),
}));

type UseSetIdStore = {
  classroomId: string;
  setClassroomId: (id: string) => void;
};

export const useSetIdStore = create<UseSetIdStore>((set) => ({
  classroomId: "",
  setClassroomId: (id: string) => set({ classroomId: id }),
}));

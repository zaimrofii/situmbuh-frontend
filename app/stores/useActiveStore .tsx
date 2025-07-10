import { create } from "zustand";

type AddAssessmentProps = {
  addAssessmentActive: boolean;
  setAddAssessmentActive: () => void;
  closeAddAssessmentActive: () => void;
};

export const useAddAssessmentStore = create<AddAssessmentProps>((set) => ({
  addAssessmentActive: false,
  setAddAssessmentActive: () =>
    set((state) => ({ addAssessmentActive: !state.addAssessmentActive })),
  closeAddAssessmentActive: () => set({ addAssessmentActive: false }),
}));

// Create Student
type AddStudentprops = {
  addStudentActive: boolean;
  setAddStudentActive: () => void;
  closeAddStudentActive: () => void;
};

export const useAddStudentStore = create<AddStudentprops>((set) => ({
  addStudentActive: false,
  setAddStudentActive: () =>
    set((state) => ({ addStudentActive: !state.addStudentActive })),
  closeAddStudentActive: () => set({ addStudentActive: false }),
}));

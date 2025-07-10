// ✅ File: types/index.ts

// frontend/types/index.ts

export interface ClassroomType {
  id: string; // UUID
  name: string;
  description?: string; // opsional
}

// --------------------------------------------------------

export interface StudentType {
  id: string; // UUID
  name: string;
  status: string;
  classroom: string; // id classroom
  birth_date?: string; // format YYYY-MM-DD
  gender?: string; // "Male" | "Female" atau kosong
}

// --------------------------------------------------------

export interface AttendanceType {
  id: string; // UUID
  student: string; // id student
  date: string; // auto_now_add (YYYY-MM-DD)
  time: string; // auto_now_add (HH:mm:ss)
  status: "hadir" | "izin" | "sakit" | "bolos";
  note?: string;
}

// --------------------------------------------------------

export type DomainType =
  | "motorik"
  | "kognitif"
  | "bahasa"
  | "sosial"
  | "emosional";

export interface AssessmentPointType {
  id: string; // UUID
  name: string;
  domain: DomainType;
  classroom?: string; // id classroom, optional
}

// --------------------------------------------------------

export interface AssessmentRecordType {
  id: string; // UUID
  student: string; // id student
  point: string; // id assessment point
  score: number; // 1-5 atau 0-100
  note?: string;
  date: string; // auto_now_add (YYYY-MM-DD)
}

// types.ts
export interface AssessmentFormData {
  name: string;
  domain: string;
}

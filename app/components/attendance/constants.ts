// components/attendance/constants.ts
import { StudentType } from "../../types";

export const classrooms = [
  {
    id: "8be0d607-dbde-401e-9db0-c3c56a6171ea",
    label: "Al_quran",
  },
  {
    id: "d17d3110-e460-4bf7-b6aa-7230d2882c77",
    label: "Iqro 1-2",
  },
  {
    id: "73806cfe-08e7-4f55-8063-189c165df314",
    label: "Iqro 3-4",
  },
  {
    id: "46c03770-ec3d-47b1-aefe-82b58849d30c",
    label: "Iqro 5-6",
  },
];

export const dummyStudents: StudentType[] = [
  {
    id: "1",
    name: "Ahmad Rifqi",
    classroom: "Iqro 1-2",
    birth_date: "2015-05-12",
    status: "Active",
    gender: "Male",
  },
  {
    id: "12",
    name: "Ahmad Rifqi",
    classroom: "Iqro 1-2",
    birth_date: "2015-05-12",
    status: "Active",
    gender: "Male",
  },
  {
    id: "13",
    name: "Ahmad Rifqi",
    classroom: "Iqro 1-2",
    birth_date: "2015-05-12",
    status: "Active",
    gender: "Male",
  },
  // ... sisanya
];

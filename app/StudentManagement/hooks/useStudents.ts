"use client";

import { useEffect, useState } from "react";

export type Gender = "Laki-laki" | "Perempuan";

export interface Student {
  id: string;
  name: string;
  classroom: string; // ID
  birth_date: string;
  gender: Gender;
}

// ⚙️ Fetch list students
export async function fetchStudents(): Promise<Student[]> {
  const res = await fetch(`http://localhost:8000/api/students/`);
  return await res.json();
}

// ⚙️ Fetch one classroom name by ID
export async function fetchClassroomName(classroomId: string): Promise<string> {
  const res = await fetch(
    `http://localhost:8000/api/classrooms/${classroomId}/`
  );
  const data = await res.json();
  return data.name;
}

// ⚙️ Save updated student
export async function updateStudent(
  id: string,
  payload: {
    name: string;
    classroom: string;
    birth_date: string;
    gender: Gender;
  }
) {
  return fetch(`http://localhost:8000/api/students/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// ⚙️ Delete a student
export async function deleteStudent(id: string) {
  return fetch(`http://localhost:8000/api/students/${id}/`, {
    method: "DELETE",
  });
}

// ⚙️ Custom hook for student list with data state only
export function useStudentList() {
  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [classroomNames, setClassroomNames] = useState<Record<string, string>>(
    {}
  );

  async function loadStudents() {
    setLoading(true);
    const students = await fetchStudents();
    setData(students);

    // Fetch classroom names
    students.forEach(async (student) => {
      if (student.classroom && !classroomNames[student.classroom]) {
        const name = await fetchClassroomName(student.classroom);
        setClassroomNames((prev) => ({ ...prev, [student.classroom]: name }));
      }
    });

    setLoading(false);
  }

  useEffect(() => {
    loadStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, classroomNames, reload: loadStudents };
}

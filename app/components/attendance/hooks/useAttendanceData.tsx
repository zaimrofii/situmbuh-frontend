// components/attendance/hooks/useAttendanceData.ts
"use client";

import { useState, useEffect, useRef } from "react";
import { StudentType } from "../../../types";
import { AttendanceType } from "../../../types";

export function useAttendanceData(classroomId: string, query: string) {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [isHadir, setIsHadir] = useState<string[]>([]);
  const [isIzin, setIsIzin] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (classroomId && !query) {
      fetchStudents(classroomId);
    }
  }, [classroomId, query]);

  useEffect(() => {
    if (!query) return;
    if (controllerRef.current) controllerRef.current.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    const delay = setTimeout(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/students/search/?q=${query}`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((data) => setStudents(data))
        .catch((err) => {
          if (err.name !== "AbortError") console.error(err);
        });
    }, 300);

    return () => {
      clearTimeout(delay);
      controller.abort();
    };
  }, [query]);

  async function fetchStudents(id: string) {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/classrooms/${id}/`
      );
      if (!res.ok) {
        throw new Error("gagal mengambil classroom data");
      }
      const data = await res.json();
      setStudents(data.students);

      const attRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/attendances/today/`
      );
      const attData: AttendanceType[] = await attRes.json();

      setIsHadir(
        attData.filter((e) => e.status === "hadir").map((e) => e.student)
      );
      setIsIzin(
        attData
          .filter((e) => ["izin", "sakit"].includes(e.status))
          .map((e) => e.student)
      );
    } catch (err) {
      console.error("Failed to fetch students:", err);
    } finally {
      setLoading(false);
    }
  }

  return {
    students,
    isHadir,
    isIzin,
    loading,
    refetch: fetchStudents,
  };
}

import { useEffect, useRef, useState } from "react";
import { StudentType } from "../../types";

export function useFetchStudents(classroomId: string, query: string) {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchStudents = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/classrooms/${id}/`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setStudents(data.students);
      console.log("data :", data);
    } catch (err) {
      console.error("Failed to fetch students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!query && classroomId) fetchStudents(classroomId);
  }, [classroomId]);

  useEffect(() => {
    if (!query) return;

    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    const delay = setTimeout(() => {
      fetch(`http://localhost:8000/api/students/search/?q=${query}`, {
        signal: controller.signal,
      })
        .then((res) => (res.ok ? res.json() : Promise.reject("Network error")))
        .then((data) => setStudents(data))
        .catch((err) => {
          if (err.name !== "AbortError") console.error("Search error:", err);
        });
    }, 300);

    return () => {
      clearTimeout(delay);
      controller.abort();
    };
  }, [query]);

  return { students, loading };
}

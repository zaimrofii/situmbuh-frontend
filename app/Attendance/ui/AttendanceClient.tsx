"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useModalStore } from "../../stores/useModalStore";
import AttendanceHeader from "./AttendanceHeader";
import ClassroomSelector from "./ClassroomSelector";
import StudentList from "./StudentList";
import { StudentType } from "../../types";
import { AttendanceType } from "../../types";
import { AttendancePopUp } from "../../components/popUp/attendancePopUp";
import { PopUp } from "../../components/popUp/popUpStore";
import { SideBar } from "../../components/Menu/sideBar";

export default function AttendanceClient() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sideBarActive, setSideBarActive] = useState(false);
  const [isHadir, setIsHadir] = useState<string[]>([]);
  const [isIzin, setIsIzin] = useState<string[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentType | null>(
    null
  );
  const [students, setStudents] = useState<StudentType[]>([]);
  const [classroomId, setClassroomId] = useState("");
  const [query, setQuery] = useState("");
  const [countStudents, setCountStudents] = useState(0);

  const searchParams = useSearchParams();
  const idFromURL = searchParams.get("classroomId");
  const controllerRef = useRef<AbortController | null>(null);
  const { openPopup, closePopup, content } = useModalStore();

  useEffect(() => {
    if (idFromURL) setClassroomId(idFromURL);
  }, [idFromURL]);

  useEffect(() => {
    if (classroomId && !query) {
      fetchStudents(classroomId);
    }
  }, [classroomId, query]);

  useEffect(() => {
    if (!query) return;

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const delayDebounce = setTimeout(() => {
      fetch(`http://localhost:8000/api/students/search/?q=${query}`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((data) => setStudents(data))
        .catch((err) => {
          if (err.name !== "AbortError") console.error(err);
        });
    }, 300);

    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    const count = students.filter((s) => isHadir.includes(s.id)).length;
    setCountStudents(count);
  }, [students, isHadir]);

  const fetchStudents = async (id: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8000/api/classrooms/${id}/students`
      );
      const data = await res.json();
      setStudents(data);

      const attRes = await fetch(
        "http://localhost:8000/api/attendances/today/"
      );
      const attData = await attRes.json();

      setIsHadir(
        attData
          .filter((e: AttendanceType) => e.status === "hadir")
          .map((e: AttendanceType) => e.student)
      );
      setIsIzin(
        attData
          .filter((e: AttendanceType) => ["izin", "sakit"].includes(e.status))
          .map((e: AttendanceType) => e.student)
      );
    } catch (err) {
      console.error("Failed to fetch students:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        className="w-full h-screen bg-[#1D9C94] relative overflow-hidden"
        onClick={() => {
          setPopupOpen(false);
          setSideBarActive(false);
        }}
      >
        <div className="w-full h-full">
          <AttendanceHeader
            setSideBarActive={setSideBarActive}
            title="Absen Kehadiran"
          />
          <ClassroomSelector
            classroomId={classroomId}
            setClassroomId={setClassroomId}
            setQuery={setQuery}
          />
          <div className="bg-white rounded-t-4xl h-full">
            <div className="pt-3 px-4">
              <input
                type="text"
                placeholder="cari siswa"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-9 px-3 rounded-xl border border-gray-200 placeholder-gray-300"
              />
            </div>
            <div className="w-[85%] py-2 mx-auto flex justify-between">
              <h1>{students.length} Siswa</h1>
              <h1>
                {countStudents} / {students.length}{" "}
                <span className="text-sm text-gray-500">Hadir</span>
              </h1>
            </div>

            {loading ? (
              <div className="text-center text-gray-500 py-4">
                Memuat data siswa...
              </div>
            ) : (
              <StudentList
                students={students}
                isHadir={isHadir}
                isIzin={isIzin}
                classroomId={classroomId}
                openPopup={openPopup}
                closePopup={closePopup}
                setSelectedStudent={setSelectedStudent}
                setPopupOpen={setPopupOpen}
              />
            )}
          </div>
        </div>
        <SideBar
          sideBarActive={sideBarActive}
          setSideBarActive={setSideBarActive}
        />
        <AttendancePopUp
          popupOpen={popupOpen}
          setpopupOpen={setPopupOpen}
          selectedStudent={selectedStudent}
          setIsHadir={setIsHadir}
          setIsIzin={setIsIzin}
          refetchStudents={() => fetchStudents(classroomId)}
        />
        <PopUp>{content}</PopUp>
      </div>
    </Suspense>
  );
}

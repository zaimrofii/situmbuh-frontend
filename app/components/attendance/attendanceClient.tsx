// components/attendance/AttendanceClient.tsx
"use client";

import { useState } from "react";
import { StudentType } from "../../types";
import StudentList from "./StudentList";
import { StudentList as StudentListProgress } from "@/app/Progress/ui/StudentList";
import ClassroomSelectorNav from "./classroomSelectorNav";
import { AttendancePopUp } from "../popUp/attendancePopUp";
import { useModalStore } from "../../stores/useModalStore";
import { useAttendanceData } from "./hooks/useAttendanceData"; // Import hook
import { Menu } from "lucide-react";
import ToolTip from "../ToolTip";
import { useSettingStore } from "@/app/stores/useSettingStore";

export default function AttendanceClient() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [progressActive, setProgressActive] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentType | null>(
    null
  );
  const [classroomId, setClassroomId] = useState("");
  const [query, setQuery] = useState("");
  const { openSetting } = useSettingStore();

  const { students, isHadir, isIzin, loading, refetch } = useAttendanceData(
    classroomId,
    query
  );
  const countStudents = students.filter((s) => isHadir.includes(s.id)).length;

  const { openPopup, closePopup } = useModalStore();

  return (
    <div
      className="w-full h-auto   text-gray-700 relative overflow-hidden"
      onClick={() => {
        setPopupOpen(false);
        // setSideBarActive(false);
      }}
    >
      <div className="w-full bg-green-50 border-b border-gray-200 shadow-md">
        <div className="w-full py-2 pt-3">
          <div className="flex items-center font-semibold justify-between w-[90%] mx-auto">
            <h1>Absen Kehadiran</h1>
            <input
              type="text"
              placeholder="cari siswa"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-[50%] h-9 px-3 rounded-xl border border-gray-400 placeholder-gray-400 placeholder:font-light"
            />
          </div>
        </div>
        <ClassroomSelectorNav
          classroomId={classroomId}
          setClassroomId={setClassroomId}
          setQuery={setQuery}
        />
        <div className="w-full h-auto flex justify-end px-5 ">
          <div
            className="h-9 w-[70%] rounded-xl my-2 shadow-inner border-t-1 border-gray-300 bg-gray-100 relative"
            onClick={() => setProgressActive(!progressActive)}
          >
            <button
              className={`h-10 w-[50%] ${
                progressActive
                  ? "text-[color:var(--green_bg)] font-semibold text-md"
                  : "text-gray-400 text-sm"
              } bg-gray-100/10 z-10 relative  cursor-pointer transition-all`}
            >
              Absensi
            </button>
            <button
              className={`h-10 w-[50%] ${
                progressActive
                  ? "text-gray-400 text-sm"
                  : "text-[color:var(--green_bg)] font-semibold text-md"
              } bg-gray-100/10 z-10 relative  cursor-pointer transition-all`}
            >
              Progress
            </button>
            <div
              className={`h-9 w-[50%] translate-y-0.5 rounded-xl border-2 border-[color:var(--green_bg)]   ${
                progressActive ? "translate-x-0" : "translate-x-full"
              } transition-transform absolute top-0`}
            ></div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 shadow-inner h-full">
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
        ) : progressActive ? (
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
        ) : (
          <StudentListProgress students={students} classroomId={classroomId} />
        )}
      </div>
      <div className="h-full w-full border-t border-gray-200 shadow-2xl px-10 flex justify-end">
        <ToolTip content={"Menu"}>
          {" "}
          <Menu
            className="mt-3 cursor-pointer"
            onClick={(e) => openSetting({ x: e.clientX, y: e.clientY })}
          />
        </ToolTip>
      </div>

      <AttendancePopUp
        refetchStudents={refetch}
        popupOpen={popupOpen}
        setpopupOpen={setPopupOpen}
        selectedStudent={selectedStudent}
        setIsHadir={() => {}} // nanti bisa dihook juga
        setIsIzin={() => {}} // nanti bisa dihook juga
      />
    </div>
  );
}

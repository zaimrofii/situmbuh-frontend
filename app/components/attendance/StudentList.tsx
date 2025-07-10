// ✅ File: components/attendance/StudentList.tsx
"use client";
import Link from "next/link";
// import Image from "next/image";
import { ClipboardCheck, Check } from "lucide-react";
import { StudentType } from "../../types";
import { useEffect } from "react";
import { useSetIdStore } from "../../stores/useModalStore";
// import { dummyStudents } from "./constants";

interface StudentListProps {
  students: StudentType[];
  isHadir: string[];
  isIzin: string[];
  classroomId: string;
  openPopup: (content: React.ReactNode) => void;
  closePopup: () => void;
  setSelectedStudent: (s: StudentType) => void;
  setPopupOpen: (val: boolean) => void;
}

export default function StudentList({
  students,
  isHadir,
  isIzin,
  classroomId,
  openPopup,
  closePopup,
  setSelectedStudent,
  setPopupOpen,
}: StudentListProps) {
  const { setClassroomId } = useSetIdStore();

  useEffect(() => {
    console.log("isHadir :", isHadir, "isIzin:", isIzin, students);
  }, [isHadir, isIzin, students]);
  return (
    <div className="w-full h-[52vh] overflow-y-auto no-scrollbar">
      {students.map((student) => (
        <Link
          href={`Assesment/?studentId=${student.id}&classroomId=${classroomId}`}
          key={student.id}
        >
          <div
            className={`${
              isHadir.includes(student.id)
                ? "font-semibold text-green-600"
                : isIzin.includes(student.id)
                ? "font-semibold text-red-400"
                : ""
            } p-3 flex px-5 group md:hover:bg-white items-center justify-between w-[90%] mx-auto rounded-2xl shadow mb-3  md:shadow-none md:hover:shadow-sm md:mb-0 md:h-15 transition-all  cursor-pointer`}
          >
            <div className="flex items-center gap-3">
              {/* <Image
                // src={`https://ui-avatars.com/api/?name=${student.name}&background=random`}
                alt={student.name}
                width={40}
                height={40}
                className="rounded-full"
              /> */}
              <h1>{student.name}</h1>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (
                  isHadir.includes(student.id) ||
                  isIzin.includes(student.id)
                ) {
                  openPopup(
                    <div className="flex flex-col items-center gap-3">
                      <h1 className="text-lg">Absensi Tersimpan</h1>
                      <Check className="w-12 h-12 text-green-500" />
                    </div>
                  );
                  setTimeout(() => closePopup(), 1000);
                } else {
                  setPopupOpen(true);
                }
                setSelectedStudent(student);
                setClassroomId(classroomId);
              }}
            >
              <ClipboardCheck
                strokeWidth={1}
                className="text-gray-400 h-8 w-8 md:hidden md:group-hover:block transition"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

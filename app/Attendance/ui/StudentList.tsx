// ✅ File: components/attendance/StudentList.tsx
import Link from "next/link";
// import Image from "next/image";
import { ClipboardCheck, Check } from "lucide-react";
import { StudentType } from "../../types";

export default function StudentList({
  students,
  isHadir,
  isIzin,
  classroomId,
  openPopup,
  closePopup,
  setSelectedStudent,
  setPopupOpen,
}: {
  students: StudentType[];
  isHadir: string[];
  isIzin: string[];
  classroomId: string;
  openPopup: (content: React.ReactNode) => void;
  closePopup: () => void;
  setSelectedStudent: (s: StudentType) => void;
  setPopupOpen: (val: boolean) => void;
}) {
  return (
    <div className="w-full h-[65vh] overflow-y-auto scrollbar-hide">
      {students.map((student) => (
        <Link
          href={`Assesment/?studentId=${student.id}&classroomId=${classroomId}`}
          key={student.id}
        >
          <div
            className={`${
              isHadir.includes(student.id)
                ? "border border-green-300"
                : isIzin.includes(student.id)
                ? "border border-red-300"
                : ""
            } p-3 flex items-center justify-between w-[90%] mx-auto rounded-2xl shadow mb-3`}
          >
            <div className="flex items-center gap-3">
              {/* <Image
                src={`https://ui-avatars.com/api/?name=${student.name}&background=random`}
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
              }}
            >
              <ClipboardCheck
                strokeWidth={1}
                className="text-gray-400 h-8 w-8"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

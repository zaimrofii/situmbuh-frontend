// components/attendance/ClassroomSelector.tsx
"use client";
import { classrooms } from "./constants";

interface ClassroomSelectorProps {
  classroomId: string;
  setClassroomId: (val: string) => void;
  setQuery: (val: string) => void;
}

export default function ClassroomSelectorNav({
  classroomId,
  setClassroomId,
  setQuery,
}: ClassroomSelectorProps) {
  return (
    <div className="">
      <div className="w-full px-5 pb-3  flex flex-col text-lg">
        {classrooms.map((cls) => (
          <h1
            key={cls.id}
            onClick={() => {
              setQuery("");
              setClassroomId(cls.id);
            }}
            className={`${
              classroomId === cls.id
                ? "bg-green-100 text-xl font-semibold"
                : "text-gray-600"
            } px-5 py-1 mr-2 cursor-pointer w-full hover:bg-green-100`}
          >
            {cls.label}
          </h1>
        ))}
      </div>
    </div>
  );
}

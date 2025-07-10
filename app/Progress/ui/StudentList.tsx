import Link from "next/link";
import { FileText } from "lucide-react";
import { StudentType } from "../../types";

export function StudentList({
  students,
  classroomId,
}: {
  students: StudentType[];
  classroomId: string;
}) {
  return (
    <div className="w-full h-[52vh] bg-gray-50 shadow overflow-y-auto scrollbar-hide relative">
      {students.map((student) => (
        <Link
          href={`/ProgressDetail?classroomId=${classroomId}`}
          key={student.id}
        >
          <div className="box-border p-3 flex items-center w-[90%] mx-auto rounded-2xl shadow mb-3 justify-between">
            <div className="h-auto w-[80%]">
              <div className="flex items-center gap-3">
                {/* <img
                  src={`https://ui-avatars.com/api/?name=${student.name}&background=random`}
                  className="h-10 w-10 bg-gray-100 rounded-full"
                  alt={student.name}
                /> */}
                <h1 className="font-medium text-base">{student.name}</h1>
              </div>
              <div className="ml-5 flex gap-3 mt-2">
                <div
                  className="h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm"
                  title="2 Domain Baik"
                >
                  2
                </div>
                <div
                  className="h-6 w-6 rounded-full bg-yellow-500 text-white flex items-center justify-center text-sm"
                  title="3 Domain Perhatian"
                >
                  3
                </div>
                <div
                  className="h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center text-sm"
                  title="1 Domain Red Flag"
                >
                  1
                </div>
              </div>
            </div>
            <FileText strokeWidth={1.5} className="h-8 w-8 text-gray-400" />
          </div>
        </Link>
      ))}
      <h1 className="absolute bottom-5 right-5 bg-red-500 rounded-lg py-2 px-5 text-white animate-pulse">
        Maaf fitur ini masih tahap Pengambangan
      </h1>
    </div>
  );
}

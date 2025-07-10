import Link from "next/link";
import { Brain } from "lucide-react";

type props = {
  classroomId: string;
  progressActive: boolean;
};
export function ProgressButton({ classroomId, progressActive }: props) {
  return (
    <div className=" h-12 w-auto shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-green-300 bottom-0 px-5 ">
      <Link href={`/AiChatbot?classroom=${classroomId}`}>
        <div className="h-15 w-15 rounded-full bg-gradient-to-b from-[color:var(--green_bg_secondary)] to-[color:var(--green_bg)] -mt-3 shadow-[0_3px_6px_rgba(0,0,0,0.4)] flex items-center justify-center animate-bounce">
          <Brain className="h-10 w-10 text-white" />
        </div>
      </Link>
      <Link href={`/Attendance?classroomId=${classroomId}`}>
        <div className="h-9 w-[50%] rounded-xl shadow-inner border-t-1 border-gray-300 bg-gray-100 absolute top-2 right-3">
          <button
            className={`h-full w-[50%] ${
              progressActive ? "text-white" : "text-gray-400"
            } bg-gray-100/10 z-10 relative text-sm`}
          >
            Absensi
          </button>
          <button
            className={`h-full w-[50%] ${
              progressActive ? "text-gray-400" : "text-white"
            } bg-gray-100/10 z-10 relative text-sm`}
          >
            Progress
          </button>
          <div
            className={`h-full w-[50%] border-3 border-gray-100 rounded-xl bg-[color:var(--green_bg)] text-sm absolute top-0 ${
              progressActive ? "translate-x-0" : "translate-x-full"
            } transition-transform`}
          ></div>
        </div>
      </Link>
    </div>
  );
}

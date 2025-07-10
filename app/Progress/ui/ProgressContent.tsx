import { Menu } from "lucide-react";
import { StudentList } from "./StudentList";
// import { ClassroomSelector } from "./ClassroomSelector";
import { StudentType } from "@/app/types";
import ToolTip from "@/app/components/ToolTip";
import { useSettingStore } from "@/app/stores/useSettingStore";

type props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  classroomId: string;
  students: StudentType[];
};

export function ProgressContent({
  query,
  setQuery,
  classroomId,
  // setClassroomId,
  students,
}: props) {
  const { openSetting } = useSettingStore();

  return (
    <div className="w-full h-full mx-auto bg-green-50  ">
      <div className="pt-3 flex justify-start relative px-4 h-auto w-auto group mb-2">
        <input
          type="text"
          className="w-[95%] focus:scale-108 transition bg-green-50 z-20 placeholder-gray-300 h-9 px-3 mx-auto block rounded-xl border border-gray-200"
          placeholder="cari siswa"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="w-[85%] py-2 h-10 flex items-center mx-auto gap-3 ">
        <div className="flex gap-1">
          <div className="h-4 w-4 bg-green-500 rounded-full "></div>
          <h1 className="text-sm">Baik</h1>
        </div>
        <div className="flex gap-1">
          <div className="h-4 w-4 bg-yellow-500 rounded-full "></div>
          <h1 className="text-sm">Waspada</h1>
        </div>
        <div className="flex gap-1">
          <div className="h-4 w-4 bg-red-500 rounded-full "></div>
          <h1 className="text-sm">Bahaya</h1>
        </div>
      </div>

      <StudentList students={students} classroomId={classroomId} />
      <div className=" h-auto  flex justify-end items-center px-10">
        <ToolTip content={"Menu"}>
          {" "}
          <Menu
            className="mt-3 cursor-pointer"
            onClick={(e) => openSetting({ x: e.clientX, y: e.clientY })}
          />
        </ToolTip>
      </div>
    </div>
  );
}

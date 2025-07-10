// ✅ File: components/attendance/AttendanceHeader.tsx
import { Menu } from "lucide-react";

export default function AttendanceHeader({
  setSideBarActive,
  title,
}: {
  setSideBarActive: (val: boolean) => void;
  title: string;
}) {
  return (
    <div className="w-full py-5">
      <div className="flex items-center text-white justify-between w-[90%] mx-auto">
        <Menu
          className="w-7 h-7"
          onClick={(e) => {
            e.stopPropagation();
            setSideBarActive(true);
          }}
        />
        <h1>{title}</h1>
      </div>
    </div>
  );
}

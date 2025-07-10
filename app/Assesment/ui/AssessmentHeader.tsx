import { StudentType, ClassroomType } from "../../types";

export function AssessmentHeader({
  student,
  classRoom,
}: {
  student: StudentType;
  classRoom: ClassroomType;
}) {
  return (
    <div className="w-full h-[15%] py-5 flex gap-4 px-10  items-center ">
      {/* <img
        src={`https://ui-avatars.com/api/?name=${student.name.replace(
          " ",
          "+"
        )}`}
        className="h-15 w-15 bg-green-300 rounded-full"
        alt="Avatar"
      /> */}
      <div className="w-[75%] text-white/90">
        <h1 className="font-semibold truncate text-xl md:text-black md:text-2xl">
          {student.name}
        </h1>
        <h2 className="text-md pl-1 md:text-[color:var(--green_bg)]">
          {classRoom.name}
        </h2>
      </div>
    </div>
  );
}

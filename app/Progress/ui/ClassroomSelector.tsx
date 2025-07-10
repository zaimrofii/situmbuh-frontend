type props = {
  classroomId: string;
  setClassroomId: React.Dispatch<React.SetStateAction<string>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  progressActive: boolean;
  setProgressActive: React.Dispatch<React.SetStateAction<boolean>>;
};
export function ClassroomSelector({
  classroomId,
  setClassroomId,
  setQuery,
  progressActive,
}: //   setProgressActive,
props) {
  const classrooms = [
    { id: "8be0d607-dbde-401e-9db0-c3c56a6171ea", label: "Al_quran" },
    { id: "d17d3110-e460-4bf7-b6aa-7230d2882c77", label: "Iqro 1-2" },
    { id: "73806cfe-08e7-4f55-8063-189c165df314", label: "Iqro 3-4" },
    { id: "46c03770-ec3d-47b1-aefe-82b58849d30c", label: "Iqro 5-6" },
  ];
  return (
    <div className="">
      <div className="w-auto px-5  flex flex-col text-lg mb-3">
        {classrooms.map((cls) => (
          <h1
            key={cls.id}
            onClick={() => {
              setQuery("");
              setClassroomId(cls.id);
            }}
            className={`${
              classroomId === cls.id
                ? "bg-green-200 text-xl font-semibold"
                : "text-gray-600"
            } px-5 py-1  cursor-pointer w-auto hover:bg-green-200`}
          >
            {cls.label}
          </h1>
        ))}
      </div>
      <div className="w-full h-auto py-2  flex justify-end px-5 ">
        <div className="h-9 w-[70%] rounded-xl shadow-inner border-t-1 border-gray-300 bg-gray-100 relative ">
          <button
            className={`h-10 w-[50%] ${
              progressActive ? "text-white" : "text-gray-400"
            } bg-gray-100/10 z-10 relative text-sm`}
          >
            Absensi
          </button>
          <button
            className={`h-10 w-[50%] ${
              progressActive ? "text-gray-400" : "text-white"
            } bg-gray-100/10 z-10 relative text-sm`}
          >
            Progress
          </button>
          <div
            className={`h-10 w-[50%] border-3 border-gray-100 rounded-xl bg-[color:var(--green_bg)] text-sm  ${
              progressActive ? "translate-x-0" : "translate-x-full"
            } transition-transform absolute top-0`}
          ></div>
        </div>
      </div>
    </div>
  );
}

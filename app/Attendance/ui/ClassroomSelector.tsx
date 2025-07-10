const classrooms = [
  {
    id: "8be0d607-dbde-401e-9db0-c3c56a6171ea",
    label: "Al_quran",
  },
  {
    id: "d17d3110-e460-4bf7-b6aa-7230d2882c77",
    label: "Iqro 1-2",
  },
  {
    id: "73806cfe-08e7-4f55-8063-189c165df314",
    label: "Iqro 3-4",
  },
  {
    id: "46c03770-ec3d-47b1-aefe-82b58849d30c",
    label: "Iqro 5-6",
  },
];

export default function ClassroomSelector({
  classroomId,
  setClassroomId,
  setQuery,
}: {
  classroomId: string;
  setClassroomId: (val: string) => void;
  setQuery: (val: string) => void;
}) {
  return (
    <div className="py-2 overflow-x-auto no-scrollbar">
      <div className="flex flex-nowrap w-max px-3">
        {classrooms.map((cls) => (
          <button
            key={cls.id}
            onClick={() => {
              setQuery("");
              setClassroomId(cls.id);
            }}
            className={`${
              classroomId === cls.id
                ? "bg-white font-semibold text-[#1D9C94]"
                : "text-[#70CEC9]"
            } px-5 py-1 mr-2 rounded-2xl border border-[#70CEC9] text-sm`}
          >
            {cls.label}
          </button>
        ))}
      </div>
    </div>
  );
}

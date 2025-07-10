import React from "react";
import { AssessmentPointType, ClassroomType } from "../../types";

interface AssessmentItemProps {
  asses: AssessmentPointType;
  classRoom: ClassroomType;
  score: number;
  showOptions: string;
  setShowOptions: React.Dispatch<React.SetStateAction<string>>;
  onPickScore: (score: number) => void;
}

export function AssessmentItem({
  asses,
  classRoom,
  score,
  showOptions,
  setShowOptions,
  onPickScore,
}: AssessmentItemProps) {
  const nilaiOptions = [20, 40, 60, 80];

  return (
    <div className=" px-5 pt-5 p-3 flex items-center justify-between w-[80%] mx-auto rounded-2xl shadow mb-3 relative  ">
      <div className="flex flex-col">
        <h1 className="text-lg font-bold">{asses.name}</h1>
        <span className="text-sm text-[color:var(--green_bg)]">
          {classRoom.name}
        </span>
      </div>

      <h1
        className="px-3 cursor-pointer"
        onClick={(e) => {
          setShowOptions(asses.name);
          e.stopPropagation();
        }}
      >
        {score}
      </h1>

      {showOptions === asses.name && (
        <div className="absolute top-0 right-0 flex flex-col gap-2 p-3 rounded-lg bg-white shadow-xl border border-[color:var(--green_bg)] z-10">
          {nilaiOptions.map((n) => (
            <button
              key={n}
              className="hover:text-[color:var(--green_bg)]  cursor-pointer rounded px-2"
              onClick={() => onPickScore(n)}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

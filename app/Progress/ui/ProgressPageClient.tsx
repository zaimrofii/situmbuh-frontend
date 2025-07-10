"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { useFetchStudents } from "../hooks/useFetchStudents";
import { ClassroomSelector } from "../ui/ClassroomSelector";
import { ProgressContent } from "../ui/ProgressContent";

export default function ProgressPageClient() {
  const [progressActive, setProgressActive] = useState(false);
  const [classroomId, setClassroomId] = useState("");
  const [query, setQuery] = useState("");

  const searchParams = useSearchParams();
  const idFromURL = searchParams.get("classroomId");

  const { students, loading } = useFetchStudents(classroomId, query);

  useEffect(() => {
    if (idFromURL) setClassroomId(idFromURL);
  }, [idFromURL]);

  return (
    <div className="w-auto h-[100vh] bg-green-100 overflow-y-hidden relative text-gray-800">
      <div className="w-full h-auto pt-5">
        <div className="font-semibold px-10 mb-3 text-gray-800">
          <h1>Progress Insight</h1>
        </div>

        <ClassroomSelector
          classroomId={classroomId}
          setClassroomId={setClassroomId}
          setQuery={setQuery}
          setProgressActive={setProgressActive}
          progressActive={progressActive}
        />
      </div>

      <ProgressContent
        classroomId={classroomId}
        query={query}
        setQuery={setQuery}
        students={students}
      />

      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ClipLoader color="#36d7b7" loading={true} size={50} />
        </div>
      )}
    </div>
  );
}

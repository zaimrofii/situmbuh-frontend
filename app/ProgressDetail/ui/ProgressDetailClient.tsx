"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProgressOverview } from "../../Progress/ui/ProgressOverview";
import { ArrowLeft, LineChart } from "lucide-react";
import Link from "next/link";

export default function ProgressDetailClient() {
  const [domainDetail, setDomainDetail] = useState("");
  const search = useSearchParams();
  const classroomId = search.get("classroomId") ?? "";

  return (
    <div className="w-full h-[100vh] bg-[#1D9C94] md:bg-white overflow-y-hidden relative">
      <div className="h-[15%] w-full px-5 md:px-10">
        <div className="flex justify-between text-xl md:text-3xl pt-5 text-white md:text-black">
          <Link
            href={`/Progress?classroomId=${classroomId}`}
            className="md:hidden"
          >
            <ArrowLeft />
          </Link>
          <div className="flex flex-col items-end md:items-start">
            <h1>Sugeng Santoso</h1>
            <h1 className="text-sm ml-2 md:text-lg text-gray-500">Iqro 1-2</h1>
          </div>
        </div>
      </div>

      <div className="w-full md:w-[80%] mx-auto h-[100vh] rounded-t-4xl bg-white">
        <div className="mx-auto w-[90%] pt-5 block">
          <ProgressOverview
            setDomainDetail={setDomainDetail}
            domainDetail={domainDetail}
          />
        </div>

        <Link href={`/ChartPage?classroomId=${classroomId}`}>
          <button className="h-10 px-5 w-[90%] mx-auto rounded-xl bg-[color:var(--green_bg)] text-white border-b-2 border-black/20 flex items-center justify-center gap-3 mt-5 cursor-pointer">
            <LineChart /> Lihat Grafik Skor
          </button>
        </Link>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
// import { notFound } from "next/navigation";
import { ProgressOverview } from "./ProgressOverview";
import { DomainDetail } from "./DomainDetail";
import { ArrowLeft, LineChart } from "lucide-react";

// const ProgressDetail = () => {
//   return notFound();
// };

const ProgressDetail = () => {
  const [domainDetail, setDomainDetail] = useState<string>("");
  const search = useSearchParams();
  const classroomId = search.get("classroomId");
  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-[#1D9C94] overflow-y-hidden relative">
        <div className="h-[15%] w-full px-5">
          <div className="flex justify-between text-xl pt-5 text-white ">
            <Link
              href={`/Progress?classroomId=${classroomId}`}
              className="md:hidden"
            >
              <ArrowLeft />
            </Link>
            <div className="flex flex-col items-end">
              <h1>Sugeng Santoso</h1>
              <h1 className="text-sm">Iqro 1-2</h1>
            </div>
          </div>
        </div>
        <div className="w-full h-[100vh] rounded-t-4xl bg-white">
          <div className=" mx-auto w-[90%] pt-5 block">
            {domainDetail ? (
              <DomainDetail />
            ) : (
              <ProgressOverview
                setDomainDetail={setDomainDetail}
                domainDetail={domainDetail}
              />
            )}
          </div>
          <Link href={`/ChartPage?classroomId=${classroomId}`}>
            <button className="h-10 px-5 w-[90%] mx-auto rounded-xl bg-[color:var(--green_bg)] text-white border-b-2 border-black/20 flex items-center justify-center gap-3 mt-5 ">
              <LineChart /> Lihat Grafik Skor
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProgressDetail;

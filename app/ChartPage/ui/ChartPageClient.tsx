"use client";
import React from "react";
import { Chart } from "./Chart";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ChartDekstop } from "./ChartDekstop";

const ChartPageClient = () => {
  // const [domainDetail, setDomainDetail] = useState<boolean>(false);
  const search = useSearchParams();
  const classroomId = search.get("classroomId");
  return (
    <>
      <div className="w-full h-[100vh] bg-[#1D9C94] md:bg-white overflow-y-hidden relative md:px-10">
        <div className="h-[15%] w-full px-5 md:px-10 ">
          <div className="flex justify-between text-xl pt-5 text-white md:text-black  ">
            <Link href={`/ProgressDetail?classroomId=${classroomId}`}>
              <ArrowLeft />
            </Link>
            <div className="flex flex-col items-end">
              <h1>Sugeng Santoso</h1>
              <h1 className="text-sm">Iqro 1-2</h1>
            </div>
          </div>
        </div>
        <div className="w-full h-full rounded-t-4xl  bg-white px-5 overflow-y-scroll pb-40">
          <div className=" mx-auto h-auto pt-5 block  ">
            <Chart />
            <ChartDekstop />
          </div>

          <div className="p-3 px-5 bg-white rounded-xl shadow-md mt-3">
            <h1 className="font-semibold mb-2">Tambah Catatan :</h1>
            <textarea
              name=""
              id=""
              className="border border-gray-400 rounded-xl w-full h-22 p-3"
              placeholder="tulis disini..."
            ></textarea>
            <button className="button bg-[#1d9c94] text-white mt-2">
              Kirim Catatan
            </button>
          </div>
        </div>
        <div className="text-white text-sm shadow p-3 bg-red-500 rounded-lg fixed bottom-13 right-3 animate-pulse md:right-10">
          <h1>Data diatas hanya simulasi, </h1>
          <h1>Fitur masih tahap Pengembangan !</h1>
        </div>
      </div>
    </>
  );
};

export default ChartPageClient;

import { ArrowBigLeft } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center text-2xl text-gray-400">
      <div className="flex flex-col items-center justify-center h-auto w-120 text-center">
        <h1>
          Silakan klik kelas di sebelah kiri dan pilih siswa untuk memulai
          absensi dan penilaian
        </h1>
        <ArrowBigLeft strokeWidth={1} className="h-20 w-20 animate-pulse  " />
      </div>
    </div>
  );
};

export default page;

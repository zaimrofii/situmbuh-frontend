"use client";

import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";

export default function ButtonSelect() {
  return (
    <div className="w-[100vw] h-[100vh] bg-[#1D9C94] overflow-y-hidden relative">
      {/* Dekorasi awan */}
      <Image
        src="/awan.png"
        alt="Logo"
        width={150}
        height={150}
        className="mx-auto mb-10 opacity-15 absolute -left-5 top-5"
      />
      <Image
        src="/awan.png"
        alt="Logo"
        width={140}
        height={140}
        className="mx-auto mb-10 opacity-15 absolute -right-5 top-40"
      />
      <Image
        src="/school-vect.png"
        alt="Logo"
        width={300}
        height={300}
        className="mx-auto mb-10 opacity-15 absolute -right-10 bottom-0"
      />

      {/* Daftar tombol kelas */}
      <div className="pt-20">
        <Image
          src="/logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="mx-auto mb-10 brightness-150"
        />

        {/* Button 1 */}
        <Link href="/Attendance?classroomId=d17d3110-e460-4bf7-b6aa-7230d2882c77">
          <ButtonClass label="Iqro 1-2" />
        </Link>

        {/* Button 2 */}
        <Link href="/Attendance?classroomId=73806cfe-08e7-4f55-8063-189c165df314">
          <ButtonClass label="Iqro 3-4" />
        </Link>

        {/* Button 3 */}
        <Link href="/Attendance?classroomId=46c03770-ec3d-47b1-aefe-82b58849d30c">
          <ButtonClass label="Iqro 5-6" />
        </Link>

        {/* Button 4 */}
        <Link href="/Attendance?classroomId=8be0d607-dbde-401e-9db0-c3c56a6171ea">
          <ButtonClass label="Al-Quran" />
        </Link>
      </div>

      <h1 className="text-center text-[8px] font-thin text-white absolute bottom-2 left-1/2 -translate-x-1/2">
        dikembangkan oleh Pii Similikiti
      </h1>
    </div>
  );
}

/** Komponen button */
function ButtonClass({ label }: { label: string }) {
  return (
    <button className="h-15 w-[80%] sm:w-[65%] md:w-[50%] xl:w-[35%] cursor-pointer text-xl text-white relative mx-auto rounded-3xl border-t-2 border-white/50 block mb-4">
      <div className="h-full w-full bg-white/10 rounded-3xl border-b-2 border-black/15"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 items-center">
        <Home className="w-6 h-6" />
        <h1>{label}</h1>
      </div>
    </button>
  );
}

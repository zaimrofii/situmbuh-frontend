"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  sideBarActive: boolean;
  setSideBarActive: React.Dispatch<React.SetStateAction<boolean>>;
};
export const SideBar = ({ sideBarActive, setSideBarActive }: Props) => {
  return (
    <>
      <div
        className={`fixed transition duration-80 ${
          sideBarActive ? "translate-x0" : "-translate-x-full"
        } w-[60%] h-[100vh] shadow bg-[color:var(--green_bg)]  top-0  z-30`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ArrowLeft
          className="text-white m-5"
          onClick={() => setSideBarActive(false)}
        />
        <div className="text-white text-lg  px-5 mt-10 flex flex-col items-start gap-2">
          <button>Dashboard</button>
          <Link href={"/StudentManagement"}>
            <button>+ Siswa</button>
          </Link>

          <Link href="/AddAssesment">
            <button>+ Poin Penilaian</button>
          </Link>
        </div>
      </div>
    </>
  );
};

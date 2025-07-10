"use client";

import { PlusSquare, UserPlus } from "lucide-react";
import React from "react";
import { useSettingStore } from "../../stores/useSettingStore";
import Link from "next/link";

const Menu = () => {
  const isOpen = useSettingStore((state) => state.isOpen);
  const closeSetting = useSettingStore((state) => state.closeSetting);
  const position = useSettingStore((state) => state.position);

  if (!isOpen || !position) return null;
  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed bottom-0 right-0 z-999 w-full h-full bg-gray-900/20 `}
      onClick={() => closeSetting()}
    >
      <div
        className=" absolute bottom-10 left-[26%] h-30 w-auto rounded-xl px-2 bg-green-50 border border-gray-200 py-5 shadow-md text-gray-800"
        onClick={(e) => e.stopPropagation()}
        style={{
          left: position.x + 70,
          top: position.y - 20,
          transform: "translate(0, -100%)",
        }}
      >
        <Link href="/StudentManagement">
          <button
            className="flex gap-3 w-full p-2 px-5 hover:bg-green-100 cursor-pointer rounded-md"
            onClick={() => closeSetting()}
          >
            <UserPlus />
            <span className="">Kelola Siswa</span>
          </button>
        </Link>

        <Link href="/AddAssesment">
          <button
            className="flex gap-3 w-full p-2 px-5 hover:bg-green-100 cursor-pointer rounded-md"
            onClick={() => closeSetting()}
          >
            <PlusSquare />
            <span className="">Kelola Point Penilaian</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Menu;

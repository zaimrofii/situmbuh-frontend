"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import ButtonSelect from "./components/button/ClassButton";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth > 768) {
        router.replace("/BlankPage"); // redirect saat mobile
      }
    }
  }, []);

  return (
    <div className="block fixed top-0 right-0 z-9999 lg:hidden w-full h-[100vh]">
      <ButtonSelect />
    </div>
  );
};

export default Page;

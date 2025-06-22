import { ClassButton } from "./components/classButton/ClassButton";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-[#1D9C94] overflow-y-hidden relative">
        <Image
          src="/awan.png"
          alt="Logo"
          width={150}
          height={150}
          className="mx-auto mb-10  opacity-15 absolute -left-5 top-5"
        />
        <Image
          src="/awan.png"
          alt="Logo"
          width={140}
          height={140}
          className="mx-auto mb-10  opacity-15 absolute -right-5 top-40"
        />
        <Image
          src="/school-vect.png"
          alt="Logo"
          width={300}
          height={300}
          className="mx-auto mb-10  opacity-15 absolute -right-10 bottom-0"
        />
        <ClassButton />
        <h1 className=" text-center text-[8px] font-thin text-white absolute bottom-2 left-1/2 -translate-x-1/2">
          dikembangkan oleh Pii Similikiti
        </h1>
      </div>
    </>
  );
}

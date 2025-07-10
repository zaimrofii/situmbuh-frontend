"use client";

import { useModalStore } from "../../stores/useModalStore";
type PopUpProps = {
  children: React.ReactNode;
};
export const PopUp: React.FC<PopUpProps> = ({ children }) => {
  const { isOpen, closePopup } = useModalStore();

  return (
    <>
      <div
        className={`transition-transform fixed h-full w-full top-0 left-0 ${
          isOpen ? "scale-100" : "scale-0"
        }  z-50000 `}
        onClick={() => closePopup()}
      >
        <div
          className="absolute h-auto top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-5 rounded-xl shadow-xl border border-gray-300 w-[80vw] md:w-[20vw]  z-100 flex flex-col gap-3 items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
};
export default PopUp;

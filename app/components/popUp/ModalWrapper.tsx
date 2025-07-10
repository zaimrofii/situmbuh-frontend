// app/components/ModalWrapper.tsx
"use client";

import { useModalStore } from "@/app/stores/useModalStore";
import PopUp from "./popUpStore";

export default function ModalWrapper() {
  const { content, closePopup } = useModalStore();

  return (
    <div className="fixed w-full h-full " onClick={() => closePopup()}>
      {" "}
      <PopUp>{content}</PopUp>
    </div>
  );
}

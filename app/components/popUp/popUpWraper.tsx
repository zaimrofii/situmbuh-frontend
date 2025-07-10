"use client";

import React from "react";
import { useModalStore } from "../../stores/useModalStore";
import PopUp from "../popUp/popUpStore";

const PopUpWraper = () => {
  const content = useModalStore((state) => state.content);

  return (
    <div className="fixed w-full h-full" onClick={() => {}}>
      <PopUp>{content}</PopUp>
    </div>
  );
};

export default PopUpWraper;

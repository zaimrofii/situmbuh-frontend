"use client";
import { useState } from "react";
import { useFloating, offset, flip, shift } from "@floating-ui/react";

interface ToolTipProps {
  content: string;
  children: React.ReactNode;
}

const ToolTip = ({ content, children }: ToolTipProps) => {
  const [open, setOpen] = useState(false);
  const { x, y, strategy, refs } = useFloating({
    placement: "top",
    middleware: [offset(8), flip(), shift()],
  });

  return (
    <div
      ref={refs.setReference}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="inline-block"
    >
      {children}

      {open && (
        <div
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            zIndex: 9999,
          }}
          className="px-3 py-1 rounded-md bg-gray-800 text-gray-200 text-sm shadow-lg"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default ToolTip;

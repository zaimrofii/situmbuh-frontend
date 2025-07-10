"use client";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import React, { useState } from "react";

export default function SplitLayout({
  leftContent,
  rightContent,
}: {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}) {
  const [sizes, setSizes] = useState([100, 300]);
  return (
    <SplitPane
      split="vertical"
      sizes={sizes}
      className="SplitPane"
      allowResize={true}
      onChange={setSizes}
      sashRender={(index, active) => (
        <div
          className={` bg-gray-300 cursor-col-resize hover:bg-gray-400 ${
            active ? "bg-blue-500" : ""
          }`}
        />
      )}
    >
      <Pane className="Pane  bg-green-50 border-r border-gray-200 overflow-y-auto">
        {leftContent}
      </Pane>
      <Pane className="Pane  overflow-y-auto bg-white">{rightContent}</Pane>
    </SplitPane>
  );
}

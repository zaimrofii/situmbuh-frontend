// components/attendance/AttendancePage.tsx
"use client";
import { Suspense } from "react";
import AttendanceClient from "./attendanceClient";

export default function AttendancePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AttendanceClient />
    </Suspense>
  );
}

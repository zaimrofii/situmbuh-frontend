import { Suspense } from "react";
import AttendanceClient from "./ui/AttendanceClient";

export default function AttendancePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AttendanceClient />
    </Suspense>
  );
}

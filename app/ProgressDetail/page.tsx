import { Suspense } from "react";
import ProgressDetailClient from "./ui/ProgressDetailClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProgressDetailClient />
    </Suspense>
  );
}

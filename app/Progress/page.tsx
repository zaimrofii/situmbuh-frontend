import { Suspense } from "react";
import ProgressPageClient from "./ui/ProgressPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProgressPageClient />
    </Suspense>
  );
}

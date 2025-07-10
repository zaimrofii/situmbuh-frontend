import { Suspense } from "react";
import ChartPageClient from "./ui/ChartPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChartPageClient />
    </Suspense>
  );
}

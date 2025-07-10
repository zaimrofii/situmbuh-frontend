import { Suspense } from "react";
import MainAssessmentPage from "./ui/MainAssessmentPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainAssessmentPage />
    </Suspense>
  );
}

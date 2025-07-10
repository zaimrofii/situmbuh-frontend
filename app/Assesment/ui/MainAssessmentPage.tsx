"use client";

import { useSearchParams } from "next/navigation";
import { useState, useCallback, Suspense } from "react";
import { useAssessmentData } from "../hooks/useAssessmentData";
import { submitAssessmentScores, deleteStudent } from "../hooks/function"; // <-- langsung dari service
import { AssessmentHeader } from "./AssessmentHeader";
import { AssessmentItem } from "./AssessmentItem";
import { ClipLoader } from "react-spinners";
import { useModalStore } from "@/app/stores/useModalStore";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MainAssessmentPage() {
  const searchParams = useSearchParams();
  const studentId = searchParams.get("studentId")!;
  const classroomId = searchParams.get("classroomId")!;
  const { student, classRoom, assessments, loading, fetchData } =
    useAssessmentData(studentId, classroomId);
  const { openPopup, closePopup } = useModalStore();
  const [showOptions, setShowOptions] = useState<string>("");
  const [scoresById, setScoresById] = useState<{ [assesId: string]: number }>(
    {}
  );
  const router = useRouter();

  const handlePickScore = useCallback((assesId: string, score: number) => {
    setScoresById((prev) => ({ ...prev, [assesId]: score }));
    setShowOptions("");
  }, []);

  const handleSave = async () => {
    const payload = Object.keys(scoresById).map((assesId) => ({
      point: assesId,
      score: scoresById[assesId],
    }));
    await submitAssessmentScores(studentId, payload);

    openPopup(
      <div className="flex flex-col items-center justify-center h-full">
        <h1>Berhasil mengirim score</h1>
        <Check className="text-green-500 w-12 h-12 mt-5" />
      </div>
    );

    setScoresById({});
    setTimeout(() => closePopup(), 800);
  };

  const handleDelete = async () => {
    const success = await deleteStudent(studentId);
    if (success) {
      await fetchData();
      openPopup(
        <div className="flex flex-col items-center justify-center h-full">
          <h1>Berhasil menghapus siswa</h1>
          <Check className="text-green-500 w-12 h-12 mt-5" />
        </div>
      );

      setTimeout(() => closePopup(), 800);
      router.replace("/BlankPage");
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        className="w-full h-screen bg-[color:var(--green_bg)] md:bg-white overflow-y-hidden"
        onClick={() => {
          if (showOptions) setShowOptions("");
        }}
      >
        {student && classRoom && (
          <AssessmentHeader student={student} classRoom={classRoom} />
        )}
        <div className="h-[85vh] bg-white rounded-t-4xl py-5 overflow-y-auto">
          {assessments.map((asses) => (
            <AssessmentItem
              key={asses.id}
              asses={asses}
              classRoom={classRoom!}
              score={scoresById[asses.id] || 0}
              showOptions={showOptions}
              setShowOptions={setShowOptions}
              onPickScore={(n) => handlePickScore(asses.id, n)}
            />
          ))}

          <div className="flex gap-5 justify-end w-[80%] mx-auto mt-10">
            <button
              className="bg-white cursor-pointer text-red-500 p-2 rounded-xl px-10 border border-red-200"
              onClick={() => {
                openPopup(
                  <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-center">
                      Anda yakin ingin menghapus siswa ini?
                    </h1>
                    <div className="flex gap-5 mt-5">
                      <button
                        className="button border border-red-300 text-red-500"
                        onClick={() => closePopup()}
                      >
                        Batal
                      </button>
                      <button
                        className="button border bg-[color:var(--green_bg)] text-white "
                        onClick={handleDelete}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                );
              }}
            >
              Hapus Siswa
            </button>
            <button
              className="bg-[color:var(--green_bg)] text-white p-2 rounded-xl px-10"
              onClick={handleSave}
            >
              {loading ? <ClipLoader size={24} /> : "Simpan Nilai"}
            </button>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

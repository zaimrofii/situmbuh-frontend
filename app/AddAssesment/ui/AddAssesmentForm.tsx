"use client";
import { Check } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useModalStore } from "../../stores/useModalStore";
import { PopUp } from "../../components/popUp/popUpStore";
import { useAddAssessment } from "../hooks/useAddAssessment";
import { AssessmentForm } from "../ui/AssessmentForm";
import { useAddAssessmentStore } from "@/app/stores/useActiveStore ";

export default function AddAssesmentForm() {
  const { openPopup, closePopup, content } = useModalStore();
  const { setAddAssessmentActive, addAssessmentActive } =
    useAddAssessmentStore();

  const {
    register,
    // assesmentName,
    // domain,
    newAssesment,
    setNewAssesment,
    saveAssessments,
    loading,
    reset,
  } = useAddAssessment();

  return (
    <div
      className={`${
        addAssessmentActive ? "block " : "hidden "
      } w-full h-screen bg-black/10  fixed top-0 left-0 z-9999 transition-all duration-100`}
      onClick={setAddAssessmentActive}
    >
      <div
        className={` absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[90vh]  overflow-hidden bg-white rounded-2xl shadow-lg transition-all`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="w-full h-[13%] py-5 gap-5 text-white bg-[color:var(--green_bg)]  flex px-8 items-center">
          <h1 className="text-2xl font-semibold">Tambah Point Penilaian</h1>
        </div>

        {/* Form */}
        <AssessmentForm
          register={register}
          newAssesment={newAssesment}
          setNewAssesment={setNewAssesment}
          reset={reset}
          canSave={newAssesment.length > 0}
          onSave={async () => {
            await saveAssessments();
            openPopup(
              <div className="flex flex-col items-center justify-center gap-5">
                <h1>Penilaian Berhasil disimpan</h1>
                <Check className="h-12 w-12 text-green-500" />
              </div>
            );
            setTimeout(() => closePopup(), 800);
          }}
        />

        {/* Popup and Loader */}
        <PopUp>{content}</PopUp>
        {loading && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <ClipLoader color="#36d7b7" size={50} />
          </div>
        )}
      </div>
    </div>
  );
}

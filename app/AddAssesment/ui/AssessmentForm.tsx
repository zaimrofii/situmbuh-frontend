"use client";

import { Dispatch, SetStateAction } from "react";
import { UseFormRegister } from "react-hook-form";
import { AssessmentFormData } from "../../types";
import { useAddAssessmentStore } from "../../stores/useActiveStore ";

type AssessmentFormProps = {
  register: UseFormRegister<AssessmentFormData>;
  newAssesment: AssessmentFormData[];
  setNewAssesment: Dispatch<SetStateAction<AssessmentFormData[]>>;
  reset: () => void;
  onSave: () => void;
  canSave: boolean;
};

export function AssessmentForm({
  register,
  newAssesment,
  setNewAssesment,
  reset,
  onSave,
  canSave,
}: AssessmentFormProps) {
  const { setAddAssessmentActive } = useAddAssessmentStore();
  return (
    <div className="md:pt-5 pt-10 px-20 relative h-[75vh] w-full overflow-y-scroll">
      {/* Input */}
      <div>
        <h1>Masukkan Point Penilaian:</h1>
        <div className="flex flex-col gap-3 mt-2 w-full items-end">
          <input
            type="text"
            className="h-10 w-full border rounded-xl border-gray-400 px-3"
            {...register("name")}
            placeholder="Tambah Penilaian ..."
          />
          <select
            className="h-10 w-full border rounded-xl border-gray-400 px-3"
            {...register("domain")}
          >
            <option value="">Pilih Kategori</option>
            <option value="motorik">Motorik</option>
            <option value="kognitif">Kognitif</option>
            <option value="bahasa">Bahasa</option>
            <option value="sosial">Sosial</option>
            <option value="emosional">Emosional</option>
          </select>
          <button
            className="button text-white bg-[color:var(--green_bg)] mr-5"
            onClick={() => {
              // kita ambil nilai langsung dari DOM agar cepat
              const nameInput = (
                document.querySelector('input[name="name"]') as HTMLInputElement
              )?.value;
              const domainInput = (
                document.querySelector(
                  'select[name="domain"]'
                ) as HTMLSelectElement
              )?.value;

              if (nameInput && domainInput) {
                setNewAssesment((prev) => [
                  ...prev,
                  { name: nameInput, domain: domainInput },
                ]);
                reset();
              }
            }}
          >
            Tambah
          </button>
        </div>
      </div>

      {/* List */}
      <div className="mt-5">
        <h1>Daftar Penilaian:</h1>
        <div className="flex flex-col gap-2 mt-2">
          {newAssesment.map((assesment, index) => (
            <div
              key={index}
              className="bg-gray-200 w-[90%] px-5 py-2 rounded-xl flex items-center justify-between"
            >
              <h1 className="break-words w-[90%] ">
                {assesment.name} —{" "}
                <span className="italic text-sm">{assesment.domain}</span>
              </h1>
              <button
                onClick={() =>
                  setNewAssesment((prev) => prev.filter((_, i) => i !== index))
                }
                className="cursor-pointer"
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end mt-20 mb-10 px-5 gap-2">
        <button
          className="button text-white bg-gray-400"
          onClick={() => {
            setNewAssesment([]); // Kosongkan list penilaian
            reset(); // Reset nilai input form
            setAddAssessmentActive(); // Tutup pop-up
          }}
        >
          Batal
        </button>
        <button
          className={`button ${
            canSave ? "bg-[color:var(--green_bg)]" : "bg-gray-400"
          } text-white`}
          onClick={onSave}
          disabled={!canSave}
        >
          Simpan
        </button>
      </div>
    </div>
  );
}

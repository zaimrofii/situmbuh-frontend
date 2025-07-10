"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, Check } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useModalStore } from "../stores/useModalStore";
import { PopUp } from "../components/popUp/popUpStore";
import { useRouter } from "next/navigation";

interface AssessmentFormData {
  name: string;
  domain: string;
}

export default function AddAssesmentForm() {
  const { register, reset, watch } = useForm<AssessmentFormData>();
  const name = watch("name");
  const domain = watch("domain");

  const [newAssesment, setNewAssesment] = useState<AssessmentFormData[]>([]);
  const [loading, setLoading] = useState(false);

  const { openPopup, closePopup, content } = useModalStore();
  const router = useRouter();

  async function saveAssessments() {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/assessment-points/",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            newAssesment.map((e) => ({ name: e.name, domain: e.domain }))
          ),
        }
      );

      if (!response.ok) throw new Error("Error saving assessment");

      setNewAssesment([]);
      reset(); // opsional
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="w-full h-full overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="w-full h-[10%] p-5 gap-5 text-white bg-[color:var(--green_bg)] flex items-center">
        <div onClick={() => router.back()} className="cursor-pointer">
          <ArrowLeft />
        </div>
        <h1 className="text-xl font-semibold">Tambah Point Penilaian</h1>
      </div>

      {/* Form */}
      <div className="md:pt-5 pt-10 px-5 relative h-[90vh] bg-white w-full overflow-y-scroll">
        {/* Input */}
        <div>
          <h1>Masukkan Point Penilaian:</h1>
          <div className="flex flex-col gap-3 mt-2 w-full items-end">
            <input
              type="text"
              className="h-10 w-full border rounded-xl border-gray-400 px-3"
              {...register("name")}
              placeholder="Tambah Penilaian ..."
              name="name"
            />
            <select
              className="h-10 w-full border rounded-xl border-gray-400 px-3"
              {...register("domain")}
              name="domain"
            >
              <option value="">Pilih Kategori</option>
              <option value="motorik">Motorik</option>
              <option value="kognitif">Kognitif</option>
              <option value="bahasa">Bahasa</option>
              <option value="sosial">Sosial</option>
              <option value="emosional">Emosional</option>
            </select>
            <button
              type="button"
              className="button text-white bg-[color:var(--green_bg)] mr-5"
              onClick={() => {
                if (name && domain) {
                  setNewAssesment((prev) => [...prev, { name, domain }]);
                  reset(); // clear input setelah tambah
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
            {newAssesment.length > 0 ? (
              newAssesment.map((assesment, index) => (
                <div
                  key={index}
                  className="bg-gray-200 w-[90%] px-5 py-2 rounded-xl flex items-center justify-between"
                >
                  <h1 className="break-words w-[90%]">
                    {assesment.name} —{" "}
                    <span className="italic text-sm">{assesment.domain}</span>
                  </h1>
                  <button
                    onClick={() =>
                      setNewAssesment((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                    className="cursor-pointer"
                  >
                    x
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">
                Belum ada penilaian ditambahkan.
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-20 mb-10 px-5 gap-2">
          <button
            className={`button ${
              newAssesment.length > 0
                ? "bg-[color:var(--green_bg)]"
                : "bg-gray-400"
            } text-white`}
            onClick={async () => {
              if (newAssesment.length > 0) {
                await saveAssessments();
                openPopup(
                  <div className="flex flex-col items-center justify-center gap-5">
                    <h1>Penilaian Berhasil disimpan</h1>
                    <Check className="h-12 w-12 text-green-500" />
                  </div>
                );
                setTimeout(() => closePopup(), 800);
              }
            }}
            disabled={newAssesment.length === 0}
          >
            Simpan
          </button>
        </div>
      </div>

      {/* Popup and Loader */}
      <PopUp>{content}</PopUp>
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      )}
    </div>
  );
}

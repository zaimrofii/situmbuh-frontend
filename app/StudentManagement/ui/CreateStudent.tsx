"use client";

import { useAddStudentStore } from "@/app/stores/useActiveStore ";
import { useEffect, useState } from "react";

interface Classroom {
  id: string;
  name: string;
}

type Gender = "Laki-laki" | "Perempuan";

export default function AddStudentForm({}: //   onSuccess,
{
  onSuccess?: () => void;
}) {
  const [name, setName] = useState("");
  const [classroomId, setClassroomId] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<Gender>("Laki-laki");
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(false);
  const { setAddStudentActive, addStudentActive } = useAddStudentStore();

  useEffect(() => {
    fetchClassrooms();
  }, []);

  async function fetchClassrooms() {
    const res = await fetch(`http://localhost:8000/api/classrooms/`);
    const data = await res.json();
    setClassrooms(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !classroomId) {
      alert("Mohon isi semua field wajib!");
      return;
    }
    setLoading(true);
    await fetch(`http://localhost:8000/api/students/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        classroom: classroomId,
        birth_date: birthDate,
        gender,
      }),
    });

    setLoading(false);
    setName("");
    setClassroomId("");
    setBirthDate("");
    setGender("Laki-laki");

    // onSuccess(); // reload data di parent
  }

  return (
    <div
      className={`${
        addStudentActive ? "block" : "hidden"
      } fixed h-full w-full top-0 left-0 bg-black/20 z-999`}
      onClick={setAddStudentActive}
    >
      <div
        className="w-[70vw] h-[80vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow   max-w-4xl "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 flex items-center text-white w-full h-15 bg-[color:var(--green_bg)] rounded-t-xl">
          <h2 className="text-2xl font-semibold">Tambah Siswa</h2>
        </div>
        <div className="p-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Nama */}
            <div className="flex gap-5">
              <label className="font-medium w-50 text-gray-600 ">
                Nama<span className="text-red-500">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-400 px-3 py-2 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Masukkan nama siswa"
                required
              />
            </div>

            {/* Classroom */}
            <div className="flex gap-5">
              <label className="font-medium w-50 text-gray-600 ">
                Kelas<span className="text-red-500">*</span>
              </label>
              <select
                value={classroomId}
                onChange={(e) => setClassroomId(e.target.value)}
                className="w-full border border-gray-400 px-3 h-11 py-2 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="" disabled>
                  Pilih kelas
                </option>
                {classrooms.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Birth date */}
            <div className="flex gap-5">
              <label className="font-medium w-50 text-gray-600 ">
                Tanggal Lahir
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full border border-gray-400 px-3 py-2 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Gender */}
            <div className="flex gap-5">
              <label className="font-medium w-50 text-gray-600 ">
                Jenis Kelamin
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                className="w-full border border-gray-400 px-3 py-2 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500  h-11"
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            {/* Actions */}
            <button
              type="submit"
              disabled={loading}
              className={`bg-green-500 text-wh4te py-2 mt-2 rounded-lg shadow-inner font-medium hover:bg-green-600 transition text-white cursor-pointer ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Menyimpan..." : "Tambah Siswa"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

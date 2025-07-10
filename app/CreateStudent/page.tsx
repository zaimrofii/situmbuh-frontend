"use client";

import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Classroom {
  id: string;
  name: string;
}

type Gender = "Laki-laki" | "Perempuan";

export default function CreateStudentPage() {
  const [name, setName] = useState("");
  const [classroomId, setClassroomId] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<Gender>("Laki-laki");
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

    // router.back(); // Jika ingin kembali otomatis
  }

  return (
    <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
      <div className="px-5 flex gap-3 items-center text-white w-full h-15 bg-[color:var(--green_bg)]">
        <ArrowLeft onClick={() => router.back()} />
        <h2 className="text-xl">Tambah Siswa</h2>
      </div>
      <div className="p-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Nama */}
          <div className="flex flex-col gap-2">
            <label className="font-medium w-50 text-gray-600">
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
          <div className="flex flex-col gap-2">
            <label className="font-medium w-50 text-gray-600">
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
          <div className="flex flex-col gap-2">
            <label className="font-medium w-50 text-gray-600">
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
          <div className="flex flex-col gap-2">
            <label className="font-medium w-50 text-gray-600">
              Jenis Kelamin
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
              className="w-full border border-gray-400 px-3 py-2 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500 h-11"
            >
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          {/* Actions */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-green-500 text-white py-2 mt-2 rounded-lg shadow-inner font-medium hover:bg-green-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Menyimpan..." : "Tambah Siswa"}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Gender,
  Student,
  updateStudent,
  deleteStudent,
  useStudentList,
} from "./hooks/useStudents";
import { useAddStudentStore } from "../stores/useActiveStore ";

export default function StudentListPage() {
  const router = useRouter();
  const { data, loading, classroomNames, reload } = useStudentList();

  const tableRef = useRef<HTMLDivElement>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedClassroom, setEditedClassroom] = useState("");
  const [editedBirthDate, setEditedBirthDate] = useState("");
  const [editedGender, setEditedGender] = useState<Gender>("Laki-laki");
  const { setAddStudentActive } = useAddStudentStore();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (tableRef.current && !tableRef.current.contains(e.target as Node)) {
        setEditingId(null); // cancel edit
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function saveEdit(id: string) {
    await updateStudent(id, {
      name: editedName,
      classroom: editedClassroom,
      birth_date: editedBirthDate,
      gender: editedGender,
    });
    setEditingId(null);
    reload();
  }

  async function handleDelete(id: string) {
    if (confirm("Hapus siswa ini?")) {
      await deleteStudent(id);
      reload();
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[color:var(--green_bg)] md:bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-5 text-white/90 md:text-black">
        <div className="flex items-center gap-3">
          <ArrowLeft
            className="h-8 w-8 cursor-pointer mb-4"
            onClick={() => router.back()}
          />
          <h1 className="text-xl font-semibold mb-4">Daftar Siswa</h1>
        </div>
        <button
          className="hidden md:block button text-white bg-[color:var(--green_bg)]"
          onClick={setAddStudentActive}
        >
          Tambah Siswa
        </button>
      </div>

      {loading ? (
        <div className="text-center text-white">Loading data...</div>
      ) : (
        <div
          ref={tableRef}
          className="w-full px-4 md:px-10 h-[calc(100%-80px)] overflow-hidden bg-white rounded-t-4xl"
        >
          <div className="md:w-[90%] mx-auto h-full flex flex-col">
            {/* Header Table */}
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_100px] gap-2 font-bold bg-gray-100 shadow p-2 rounded-t-xl">
              <div className="ml-5">Nama</div>
              <div>Kelas</div>
              <div>Tgl. Lahir</div>
              <div>Gender</div>
              <div className="col-span-2 text-center">Aksi</div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto mt-3 mb-4 pr-1 no-scrollbar">
              <div className="flex flex-col gap-3">
                {data.map((student: Student) => (
                  <div
                    key={student.id}
                    className="flex flex-col items-start h-auto md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_100px] gap-2 items-center bg-white shadow p-2 rounded-lg md:h-18 flex-shrink-0"
                  >
                    <div className="md:ml-3 font-semibold">
                      {editingId === student.id ? (
                        <input
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        student.name
                      )}
                    </div>

                    <div>
                      {editingId === student.id ? (
                        <input
                          value={editedClassroom}
                          onChange={(e) => setEditedClassroom(e.target.value)}
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        classroomNames[student.classroom] || student.classroom
                      )}
                    </div>

                    <div>
                      {editingId === student.id ? (
                        <input
                          type="date"
                          value={editedBirthDate}
                          onChange={(e) => setEditedBirthDate(e.target.value)}
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        student.birth_date
                      )}
                    </div>

                    <div>
                      {editingId === student.id ? (
                        <select
                          value={editedGender}
                          onChange={(e) =>
                            setEditedGender(e.target.value as Gender)
                          }
                          className="border px-2 py-1 rounded w-full"
                        >
                          <option value="Laki-laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </select>
                      ) : (
                        student.gender
                      )}
                    </div>

                    <div className="col-span-2 flex gap-2 justify-center">
                      {editingId === student.id ? (
                        <>
                          <button
                            onClick={() => saveEdit(student.id)}
                            className="bg-green-500 text-white px-2 py-1 rounded"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-400 text-white p-1 rounded"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingId(student.id);
                              setEditedName(student.name);
                              setEditedClassroom(student.classroom);
                              setEditedBirthDate(student.birth_date);
                              setEditedGender(student.gender);
                            }}
                            className="text-blue-500 p-1 cursor-pointer"
                          >
                            <Pencil size={20} />
                          </button>
                          <button
                            onClick={() => handleDelete(student.id)}
                            className="text-red-500 p-1 cursor-pointer"
                          >
                            <Trash2 size={20} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tombol Tambah Mobile */}
            <div className="w-full flex justify-end">
              <Link href="/CreateStudent">
                <button className="block md:hidden button text-white bg-[color:var(--green_bg)]">
                  Tambah Siswa
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

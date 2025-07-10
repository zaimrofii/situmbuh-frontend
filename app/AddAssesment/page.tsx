"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Pencil, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAddAssessmentStore } from "../stores/useActiveStore ";
import Link from "next/link";

// Types

type Domain = "motorik" | "kognitif" | "bahasa" | "sosial" | "emosional";
interface AssessmentPoint {
  id: string;
  name: string;
  domain: Domain;
}

const domains = [
  { value: "motorik", label: "Motorik" },
  { value: "kognitif", label: "Kognitif" },
  { value: "bahasa", label: "Bahasa" },
  { value: "sosial", label: "Sosial" },
  { value: "emosional", label: "Emosional" },
];

export default function AssessmentPointListPage() {
  const router = useRouter();
  const { setAddAssessmentActive } = useAddAssessmentStore();

  const [data, setData] = useState<AssessmentPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedDomain, setEditedDomain] = useState<Domain>("motorik");
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPoints();
  }, []);

  async function fetchPoints() {
    setLoading(true);
    const res = await fetch("http://localhost:8000/api/assessment-points/");
    const points = (await res.json()) as AssessmentPoint[];
    setData(points);
    setLoading(false);
  }

  async function saveEdit(id: string) {
    await fetch(`/api/assessment-points/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editedName, domain: editedDomain }),
    });
    setEditingId(null);
    fetchPoints();
  }

  async function deletePoint(id: string) {
    if (confirm("Hapus penilaian ini?")) {
      await fetch(`http://localhost:8000/api/assessment-points/${id}/`, {
        method: "DELETE",
      });
      fetchPoints();
    }
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (tableRef.current && !tableRef.current.contains(e.target as Node)) {
        setEditingId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[color:var(--green_bg)] md:bg-white overflow-hidden no-scrollbar">
      <div className="flex justify-between items-center p-5 text-white/90 md:text-black">
        <div className="flex items-center gap-3">
          <ArrowLeft
            className="h-8 w-8 cursor-pointer mb-4"
            onClick={() => router.back()}
          />
          <h1 className="text-xl font-semibold mb-4">Daftar Point Penilaian</h1>
        </div>
        <button
          className="hidden md:block button text-white bg-[color:var(--green_bg)]"
          onClick={setAddAssessmentActive}
        >
          Tambah Point
        </button>
      </div>

      {loading ? (
        <div>Loading data...</div>
      ) : (
        <div ref={tableRef} className="w-full px-10 h-auto bg-white">
          <div className="md:w-[90%] mx-auto  pt-3">
            {/* Header */}
            <div className="hidden md:grid grid-cols-5 gap-2 font-bold bg-gray-100 shadow p-2 rounded-t-xl">
              <div className="ml-5 col-span-2">Nama</div>
              <div>Domain</div>
              <div className="col-span-2 text-center">Aksi</div>
            </div>

            <div className="flex flex-col gap-3 mt-3 h-[72vh] overflow-y-scroll mb-3 no-scrollbar">
              {data.map((point) => (
                <div
                  key={point.id}
                  className="flex flex-col items-start h-auto md:grid grid-cols-5 gap-2 items-center bg-white shadow p-2 rounded-lg md:h-18 flex-shrink-0"
                >
                  {/* Nama */}
                  <div className="md:ml-3 font-semibold col-span-2 w-full">
                    {editingId === point.id ? (
                      <input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      point.name
                    )}
                  </div>

                  {/* Domain */}
                  <div className="w-full">
                    {editingId === point.id ? (
                      <select
                        value={editedDomain}
                        onChange={(e) =>
                          setEditedDomain(e.target.value as Domain)
                        }
                        className="border px-2 py-1 rounded w-full"
                      >
                        {domains.map((d) => (
                          <option value={d.value} key={d.value}>
                            {d.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      domains.find((d) => d.value === point.domain)?.label
                    )}
                  </div>

                  {/* Aksi */}
                  <div className="col-span-2 flex gap-2 justify-center w-full">
                    {editingId === point.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(point.id)}
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
                            setEditingId(point.id);
                            setEditedName(point.name);
                            setEditedDomain(point.domain);
                          }}
                          className="text-blue-500 p-1 cursor-pointer"
                        >
                          <Pencil size={20} />
                        </button>
                        <button
                          onClick={() => deletePoint(point.id)}
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
            <div className="w-full flex justify-end">
              <Link href="/CreateAssessmentPoint">
                <button className="block md:hidden button text-white bg-[color:var(--green_bg)] mb-5">
                  Tambah Point
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

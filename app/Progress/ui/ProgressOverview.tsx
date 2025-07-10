"use client";

import React, { useState } from "react";
import { DomainDetail } from "./DomainDetail";
import Link from "next/link";

type Props = {
  setDomainDetail: (label: string) => void;
  domainDetail: string;
};

export const ProgressOverview = ({ setDomainDetail, domainDetail }: Props) => {
  const [detailActive, setDetailActive] = useState(false);
  const [detailActive2, setDetailActive2] = useState(false);
  const [detailActive3, setDetailActive3] = useState(false);

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <select
            defaultValue=""
            className="flex gap-2 items-center h-10 px-5 rounded-xl border-b-2 border-gray-200 bg-gray-100"
          >
            <option value="" disabled>
              Periode
            </option>
            <option value="minggu">Minggu</option>
            <option value="bulan">Bulan</option>
            <option value="tahun">Tahun</option>
          </select>
          <h1 className="text-[color:var(--green_bg)]">1 - 31 Mei 2025</h1>
        </div>

        <div className="mt-2 px-3 h-[65vh] w-full overflow-y-scroll flex flex-col gap-2 font-semibold no-scrollbar">
          {/* Motorik */}
          <div
            className="w-full h-auto flex flex-col gap-3 rounded-xl shadow bg-white p-3"
            onClick={() => setDetailActive(!detailActive)}
          >
            <div className="flex justify-between items-center mt-2 cursor-pointer">
              <h1>Motorik</h1>
              <div className="h-4 w-4 rounded-full bg-red-500"></div>
            </div>
            <div className={`${detailActive ? "block" : "hidden"} transition`}>
              <div className="font-medium">
                <h1>Insight : Bahaya</h1>
                <h1>Rekomendasi : Harus ditingkatkan</h1>
              </div>
              <button
                className="h-10 px-5 rounded-xl bg-[color:var(--green_bg)] text-white border-b-2 border-black/20 font-medium mt-3 w-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setDomainDetail(domainDetail === "motorik" ? "" : "motorik");
                }}
              >
                {domainDetail === "motorik" ? "Tutup Kembali" : "Lihat Detail"}
              </button>
            </div>
            {domainDetail === "motorik" && <DomainDetail />}
          </div>

          {/* Sosial */}
          <div
            className="w-full h-auto flex flex-col gap-3 rounded-xl bg-white shadow p-3"
            onClick={() => setDetailActive2(!detailActive2)}
          >
            <div className="flex justify-between items-center mt-2 cursor-pointer">
              <h1>Sosial</h1>
              <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
            </div>
            <div className={`${detailActive2 ? "block" : "hidden"} transition`}>
              <div className="font-medium">
                <h1>Insight : Waspada</h1>
                <h1>Rekomendasi : Tingkatkan</h1>
              </div>
              <button
                className="h-10 px-5 rounded-xl bg-[color:var(--green_bg)] text-white border-b-2 border-black/20 font-medium mt-3 w-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setDomainDetail(domainDetail === "sosial" ? "" : "sosial");
                }}
              >
                {domainDetail === "sosial" ? "Tutup Kembali" : "Lihat Detail"}
              </button>
            </div>
            {domainDetail === "sosial" && <DomainDetail />}
          </div>

          {/* Kognitif */}
          <div
            className="w-full h-auto flex flex-col gap-3 rounded-xl bg-white shadow p-3"
            onClick={() => setDetailActive3(!detailActive3)}
          >
            <div className="flex justify-between items-center mt-2 cursor-pointer">
              <h1>Kognitif</h1>
              <div className="h-4 w-4 rounded-full bg-green-500"></div>
            </div>
            <div className={`${detailActive3 ? "block" : "hidden"} transition`}>
              <div className="font-medium">
                <h1>Insight : Bagus</h1>
                <h1>Rekomendasi : Lanjutan</h1>
              </div>
              <button
                className="h-10 px-5 rounded-xl bg-[color:var(--green_bg)] text-white border-b-2 border-black/20 font-medium mt-3 w-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setDomainDetail(
                    domainDetail === "kognitif" ? "" : "kognitif"
                  );
                }}
              >
                {domainDetail === "kognitif" ? "Tutup Kembali" : "Lihat Detail"}
              </button>
            </div>
            {domainDetail === "kognitif" && <DomainDetail />}
          </div>

          {/* Absensi */}
          <div className="w-full h-auto flex justify-between rounded-xl bg-white shadow p-3">
            <h1>Absensi Kehadiran</h1>
            <Link href="/AttendanceReport">
              <button className="font-light button bg-[color:var(--green_bg)] text-white">
                Lihat laporan Kehadiran
              </button>
            </Link>
          </div>

          {/* Info */}
          <div className="text-white text-sm shadow p-3 bg-red-500 rounded-lg fixed bottom-13 right-3 font-light animate-pulse md:text-lg md:px-5 md:right-10">
            <h1>Data di atas hanya simulasi,</h1>
            <h1>Fitur masih tahap Pengembangan!</h1>
          </div>
        </div>
      </div>
    </>
  );
};

"use client";

import React from "react";

export const DomainDetail = () => {
  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="h-4 w-4 rounded-full bg-red-500"></div>
            <h1>Bahaya</h1>
          </div>

          <h1 className="text-[color:var(--green_bg)]">1 - 31 mei 2025</h1>
        </div>

        <div className="mt-2 h-[65vh] w-full overflow-y-scroll flex flex-col gap-2 font-semibold">
          <div className="w-full h-auto flex flex-col gap-3 rounded-xl bg-white shadow-md border border-gray-200 p-5">
            <h1 className="font-bold">Insight Terkini:</h1>
            <div className="font-medium">
              <h1>- Skor menurun 2x berturut.</h1>
              <h1>- Di bawah baseline awal.</h1>
              <h1>- Tren stagnan 3 minggu.</h1>
            </div>
          </div>

          <div className="w-full h-auto flex flex-col gap-3 rounded-xl bg-white shadow-md border border-gray-200 p-5">
            <h1 className="font-bold">Rekomendasi:</h1>
            <div className="font-medium">
              <h1>- Perbanyak stimulasi bicara.</h1>
              <h1>- Latihan cerita 3 kata.</h1>
              <h1>- Ajak anak dialog 10 menit/hari.</h1>
            </div>
          </div>

          <div className="w-full h-auto flex flex-col gap-3 rounded-xl bg-white shadow-md border border-gray-200 p-5">
            <h1 className="font-bold">Catatan Ortu/Guru:</h1>
            <div className="font-medium">
              <h1>
                Sugeng kurang percaya diri saat memimpin bicara di depan, bla
                bla bla...
              </h1>
            </div>
          </div>
        </div>

        <div className="text-white text-sm shadow p-3 bg-red-500 rounded-lg fixed bottom-13 right-3">
          <h1>Data di atas hanya simulasi,</h1>
          <h1>Fitur masih tahap Pengembangan!</h1>
        </div>
      </div>
    </>
  );
};

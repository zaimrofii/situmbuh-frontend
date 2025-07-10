"use client";
import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Definisikan tipe domain
type Domain = "Kognitif" | "Motorik" | "Bahasa" | "Sosial" | "Emosional";

// Mapping warna sesuai domain
const colorMap: Record<Domain, string> = {
  Kognitif: "#4f46e5",
  Motorik: "#10b981",
  Bahasa: "#f97316",
  Sosial: "#eab308",
  Emosional: "#ef4444",
};

const kognitif = [
  { date: "01", score: 82, notes: "Menjawab pertanyaan logika sederhana" },
  { date: "02", score: 85 },
  { date: "03", score: 88 },
  { date: "04", score: 90 },
  { date: "05", score: 87 },
  { date: "06", score: 80 },
  { date: "07", score: 75, notes: "Kurang fokus saat bermain teka-teki" },
  { date: "08", score: 70 },
  { date: "09", score: 68 },
  { date: "10", score: 72 },
  { date: "11", score: 77 },
  { date: "12", score: 81 },
  { date: "13", score: 85 },
  {
    date: "14",
    score: 89,
    notes: "Berhasil menyelesaikan soal logika tingkat lanjut",
  },
];

const motorik = [
  { date: "01", score: 76, notes: "Berhasil berdiri satu kaki selama 5 detik" },
  { date: "02", score: 78 },
  { date: "03", score: 79 },
  { date: "04", score: 80 },
  { date: "05", score: 77 },
  { date: "06", score: 74 },
  { date: "07", score: 70, notes: "Kesulitan saat melompat dua kali berturut" },
  { date: "08", score: 72 },
  { date: "09", score: 75 },
  { date: "10", score: 78 },
  { date: "11", score: 83 },
  { date: "12", score: 85 },
  { date: "13", score: 88 },
  {
    date: "14",
    score: 91,
    notes: "Mampu melempar dan menangkap bola dengan akurat",
  },
];

const bahasa = [
  { date: "01", score: 80, notes: "Mengucapkan kalimat lengkap tanpa bantuan" },
  { date: "02", score: 81 },
  { date: "03", score: 82 },
  { date: "04", score: 80 },
  { date: "05", score: 76 },
  { date: "06", score: 70, notes: "Kesulitan menyusun cerita sederhana" },
  { date: "07", score: 68 },
  { date: "08", score: 72 },
  { date: "09", score: 77 },
  { date: "10", score: 80 },
  { date: "11", score: 83 },
  { date: "12", score: 85 },
  { date: "13", score: 87 },
  {
    date: "14",
    score: 89,
    notes: "Menceritakan pengalaman akhir pekan dengan jelas",
  },
];

const sosial = [
  {
    date: "01",
    score: 75,
    notes: "Berbagi mainan dengan teman secara sukarela",
  },
  { date: "02", score: 78 },
  { date: "03", score: 76 },
  { date: "04", score: 74 },
  { date: "05", score: 70 },
  { date: "06", score: 68 },
  { date: "07", score: 60, notes: "Menangis saat mainan diambil temannya" },
  { date: "08", score: 62 },
  { date: "09", score: 65 },
  { date: "10", score: 68 },
  { date: "11", score: 72 },
  { date: "12", score: 75 },
  { date: "13", score: 77 },
  {
    date: "14",
    score: 79,
    notes: "Mulai inisiatif mengajak teman bermain bersama",
  },
];

const emosional = [
  { date: "01", score: 65, notes: "Marah ketika diminta menunggu giliran" },
  { date: "02", score: 67 },
  { date: "03", score: 66 },
  { date: "04", score: 64 },
  { date: "05", score: 63 },
  { date: "06", score: 66 },
  { date: "07", score: 70 },
  { date: "08", score: 74 },
  { date: "09", score: 78 },
  { date: "10", score: 82 },
  { date: "11", score: 85 },
  { date: "12", score: 87 },
  { date: "13", score: 88 },
  {
    date: "14",
    score: 90,
    notes: "Bisa mengungkapkan rasa kecewa dengan kata-kata",
  },
];

// Buat object data untuk mempermudah pemilihan dataset
const dataMap: Record<Domain, typeof kognitif> = {
  Kognitif: kognitif,
  Motorik: motorik,
  Bahasa: bahasa,
  Sosial: sosial,
  Emosional: emosional,
};

export const Chart = () => {
  // Gunakan tipe Domain untuk state
  const [chartValue, setChartValue] = useState<Domain>("Kognitif");

  return (
    <div className="block md:hidden w-full h-auto py-4 overflow-x-scroll ">
      <div className="flex justify-between">
        <select
          name="domain"
          id="domain-select"
          value={chartValue}
          onChange={(e) => setChartValue(e.target.value as Domain)} // casting ke Domain
          className=" p-1 shadow px-3 rounded "
        >
          <option value="Kognitif">Kognitif</option>
          <option value="Motorik">Motorik</option>
          <option value="Bahasa">Bahasa</option>
          <option value="Sosial">Sosial</option>
          <option value="Emosional">Emosional</option>
        </select>
        <h1 className="text-[color:var(--green_bg)]">01 - 07 Mei</h1>
      </div>

      <div className="w-full h-40 mx-auto text-[8px]   shadow-md rounded-xl p-3">
        <ResponsiveContainer>
          <AreaChart
            data={dataMap[chartValue]}
            margin={{ top: 10, right: 10, left: -35, bottom: 0 }}
          >
            <defs>
              {/* Gradients */}
              <linearGradient id="colorKognitif" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorMotorik" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorBahasa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSosial" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#eab308" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorEmosional" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="#ccc"
              strokeDasharray="0 0"
              vertical={false}
              horizontal={true}
              strokeWidth={0.2}
            />
            <XAxis
              dataKey="date"
              interval={0}
              textAnchor="end"
              height={30}
              tickLine={false}
            />
            <YAxis tickLine={false} domain={[60, 100]} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="score"
              fillOpacity={1}
              stroke={colorMap[chartValue]}
              fill={`url(#color${chartValue})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="p-3 px-5 bg-white rounded-xl shadow-md">
        <h1 className="font-semibold mb-2">Highlight Insight :</h1>
        <h1>Mei Minggu ke-2 : penurunan</h1>
        <h1>Mei Minggu ke-4 : pemulihan</h1>
      </div>
    </div>
  );
};

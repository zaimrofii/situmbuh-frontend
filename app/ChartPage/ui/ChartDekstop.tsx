"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Domain = "Kognitif" | "Motorik" | "Bahasa" | "Sosial" | "Emosional";

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

const dataMap: Record<Domain, typeof kognitif> = {
  Kognitif: kognitif,
  Motorik: motorik,
  Bahasa: bahasa,
  Sosial: sosial,
  Emosional: emosional,
};

export const ChartDekstop = () => {
  const domains: Domain[] = [
    "Kognitif",
    "Motorik",
    "Bahasa",
    "Sosial",
    "Emosional",
  ];

  return (
    <div className="hidden md:block w-full px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {domains.map((domain) => (
          <div key={domain} className="bg-white shadow-md rounded-xl p-4">
            <h2 className="text-lg font-bold text-[color:var(--green_bg)] mb-2">
              {domain}
            </h2>
            <div className="w-full h-40 text-[8px] rounded-xl mb-3">
              <ResponsiveContainer>
                <AreaChart
                  data={dataMap[domain]}
                  margin={{ top: 10, right: 10, left: -35, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id={`color${domain}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={colorMap[domain]}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={colorMap[domain]}
                        stopOpacity={0}
                      />
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
                    height={30}
                    tickLine={false}
                  />
                  <YAxis tickLine={false} domain={[60, 100]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke={colorMap[domain]}
                    fillOpacity={1}
                    fill={`url(#color${domain})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-md">
              <h3 className="font-semibold mb-1">Highlight Insight:</h3>
              <ul className="list-disc ml-4">
                <li>Minggu ke-2: penurunan</li>
                <li>Minggu ke-4: pemulihan</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

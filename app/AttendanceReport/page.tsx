// // components/AttendanceReport.tsx
// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import axios from "axios";

// const COLORS = ["#4ade80", "#facc15", "#60a5fa", "#f87171"];

// interface AttendanceData {
//   status: "Hadir" | "Izin" | "Sakit" | "Alpha";
//   count: number;
// }

// interface AttendanceRecord {
//   student: number;
//   date: string;
//   status: "Hadir" | "Izin" | "Sakit" | "Alpha";
// }

// interface Student {
//   id: number;
//   name: string;
// }

// export default function AttendanceReport() {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [attendances, setAttendances] = useState<AttendanceRecord[]>([]);
//   const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
//   const [data, setData] = useState<AttendanceData[]>([]);

//   useEffect(() => {
//     axios.get("http://localhost:8000/api/students/").then((res) => {
//       setStudents(res.data);
//       if (res.data.length > 0) setSelectedStudent(res.data[0].id);
//     });
//   }, []);

//   useEffect(() => {
//     if (!selectedStudent) return;

//     axios.get("http://localhost:8000/api/attendances/").then((res) => {
//       const filtered = res.data.filter(
//         (att: AttendanceRecord) => att.student === selectedStudent
//       );
//       setAttendances(filtered);
//       const summary: Record<string, number> = {
//         Hadir: 0,
//         Izin: 0,
//         Sakit: 0,
//         Alpha: 0,
//       };
//       filtered.forEach((att: AttendanceRecord) => {
//         summary[att.status]++;
//       });
//       const result: AttendanceData[] = Object.entries(summary).map(
//         ([status, count]) => ({
//           status: status as AttendanceData["status"],
//           count,
//         })
//       );
//       setData(result);
//     });
//   }, [selectedStudent]);

//   return (
//     <div className="p-5 w-full max-w-3xl mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Laporan Absensi</h1>

//       <div className="mb-4">
//         <label className="block mb-1">Pilih Siswa:</label>
//         <select
//           className="border rounded p-2 w-full"
//           value={selectedStudent || ""}
//           onChange={(e) => setSelectedStudent(parseInt(e.target.value))}
//         >
//           {students.map((s) => (
//             <option key={s.id} value={s.id}>
//               {s.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="w-full h-[300px]">
//         <ResponsiveContainer>
//           <PieChart>
//             <Pie
//               data={data}
//               dataKey="count"
//               nameKey="status"
//               outerRadius={100}
//               label
//             >
//               {data.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="mt-5">
//         <h2 className="text-lg font-semibold mb-2">Detail Kehadiran:</h2>
//         <ul className="space-y-1">
//           {attendances.map((att, i) => (
//             <li key={i} className="text-sm">
//               📅 {att.date} — <span className="font-medium">{att.status}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// komponent yang sama dengna data dummy________________
"use client";

import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#ef4444"];

interface AttendanceData {
  status: "Hadir" | "Izin" | "Sakit" | "Alpha";
  count: number;
}

interface AttendanceRecord {
  student: number;
  date: string;
  status: "Hadir" | "Izin" | "Sakit" | "Alpha";
}

interface Student {
  id: number;
  name: string;
}

export default function AttendanceReport() {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendances, setAttendances] = useState<AttendanceRecord[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [data, setData] = useState<AttendanceData[]>([]);

  // Dummy data
  const dummyStudents: Student[] = [
    { id: 1, name: "Ahmad" },
    { id: 2, name: "Budi" },
    { id: 3, name: "Citra" },
  ];

  const dummyAttendances: AttendanceRecord[] = [
    { student: 1, date: "2025-06-01", status: "Hadir" },
    { student: 1, date: "2025-06-02", status: "Izin" },
    { student: 1, date: "2025-06-03", status: "Hadir" },
    { student: 1, date: "2025-06-04", status: "Alpha" },
    { student: 1, date: "2025-06-05", status: "Sakit" },
    { student: 2, date: "2025-06-01", status: "Hadir" },
    { student: 2, date: "2025-06-02", status: "Hadir" },
    { student: 2, date: "2025-06-03", status: "Hadir" },
    { student: 3, date: "2025-06-01", status: "Alpha" },
    { student: 3, date: "2025-06-02", status: "Sakit" },
  ];

  useEffect(() => {
    setStudents(dummyStudents);
    setAttendances(dummyAttendances);
    setSelectedStudent(dummyStudents[0].id);
  }, []);

  useEffect(() => {
    if (!selectedStudent) return;

    const filtered = dummyAttendances.filter(
      (att) => att.student === selectedStudent
    );

    const summary: Record<string, number> = {
      Hadir: 0,
      Izin: 0,
      Sakit: 0,
      Alpha: 0,
    };

    filtered.forEach((att) => {
      summary[att.status]++;
    });

    const result: AttendanceData[] = Object.entries(summary).map(
      ([status, count]) => ({
        status: status as AttendanceData["status"],
        count,
      })
    );
    setData(result);
    setAttendances(filtered);
  }, [selectedStudent]);

  return (
    <div className="w-full h-[100vh] overflow-hidden">
      <div className="bg-[color:var(--green_bg)] md:bg-white text-white md:text-black h-[10vh] w-full flex items-center  px-10">
        <h1 className="text-2xl font-semibold">Laporan Absensi</h1>
      </div>
      <div className="p-5 w-[90%] h-[90vh] overflow-y-scroll no-scrollbar  max-w-4xl mx-auto">
        <div className="mb-4">
          <label className="block mb-1">Pilih Siswa:</label>
          <select
            className="border border-gray-300 rounded-lg p-2 w-full"
            value={selectedStudent || ""}
            onChange={(e) => setSelectedStudent(parseInt(e.target.value))}
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full h-auto ">
          <div className="flex flex-col md:flex-row gap-6 items-start ">
            {/* Chart */}
            <div className="w-4/5 mx-auto md:w-1/2 ">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="count"
                    nameKey="status"
                    outerRadius={100}
                    innerRadius={60}
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Data Summary or Text */}
            <div className="w-full mx-auto mb:w-1/2 mt-10 p-5 border border-gray-100 shadow-md rounded-lg">
              <h2 className="text-lg font-bold mb-2">Ringkasan Absensi</h2>
              {data.map((entry, index) => (
                <div key={index} className="flex justify-between">
                  <span>{entry.status}</span>
                  <span>{entry.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="my-5 mb-10">
          <h2 className="w-full bg-gray-100 p-2 px-5 rounded-lg shadow text-lg font-semibold mb-2">
            Detail Kehadiran:
          </h2>
          <ul className=" mt-2">
            {attendances.map((att, i) => (
              <li key={i} className="text-sm pl-5 py-1 hover:bg-gray-100">
                📅 {att.date} —{" "}
                <span className="font-medium">{att.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

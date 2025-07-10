"use client";

import { useEffect, useState } from "react";
import { StudentType } from "../../types";
import { useModalStore } from "../../stores/useModalStore";
import { Check } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useSetIdStore } from "../../stores/useModalStore";

type ChildProps = {
  popupOpen: boolean;
  setpopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedStudent: StudentType | null;
  setIsHadir: React.Dispatch<React.SetStateAction<string[]>>;
  setIsIzin: React.Dispatch<React.SetStateAction<string[]>>;
  refetchStudents: (id: string) => void;
};

export const AttendancePopUp: React.FC<ChildProps> = ({
  popupOpen,
  setpopupOpen,
  selectedStudent,
  setIsHadir,
  setIsIzin,
  refetchStudents,
}) => {
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { openPopup, closePopup } = useModalStore();
  const { classroomId } = useSetIdStore();

  // ✅ Set app element secara aman di client

  useEffect(() => {
    const handleHadir = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/attendances/", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            student: selectedStudent?.id,
            status: status,
          }),
        });
        if (!response.ok) {
          console.error("Failed to mark attendance");
        }
        if (status === "hadir" && selectedStudent?.id) {
          setIsHadir((prev) => [...prev, selectedStudent.id]);
        } else if (status !== "hadir" && selectedStudent?.id) {
          setIsIzin((prev) => [...prev, selectedStudent.id]);
        }

        if (classroomId) {
          refetchStudents(classroomId);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error marking attendance:", error);
      }
    };

    if (status !== "") {
      handleHadir();
      console.log("status", status);
      setpopupOpen(false);
      setStatus("");
    }
  }, [status, setpopupOpen, selectedStudent?.id, setIsHadir, setIsIzin]);

  if (!selectedStudent) {
    return null;
  }
  return (
    <>
      <div
        className={`${
          popupOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }  h-full w-full  bg-black/10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50999990`}
        onClick={() => setpopupOpen(false)}
      >
        <div
          className={`${
            popupOpen ? "scale-100" : "scale-0"
          } transition-transform absolute w-[80vw] md:w-[40vw]  p-5 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-xl shadow border border-gray-200 z-100 `}
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="text-xl my-8 px-3">
            Hari ini,{" "}
            <span className="font-semibold">{selectedStudent.name}</span> Hadir
            atau Izin?
          </h1>
          <div className="mt-5">
            <button
              className="h-10 w-full rounded-xl bg-[color:var(--green_bg)] text-white text-lg mb-2"
              onClick={() => {
                setStatus("hadir");
                setpopupOpen(false);
                openPopup(
                  <div className="flex items-center justify-center h-20">
                    <h1 className="text-lg mr-3">Presensi Berhasil </h1>
                    <Check className="w-12 h-12 text-green-500" />
                  </div>
                );
                setTimeout(() => {
                  closePopup();
                }, 500);
              }}
            >
              Hadir
            </button>
            <button
              className="h-10 w-full rounded-xl bg-red-400 text-white text-lg mb-2"
              onClick={() => {
                openPopup(
                  <div>
                    <h1 className="px-3 mb-3">Pilih Keterangan :</h1>

                    <div className="flex gap-2">
                      <button
                        className="h-10 w-full mb-2 text-lg text-white bg-[color:var(--green_bg)] rounded-xl"
                        onClick={() => {
                          setStatus("izin");

                          openPopup(
                            <div className="flex items-center justify-center h-20">
                              <h1 className="text-lg mr-3">
                                Presensi Berhasil{" "}
                              </h1>
                              <Check className="w-12 h-12 text-green-500" />
                            </div>
                          );
                          setTimeout(() => {
                            closePopup();
                          }, 500);
                        }}
                      >
                        Izin
                      </button>
                      <button
                        className="h-10 w-full mb-2 text-lg text-white bg-[color:var(--green_bg)] rounded-xl"
                        onClick={() => {
                          setStatus("sakit");

                          openPopup(
                            <div className="flex items-center justify-center h-20">
                              <h1 className="text-lg mr-3">
                                Presensi Berhasil{" "}
                              </h1>
                              <Check className="w-12 h-12 text-green-500" />
                            </div>
                          );
                          setTimeout(() => {
                            closePopup();
                          }, 500);
                        }}
                      >
                        Sakit
                      </button>
                    </div>
                    <button
                      className="h-10 w-full mb-2 text-lg bg-gray-200 rounded-xl"
                      onClick={closePopup}
                    >
                      Batal
                    </button>
                  </div>
                );
                setpopupOpen(false);
              }}
            >
              Izin
            </button>
            <button
              className="h-10 w-full rounded-xl bg-gray-200 text-lg"
              onClick={() => setpopupOpen(false)}
            >
              Batal
            </button>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {loading && <ClipLoader color="#36d7b7" loading={true} size={50} />}
        </div>
      </div>
    </>
  );
};

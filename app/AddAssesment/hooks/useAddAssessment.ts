"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { AssessmentFormData } from "../../types";

export function useAddAssessment() {
  const { register, watch, reset } = useForm<AssessmentFormData>();
  const assesmentName = watch("name");
  const domain = watch("domain"); // ✅ untuk memantau domain juga
  const [newAssesment, setNewAssesment] = useState<AssessmentFormData[]>([]);
  const [loading, setLoading] = useState(false);

  async function saveAssessments() {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/assessment-points/",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            newAssesment.map((e) => ({ name: e.name, domain: e.domain }))
          ),
        }
      );

      if (!response.ok) throw new Error("Error saving assessment");

      setNewAssesment([]); // reset list setelah sukses
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    register,
    assesmentName,
    domain,
    newAssesment,
    setNewAssesment,
    saveAssessments,
    loading,
    reset,
  };
}

import { useState, useEffect, useCallback } from "react";
import {
  fetchStudent,
  fetchClassroom,
  fetchAssessmentPoints,
} from "./function";
import {
  StudentType,
  ClassroomType,
  AssessmentPointType,
  // AssessmentRecordType,
} from "../../types";

export function useAssessmentData(
  studentId: string | null,
  classroomId: string | null
) {
  const [student, setStudent] = useState<StudentType | null>(null);
  const [classRoom, setClassRoom] = useState<ClassroomType | null>(null);
  const [assessments, setAssessments] = useState<AssessmentPointType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!classroomId) return;
    setLoading(true);
    try {
      const [cData, aData] = await Promise.all([
        fetchClassroom(classroomId),
        fetchAssessmentPoints(),
      ]);
      setClassRoom(cData);
      setAssessments(aData);
    } finally {
      setLoading(false);
    }
  }, [classroomId]);

  useEffect(() => {
    if (!studentId || !classroomId) return;
    fetchStudent(studentId).then(setStudent);
    fetchData();
  }, [studentId, classroomId, fetchData]);

  return { student, classRoom, assessments, loading, fetchData };
}

// api/students.ts
export async function fetchStudent(studentId: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/students/${studentId}/`
  ).then((res) => res.json());
}

export async function fetchClassroom(classroomId: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/classrooms/${classroomId}/`
  ).then((res) => res.json());
}

export async function fetchAssessmentPoints() {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/assessment-points/`).then(
    (res) => res.json()
  );
}

export async function submitAssessmentScores(
  studentId: string,
  scores: { point: string; score: number }[]
) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/assessment-records/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(scores.map((s) => ({ student: studentId, ...s }))),
  }).then((res) => res.json());
}

export async function deleteStudent(studentId: string) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/students/${studentId}/`, {
    method: "DELETE",
  }).then((res) => res.status === 204);
}

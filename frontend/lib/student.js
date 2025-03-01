import environment from "./environment.js";

export async function getStudents() {
  const response = await fetch(`${environment.baseUrl}api/student`, {
    method: "GET",
  });
  return await response.json();
}

export async function getStudent(id) {
  const res = await fetch(`${environment.baseUrl}api/student/${id}`);
  return await res.json();
}

export async function deleteStudent(id) {
  const res = await fetch(`${environment.baseUrl}api/student/${id}`, {
    method: "DELETE",
  });

  return await res.json();
}

export async function updateStudent(id, data) {
  const res = await fetch(`${environment.baseUrl}api/student/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await res.json();
}

export async function uploadProfilePic(data) {
  const res = await fetch(`${environment.baseUrl}api/student/profile`, {
    method: "POST",
    body: data,
  });

  return await res.json();
}

export async function getProfilePic(id) {
  const res = await fetch(`${environment.baseUrl}api/student/${id}/profile`, {
    method: "POST",
  });
  return res;
}

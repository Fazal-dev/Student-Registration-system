import environment from "./environment.js";

export function getUserRole() {
  return localStorage.getItem("role") || "guest";
}

export function setUserRole(role) {
  localStorage.setItem("role", role);
}

export function getToken() {
  return localStorage.getItem("user_token") || null;
}

export function setToken(token) {
  localStorage.setItem("user_token", token);
}
export function getUserId() {
  return localStorage.getItem("user_id") || null;
}
export function setUserId(user_id) {
  localStorage.setItem("user_id", user_id);
}

export async function LoginUser(data) {
  const res = await fetch(`${environment.baseUrl}api/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });

  const result = await res.json();

  setUserId(result._id);
  setUserRole(result.role);
  setToken(result.token);

  return result;
}

export async function SigupUser(data) {
  const res = await fetch(`${environment.baseUrl}api/auth/signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });

  return res.json();
}

export async function LogoutUser() {
  localStorage.removeItem("user_token");
  localStorage.removeItem("role");
  localStorage.removeItem("user_id");
}

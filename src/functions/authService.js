const API_URL = "http://127.0.0.1:8000/api";

/**
 * Iniciar sesión (LOGIN)
 */
export async function login(username, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Credenciales inválidas");
  }

  const data = await response.json();

  // Guardar token
  localStorage.setItem("token", data.access_token);

  return data;
}

/**
 * Cerrar sesión (LOGOUT)
 */
export async function logout() {
  const token = localStorage.getItem("token");

  if (!token) return;

  await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  // Eliminar token
  localStorage.removeItem("token");
}

const API_URL = "http://127.0.0.1:8000/api";

/**
 * Obtiene el token JWT desde localStorage
 */
function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

/**
 * Cambiar estado de una denuncia (ADMIN)
 */
export async function cambiarEstadoDenuncia(
  codigoSeguimiento,
  estado,
  admin_id,
) {
  const response = await fetch(
    `${API_URL}/cambiar-estado/${codigoSeguimiento}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        estado: estado,
        admin_id: admin_id,
      }),
    },
  );

  if (response.status === 401) {
    throw new Error("No autorizado. Inicia sesión nuevamente.");
  }

  if (!response.ok) {
    throw new Error("Error al cambiar el estado de la denuncia");
  }

  return response.json();
}

export async function getResponsables() {
  const response = await fetch(`${API_URL}/responsables`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (response.status === 401) {
    throw new Error("No autorizado. Inicia sesión nuevamente.");
  }

  if (!response.ok) {
    throw new Error("Error al obtener los responsables");
  }

  const data = await response.json();
  return data.data;
}

/**
 * Asignar responsable a una denuncia (ADMIN)
 */
export async function asignarResponsable(codigoSeguimiento, responsableId) {
  const response = await fetch(
    `${API_URL}/asignar-responsable/${codigoSeguimiento}`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        responsable: responsableId,
      }),
    },
  );

  if (response.status === 401) {
    throw new Error("No autorizado. Inicia sesión nuevamente.");
  }

  if (!response.ok) {
    throw new Error("Error al asignar responsable");
  }

  return response.json();
}

/**
 * Agregar nota interna (ADMIN)
 */
export async function agregarNotaInterna(codigoSeguimiento, nota, admin_id) {
  const response = await fetch(
    `${API_URL}/notas-internas/${codigoSeguimiento}`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        notas: nota,
        admin_id: admin_id,
      }),
    },
  );

  if (response.status === 401) {
    throw new Error("No autorizado. Inicia sesión nuevamente.");
  }

  if (!response.ok) {
    throw new Error("Error al agregar la nota interna");
  }

  return response.json();
}

export async function getHistorialEstados(codigoSeguimiento) {
  const response = await fetch(
    `${API_URL}/historial-estados/${codigoSeguimiento}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    },
  );
  if (response.status === 401) {
    throw new Error("No autorizado. Inicia sesión nuevamente.");
  }
  if (!response.ok) {
    throw new Error("Error al obtener el historial de estados");
  }

  const data = await response.json();
  return data.historial_estados;
}

export async function getNotasInternas(codigoSeguimiento) {
  const response = await fetch(
    `${API_URL}/notas-internas/${codigoSeguimiento}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    },
  );
  if (response.status === 401) {
    throw new Error("No autorizado. Inicia sesión nuevamente.");
  }
  if (!response.ok) {
    throw new Error("Error al obtener las notas internas");
  }
  const data = await response.json();
  return data.notas_internas;
}

/**
 * Obtener estadísticas del dashboard (ADMIN)
 */
export async function getEstadisticas() {
  const response = await fetch(`${API_URL}/estadisticas`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (response.status === 401) {
    throw new Error("No autorizado. Inicia sesión nuevamente.");
  }

  if (!response.ok) {
    throw new Error("Error al obtener las estadísticas");
  }

  return response.json();
}

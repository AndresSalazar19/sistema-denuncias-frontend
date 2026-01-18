const API_URL = "http://127.0.0.1:8000/api";

export async function getDenuncias() {
  const response = await fetch(`${API_URL}/getDenuncias`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las denuncias");
  }

  const data = await response.json();

  const denunciasFormateadas = data.data.map((d) => ({
    codigo: d.codigo_seguimiento,
    titulo: d.titulo,
    categoria: d.categoria?.name ?? "",
    estado: d.estado?.name ?? "",
    color: d.estado?.color ?? "#000000",
    fecha: new Date(d.created_at).toLocaleDateString("es-EC"),
    fechaCompleta: new Date(d.created_at).toLocaleString("es-EC", {
      dateStyle: "short",
      timeStyle: "short",
    }),
    descripcion: d.descripcion,
    ubicacion: d.ubicacion_direccion ?? "",
    evidencias: [], // aún no vienen del backend
    funcionario: d.responsable_id ?? "",
  }));

  return denunciasFormateadas;
}

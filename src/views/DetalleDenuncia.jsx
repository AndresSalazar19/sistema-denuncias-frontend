import React, { useState, useEffect } from "react";
import { ImageIcon, MapPin } from "lucide-react";
import { ESTADOS_ORDENADOS } from "../App";
import {
  getResponsables,
  getNotasInternas,
  getHistorialEstados,
} from "../functions/adminService";
import { LogicAnd } from "tabler-icons-react";

export default function DetalleDenuncia({
  handleActualizar,
  handleAsignar,
  handleAgregarNota,
  selectedDenuncia,
  handleCloseModal,
  estadoColors,
}) {
  const [nuevoEstado, setNuevoEstado] = useState("");
  const [responsable, setResponsable] = useState("");
  const [loading, setLoading] = useState(true);
  const [responsables, setResponsables] = useState([]);
  const [notaInterna, setNotaInterna] = useState("");
  const [historialEstados, setHistorialEstados] = useState([]);
  const [notasInternas, setNotasInternas] = useState([]);

  const indiceEstadoActual = ESTADOS_ORDENADOS.indexOf(selectedDenuncia.estado);

  const estadosDisponibles = ESTADOS_ORDENADOS.filter(
    (_, index) => index > indiceEstadoActual,
  );
  const esEstadoFinal = estadosDisponibles.length === 0;

  const cargarTodo = async () => {
    if (!selectedDenuncia) return;

    setLoading(true);
    try {
      const [responsablesData, notasData, historialData] = await Promise.all([
        getResponsables(),
        getNotasInternas(selectedDenuncia.codigo),
        getHistorialEstados(selectedDenuncia.codigo),
      ]);

      setResponsables(responsablesData);
      setNotasInternas(notasData);
      setHistorialEstados(historialData);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDenuncia) {
      setNuevoEstado(selectedDenuncia.estado);
      setResponsable(selectedDenuncia.funcionario);
    }
    cargarTodo();
  }, [selectedDenuncia]);

  const handleResponsable = async () => {
    if (!responsable) {
      alert("Selecciona un responsable antes de asignar.");
      return;
    }

    await handleAsignar(selectedDenuncia.codigo, responsable);
    await cargarTodo();
  };
  const handleSubmitNota = async () => {
    if (notaInterna.trim()) {
      await handleAgregarNota(selectedDenuncia.codigo, notaInterna);
      setNotasInternas([...notasInternas, notaInterna]);
      setNotaInterna("");
      await cargarTodo();
    }
  };

  const responsableActual = responsables.find(
    (r) => r.id === selectedDenuncia.funcionario,
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: '"Outfit", -apple-system, BlinkMacSystemFont, sans-serif',
        padding: "0",
      }}
    >
      <div>
        {/* Modal Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
            padding: "24px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={handleCloseModal}
            style={{
              background: "#f59e0b",
              border: "none",
              padding: "10px 24px",
              borderRadius: "10px",
              color: "white",
              fontSize: "14px",
              fontWeight: "800",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#d97706";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f59e0b";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            ← Volver
          </button>

          <div
            style={{
              color: "white",
              fontSize: "18px",
              fontWeight: "900",
              letterSpacing: "-0.3px",
            }}
          >
            #{selectedDenuncia.codigo}
          </div>
        </div>
        {esEstadoFinal && (
          <p
            style={{
              fontSize: "13px",
              color: "#94a3b8",
              marginTop: "8px",
              padding: "0 28px",
            }}
          >
            Esta denuncia ya fue resuelta
          </p>
        )}

        {/* Modal Body */}
        <div style={{ padding: "32px 28px" }}>
          {/* Sección de Información con dos columnas */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "28px",
            }}
          >
            {/* Columna 1: Información básica */}
            <div
              style={{
                padding: "20px",
                background: "#f8fafc",
                borderRadius: "12px",
                border: "2px solid #e2e8f0",
              }}
            >
              <h3
                style={{
                  margin: "0 0 16px 0",
                  fontSize: "14px",
                  fontWeight: "900",
                  color: "#64748b",
                  letterSpacing: "0.5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                📄 Información
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "800",
                      color: "#64748b",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Título:
                  </span>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                      color: "#1e293b",
                    }}
                  >
                    {selectedDenuncia.titulo}
                  </span>
                </div>

                <div>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "800",
                      color: "#64748b",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Categoría:
                  </span>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                      color: "#1e293b",
                    }}
                  >
                    {selectedDenuncia.categoria}
                  </span>
                </div>

                <div>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "800",
                      color: "#64748b",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Estado:
                  </span>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "6px 16px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "800",
                      background: estadoColors[selectedDenuncia.estado].bg,
                      color: estadoColors[selectedDenuncia.estado].color,
                      border: `2px solid ${
                        estadoColors[selectedDenuncia.estado].border
                      }`,
                    }}
                  >
                    {selectedDenuncia.estado}
                  </span>
                </div>

                <div>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "800",
                      color: "#64748b",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Fecha:
                  </span>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                      color: "#1e293b",
                    }}
                  >
                    {selectedDenuncia.fechaCompleta}
                  </span>
                </div>
              </div>
            </div>

            {/* Columna 2: Historial y Notas */}
            <div
              style={{
                padding: "20px",
                background: "#f8fafc",
                borderRadius: "12px",
                border: "2px solid #e2e8f0",
                maxHeight: "400px",
                overflowY: "auto",
              }}
            >
              <h3
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "14px",
                  fontWeight: "900",
                  color: "#64748b",
                  letterSpacing: "0.5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                📋 Historial & Notas
              </h3>

              {/* Historial de Estados */}
              {loading ? (
                <div style={{ padding: "10px", textAlign: "center" }}>
                  Cargando historial...
                </div>
              ) : (
                <div style={{ marginBottom: "16px" }}>
                  <h4
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "12px",
                      fontWeight: "800",
                      color: "#475569",
                    }}
                  >
                    Estados:
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    {historialEstados.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "8px 10px",
                          background: "white",
                          borderRadius: "6px",
                          border: "1px solid #e2e8f0",
                          fontSize: "11px",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: "700",
                            color: "#1e293b",
                            marginBottom: "2px",
                          }}
                        >
                          🔄 {item.estado_nuevo?.name || "N/A"}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            color: "#64748b",
                            fontSize: "10px",
                          }}
                        >
                          <span>{item.admin?.name || "Sistema"}</span>
                          <span>
                            {new Date(item.created_at).toLocaleDateString(
                              "es-ES",
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notas Internas */}
              {notasInternas.length > 0 && (
                <div>
                  <h4
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "12px",
                      fontWeight: "800",
                      color: "#475569",
                    }}
                  >
                    Notas:
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    {notasInternas.map((nota, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "8px 10px",
                          background: "#fef3c7",
                          borderRadius: "6px",
                          border: "1px solid #fbbf24",
                          fontSize: "11px",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: "600",
                            color: "#92400e",
                            marginBottom: "3px",
                            lineHeight: "1.3",
                          }}
                        >
                          {nota.contenido || nota.nota}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            color: "#b45309",
                            fontSize: "10px",
                          }}
                        >
                          <span>{nota.admin?.name || nota.usuario}</span>
                          <span>
                            {new Date(nota.created_at).toLocaleDateString(
                              "es-ES",
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {historialEstados.length === 0 && notasInternas.length === 0 && (
                <div
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#94a3b8",
                    fontSize: "12px",
                    fontStyle: "italic",
                  }}
                >
                  Sin historial registrado
                </div>
              )}
            </div>
          </div>

          {/* Descripción */}
          <div style={{ marginBottom: "28px" }}>
            <h3
              style={{
                margin: "0 0 12px 0",
                fontSize: "14px",
                fontWeight: "900",
                color: "#64748b",
                letterSpacing: "0.5px",
              }}
            >
              Descripción:
            </h3>
            <div
              style={{
                padding: "16px",
                background: "#f8fafc",
                borderRadius: "12px",
                border: "2px solid #e2e8f0",
                fontSize: "14px",
                fontWeight: "600",
                color: "#475569",
                lineHeight: "1.6",
              }}
            >
              {selectedDenuncia.descripcion}
            </div>
          </div>

          {/* Evidencias */}
          <div style={{ marginBottom: "28px" }}>
            <h3
              style={{
                margin: "0 0 12px 0",
                fontSize: "14px",
                fontWeight: "900",
                color: "#64748b",
                letterSpacing: "0.5px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              📷 Evidencias:
            </h3>
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              {selectedDenuncia.evidencias.length > 0 ? (
                selectedDenuncia.evidencias.map((ev, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: "120px",
                      height: "100px",
                      background: "#fef3c7",
                      borderRadius: "12px",
                      border: "2px solid #fbbf24",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: "800",
                      color: "#92400e",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <ImageIcon size={24} color="#92400e" strokeWidth={2.5} />
                    {ev}
                  </div>
                ))
              ) : (
                <div
                  style={{
                    padding: "16px",
                    color: "#94a3b8",
                    fontSize: "14px",
                    fontWeight: "600",
                    fontStyle: "italic",
                  }}
                >
                  Sin evidencias
                </div>
              )}
            </div>
          </div>

          {/* Ubicación */}
          <div style={{ marginBottom: "28px" }}>
            <h3
              style={{
                margin: "0 0 12px 0",
                fontSize: "14px",
                fontWeight: "900",
                color: "#64748b",
                letterSpacing: "0.5px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              📍 Ubicación:
            </h3>
            <div
              style={{
                position: "relative",
                height: "180px",
                background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
                borderRadius: "12px",
                border: "2px solid #10b981",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              <MapPin
                size={40}
                color="#059669"
                strokeWidth={2.5}
                fill="#059669"
              />
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "800",
                  color: "#047857",
                }}
              >
                {selectedDenuncia.ubicacion}
              </span>
            </div>
          </div>

          {/* Acciones */}
          <div
            style={{
              padding: "24px",
              background: "#f8fafc",
              borderRadius: "12px",
              border: "2px solid #e2e8f0",
            }}
          >
            <h3
              style={{
                margin: "0 0 16px 0",
                fontSize: "14px",
                fontWeight: "900",
                color: "#64748b",
                letterSpacing: "0.5px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              ⚙️ Acciones:
            </h3>

            {/* Cambiar Estado */}
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "13px",
                  fontWeight: "800",
                  color: "#475569",
                }}
              >
                Cambiar Estado:
              </label>
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <select
                    value={nuevoEstado}
                    onChange={(e) => setNuevoEstado(e.target.value)}
                    disabled={esEstadoFinal}
                    style={{
                      width: "100%",
                      padding: "12px 36px 12px 16px",
                      border: "2px solid #e2e8f0",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontWeight: "600",
                      fontFamily: "inherit",
                      cursor: esEstadoFinal ? "not-allowed" : "pointer",
                      appearance: "none",
                      opacity: esEstadoFinal ? 0.5 : 1,
                    }}
                  >
                    {estadosDisponibles.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                  <div
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      fontSize: "10px",
                      color: "#64748b",
                    }}
                  >
                    ▼
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleActualizar(selectedDenuncia.codigo, nuevoEstado)
                  }
                  disabled={esEstadoFinal}
                  style={{
                    background: esEstadoFinal ? "#cbd5e1" : "#10b981",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: "800",
                    cursor: esEstadoFinal ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    fontFamily: "inherit",
                    boxShadow: esEstadoFinal
                      ? "none"
                      : "0 2px 8px rgba(16, 185, 129, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    if (!esEstadoFinal) {
                      e.currentTarget.style.background = "#059669";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!esEstadoFinal) {
                      e.currentTarget.style.background = "#10b981";
                    }
                  }}
                >
                  Actualizar
                </button>
              </div>
            </div>

            {/* Responsable Asignado */}
            <div style={{ marginBottom: "16px" }}>
              {!selectedDenuncia.funcionario ? (
                // Sin responsable asignado - Vista prominente
                <div
                  style={{
                    padding: "24px",
                    background:
                      "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                    borderRadius: "12px",
                    border: "3px solid #fbbf24",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <span style={{ fontSize: "32px" }}>⚠️</span>
                    <div>
                      <h4
                        style={{
                          margin: "0 0 4px 0",
                          fontSize: "16px",
                          fontWeight: "900",
                          color: "#92400e",
                        }}
                      >
                        Responsable no asignado
                      </h4>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#b45309",
                        }}
                      >
                        Esta denuncia necesita un responsable
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ position: "relative", flex: 1 }}>
                      <select
                        style={{
                          width: "100%",
                          padding: "12px 36px 12px 16px",
                          border: "2px solid #f59e0b",
                          borderRadius: "10px",
                          fontSize: "14px",
                          fontWeight: "600",
                          fontFamily: "inherit",
                          cursor: "pointer",
                          appearance: "none",
                          background: "white",
                        }}
                        value={responsable || ""}
                        onChange={(e) => setResponsable(Number(e.target.value))}
                      >
                        <option value="">Seleccionar responsable...</option>
                        {responsables.map((resp) => (
                          <option key={resp.id} value={resp.id}>
                            {resp.name} {resp.surname}
                          </option>
                        ))}
                      </select>
                      <div
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                          fontSize: "10px",
                          color: "#64748b",
                        }}
                      >
                        ▼
                      </div>
                    </div>
                    <button
                      onClick={handleResponsable}
                      disabled={!responsable}
                      style={{
                        background: responsable ? "#f59e0b" : "#d1d5db",
                        color: "white",
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: "10px",
                        fontSize: "14px",
                        fontWeight: "800",
                        cursor: responsable ? "pointer" : "not-allowed",
                        transition: "all 0.2s ease",
                        fontFamily: "inherit",
                        boxShadow: responsable
                          ? "0 2px 8px rgba(245, 158, 11, 0.3)"
                          : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (responsable) {
                          e.currentTarget.style.background = "#d97706";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (responsable) {
                          e.currentTarget.style.background = "#f59e0b";
                        }
                      }}
                    >
                      Asignar
                    </button>
                  </div>
                </div>
              ) : (
                // Con responsable asignado - Vista compacta
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "13px",
                      fontWeight: "800",
                      color: "#475569",
                    }}
                  >
                    👤 Responsable Asignado:
                  </label>
                  {loading ? (
                    <div style={{ padding: "10px", textAlign: "center" }}>
                      Cargando responsable...
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: "16px",
                        background: "#dbeafe",
                        borderRadius: "10px",
                        border: "2px solid #3b82f6",
                        marginBottom: "12px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: "800",
                          color: "#1e40af",
                        }}
                      >
                        {responsableActual?.name} {responsableActual?.surname}
                      </div>
                    </div>
                  )}
                  <details>
                    <summary
                      style={{
                        fontSize: "13px",
                        fontWeight: "700",
                        color: "#64748b",
                        cursor: "pointer",
                        padding: "8px 0",
                        listStyle: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span>🔄</span> Reasignar responsable
                    </summary>
                    <div
                      style={{
                        marginTop: "12px",
                        padding: "16px",
                        background: "#f1f5f9",
                        borderRadius: "10px",
                        border: "2px solid #cbd5e1",
                      }}
                    >
                      <div style={{ display: "flex", gap: "12px" }}>
                        <div style={{ position: "relative", flex: 1 }}>
                          <select
                            style={{
                              width: "100%",
                              padding: "12px 36px 12px 16px",
                              border: "2px solid #e2e8f0",
                              borderRadius: "10px",
                              fontSize: "14px",
                              fontWeight: "600",
                              fontFamily: "inherit",
                              cursor: "pointer",
                              appearance: "none",
                              background: "white",
                            }}
                            value={responsable}
                            onChange={(e) =>
                              setResponsable(Number(e.target.value))
                            }
                          >
                            {responsables.map((resp) => (
                              <option key={resp.id} value={resp.id}>
                                {resp.name} {resp.surname}
                              </option>
                            ))}
                          </select>
                          <div
                            style={{
                              position: "absolute",
                              right: "12px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              pointerEvents: "none",
                              fontSize: "10px",
                              color: "#64748b",
                            }}
                          >
                            ▼
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            handleAsignar(selectedDenuncia.codigo, responsable)
                          }
                          style={{
                            background: "#10b981",
                            color: "white",
                            border: "none",
                            padding: "12px 24px",
                            borderRadius: "10px",
                            fontSize: "14px",
                            fontWeight: "800",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            fontFamily: "inherit",
                            boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#059669";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#10b981";
                          }}
                        >
                          Reasignar
                        </button>
                      </div>
                    </div>
                  </details>
                </div>
              )}
            </div>

            {/* Notas Internas */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "13px",
                  fontWeight: "800",
                  color: "#475569",
                }}
              >
                📝 Agregar Nota Interna:
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <textarea
                  value={notaInterna}
                  onChange={(e) => setNotaInterna(e.target.value)}
                  placeholder="Escribe una nota interna sobre esta denuncia..."
                  style={{
                    width: "100%",
                    minHeight: "100px",
                    padding: "12px 16px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: "600",
                    fontFamily: "inherit",
                    resize: "vertical",
                    lineHeight: "1.5",
                  }}
                />
                <button
                  onClick={handleSubmitNota}
                  disabled={!notaInterna.trim()}
                  style={{
                    background: notaInterna.trim() ? "#8b5cf6" : "#cbd5e1",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: "800",
                    cursor: notaInterna.trim() ? "pointer" : "not-allowed",
                    transition: "all 0.2s ease",
                    fontFamily: "inherit",
                    alignSelf: "flex-end",
                    boxShadow: notaInterna.trim()
                      ? "0 2px 8px rgba(139, 92, 246, 0.3)"
                      : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (notaInterna.trim()) {
                      e.currentTarget.style.background = "#7c3aed";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (notaInterna.trim()) {
                      e.currentTarget.style.background = "#8b5cf6";
                    }
                  }}
                >
                  ✓ Añadir Nota
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

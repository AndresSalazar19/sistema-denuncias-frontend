import React, { useState } from "react";
import { ImageIcon, MapPin } from "lucide-react";
import { ESTADOS_ORDENADOS } from "../App";
export default function DetalleDenuncia({
  handleActualizar,
  handleAsignar,
  handleNotificar,
  selectedDenuncia,
  handleCloseModal,
  estadoColors,
}) {
  const [nuevoEstado, setNuevoEstado] = useState("");
  const indiceEstadoActual = ESTADOS_ORDENADOS.indexOf(selectedDenuncia.estado);

  const estadosDisponibles = ESTADOS_ORDENADOS.filter(
    (_, index) => index > indiceEstadoActual
  );
  const esEstadoFinal = estadosDisponibles.length === 0;

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
          <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: "8px" }}>
            Esta denuncia ya fue resuelta
          </p>
        )}
        {/* Modal Body */}
        <div style={{ padding: "32px 28px" }}>
          {/* Información Section */}
          <div
            style={{
              marginBottom: "28px",
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
                      cursor: "pointer",
                      appearance: "none",
                    }}
                  >
                    <option value="">Seleccionar</option>
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
                  Actualizar
                </button>
              </div>
            </div>

            {/* Asignar a */}
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
                Asignar a:
              </label>
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
                    }}
                  >
                    <option>Funcionario</option>
                    <option>Juan Pérez</option>
                    <option>María García</option>
                    <option>Carlos López</option>
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
                  onClick={handleAsignar}
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
                  Asignar
                </button>
              </div>
            </div>

            {/* Notificar Cambios */}
            <button
              onClick={handleNotificar}
              style={{
                width: "100%",
                background: "#f59e0b",
                color: "white",
                border: "none",
                padding: "14px",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "900",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "inherit",
                boxShadow: "0 2px 8px rgba(245, 158, 11, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
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
              🔔 Notificar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

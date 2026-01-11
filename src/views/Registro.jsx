import React from "react";
import { MapPin, Plus } from "tabler-icons-react";

export default function Registro({
  categorias,
  setFormData,
  formData,
  selectedLocation,
  evidencias,
  handleMapClick,
  handleAddEvidence,
  handleSubmit,
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        fontFamily:
          '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* Form Container */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "32px 24px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div style={{ marginBottom: "32px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#10b981",
                }}
              ></div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "26px",
                  fontWeight: "800",
                  color: "#0f172a",
                  letterSpacing: "-0.5px",
                }}
              >
                Nueva Denuncia Anónima
              </h3>
            </div>
            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "15px",
                fontWeight: "500",
                paddingLeft: "20px",
              }}
            >
              Completa los campos para registrar tu reporte
            </p>
          </div>

          {/* Título */}
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "700",
                color: "#334155",
                letterSpacing: "0.3px",
              }}
            >
              TÍTULO <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Bache peligroso..."
              value={formData.titulo}
              onChange={(e) =>
                setFormData({ ...formData, titulo: e.target.value })
              }
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "2px solid #e2e8f0",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: "500",
                fontFamily: "inherit",
                transition: "all 0.2s ease",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
          </div>

          {/* Categoría */}
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "12px",
                fontSize: "14px",
                fontWeight: "700",
                color: "#334155",
                letterSpacing: "0.3px",
              }}
            >
              CATEGORÍA <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "12px",
              }}
            >
              {categorias.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() =>
                    setFormData({ ...formData, categoria: cat.id })
                  }
                  style={{
                    padding: "16px 12px",
                    border:
                      formData.categoria === cat.id
                        ? "2px solid #667eea"
                        : "2px solid #e2e8f0",
                    borderRadius: "12px",
                    background:
                      formData.categoria === cat.id ? "#f0f4ff" : "white",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    if (formData.categoria !== cat.id) {
                      e.currentTarget.style.borderColor = "#cbd5e1";
                      e.currentTarget.style.background = "#f8fafc";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (formData.categoria !== cat.id) {
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.background = "white";
                    }
                  }}
                >
                  <span style={{ fontSize: "28px" }}>{cat.icon}</span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      color:
                        formData.categoria === cat.id ? "#667eea" : "#475569",
                      textAlign: "center",
                    }}
                  >
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Descripción */}
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "700",
                color: "#334155",
                letterSpacing: "0.3px",
              }}
            >
              DESCRIPCIÓN <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <textarea
              placeholder="Describe el problema..."
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({ ...formData, descripcion: e.target.value })
              }
              rows={4}
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "2px solid #e2e8f0",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: "500",
                fontFamily: "inherit",
                resize: "vertical",
                transition: "all 0.2s ease",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
          </div>

          {/* Ubicación */}
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "700",
                color: "#334155",
                letterSpacing: "0.3px",
              }}
            >
              <MapPin size={16} strokeWidth={3} />
              UBICACIÓN <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <div
              onClick={handleMapClick}
              style={{
                position: "relative",
                height: "220px",
                background: "linear-gradient(135deg, #e0f2e9 0%, #c7f5d9 100%)",
                borderRadius: "16px",
                border: "2px solid #10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.01)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(16, 185, 129, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {selectedLocation ? (
                <>
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      animation: "bounce 1s ease-in-out infinite",
                    }}
                  >
                    <MapPin
                      size={48}
                      color="#10b981"
                      strokeWidth={2.5}
                      fill="#10b981"
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "white",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "700",
                      color: "#10b981",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    ✓ Ubicación seleccionada
                  </div>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <MapPin
                    size={48}
                    color="#10b981"
                    strokeWidth={2}
                    style={{ marginBottom: "12px" }}
                  />
                  <p
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#059669",
                    }}
                  >
                    Haz clic para seleccionar ubicación
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Evidencias */}
          <div style={{ marginBottom: "32px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "12px",
                fontSize: "14px",
                fontWeight: "700",
                color: "#334155",
                letterSpacing: "0.3px",
              }}
            >
              EVIDENCIAS (máx. 3)
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: "12px",
              }}
            >
              {evidencias.map((ev) => (
                <div
                  key={ev.id}
                  style={{
                    aspectRatio: "1",
                    background: "#f1f5f9",
                    borderRadius: "12px",
                    border: "2px dashed #cbd5e1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: "32px" }}>📷</span>
                </div>
              ))}
              {evidencias.length < 3 && (
                <button
                  onClick={handleAddEvidence}
                  style={{
                    aspectRatio: "1",
                    background: "white",
                    borderRadius: "12px",
                    border: "2px dashed #cbd5e1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#667eea";
                    e.currentTarget.style.background = "#f8fafc";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.background = "white";
                  }}
                >
                  <Plus size={32} color="#94a3b8" strokeWidth={2} />
                </button>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              padding: "18px",
              borderRadius: "14px",
              fontSize: "17px",
              fontWeight: "800",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 16px rgba(102, 126, 234, 0.4)",
              fontFamily: "inherit",
              letterSpacing: "-0.3px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(102, 126, 234, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 16px rgba(102, 126, 234, 0.4)";
            }}
          >
            Enviar Denuncia
          </button>
        </div>
      </div>

      <style>{`
          @keyframes bounce {
            0%, 100% { transform: translate(-50%, -50%) translateY(0); }
            50% { transform: translate(-50%, -50%) translateY(-10px); }
          }
        `}</style>
    </div>
  );
}
import React, { useState } from "react";
import { Search, MapPin, AlertCircle, Loader } from "lucide-react";

export default function Consulta() {
  const [searchCode, setSearchCode] = useState("");
  const [denuncia, setDenuncia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  // Mapeo de estados a progreso numérico basado en el nuevo formato
  const estadoToProgreso = {
    "Nueva": 0,
    "En Revisión": 1,
    "En Proceso": 2,
    "Resuelta": 3,
    "Rechazada": 3
  };

  const handleSearch = async () => {
    if (!searchCode.trim()) {
      setError("Por favor ingresa un código de seguimiento");
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);
    setDenuncia(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8081/api/denuncias/consultar/${searchCode.trim()}`
      );

      if (response.ok) {
        const data = await response.json();
        setDenuncia(data);
        setError(null);
      } else if (response.status === 404) {
        setError("No se encontró ninguna denuncia con ese código");
        setDenuncia(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al buscar la denuncia");
        setDenuncia(null);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Error de conexión. Verifica que el servidor esté activo.");
      setDenuncia(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const formatDate = (dateString) => {
    // El formato viene como "18/01/2026 - 22:44"
    return dateString;
  };

  const getEstadoColor = (estado) => {
    const colores = {
      "Nueva": { bg: "#dbeafe", text: "#1e40af", badge: "#3b82f6" },
      "En Revisión": { bg: "#fef3c7", text: "#92400e", badge: "#f59e0b" },
      "En Proceso": { bg: "#fef3c7", text: "#92400e", badge: "#f59e0b" },
      "Resuelta": { bg: "#d1fae5", text: "#065f46", badge: "#10b981" },
      "Rechazada": { bg: "#fee2e2", text: "#991b1b", badge: "#ef4444" },
    };
    return colores[estado] || colores["Nueva"];
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        fontFamily:
          '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
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
            padding: "32px",
            marginBottom: "24px",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
              fontSize: "14px",
              fontWeight: "700",
              color: "#334155",
              letterSpacing: "0.3px",
            }}
          >
            <Search size={18} strokeWidth={3} />
            BUSCAR POR CÓDIGO
          </label>
          <div style={{ display: "flex", gap: "12px" }}>
            <input
              type="text"
              placeholder="DEN-2026-XXXXX"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              disabled={loading}
              style={{
                flex: 1,
                padding: "16px 20px",
                border: "2px solid #e2e8f0",
                borderRadius: "14px",
                fontSize: "16px",
                fontWeight: "600",
                fontFamily: "inherit",
                transition: "all 0.2s ease",
                outline: "none",
                opacity: loading ? 0.6 : 1,
              }}
              onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              style={{
                background: loading
                  ? "#94a3b8"
                  : "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
                color: "white",
                border: "none",
                padding: "16px 32px",
                borderRadius: "14px",
                fontSize: "16px",
                fontWeight: "800",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                boxShadow: loading
                  ? "none"
                  : "0 4px 16px rgba(14, 165, 233, 0.3)",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(14, 165, 233, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = loading
                  ? "none"
                  : "0 4px 16px rgba(14, 165, 233, 0.3)";
              }}
            >
              {loading ? (
                <>
                  <Loader size={20} className="spin" />
                  Buscando...
                </>
              ) : (
                "Buscar"
              )}
            </button>
          </div>
        </div>

        {error && (
          <div
            style={{
              background: "#fee2e2",
              border: "2px solid #fecaca",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              animation: "slideUp 0.3s ease-out",
            }}
          >
            <AlertCircle size={24} color="#dc2626" strokeWidth={2.5} />
            <p
              style={{
                margin: 0,
                fontSize: "15px",
                fontWeight: "600",
                color: "#991b1b",
              }}
            >
              {error}
            </p>
          </div>
        )}

        {denuncia && (
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "40px",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
              animation: "slideUp 0.5s ease-out",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: getEstadoColor(denuncia.estado).bg,
                padding: "8px 16px",
                borderRadius: "12px",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "800",
                  color: getEstadoColor(denuncia.estado).text,
                  letterSpacing: "-0.3px",
                }}
              >
                {denuncia.codigo_seguimiento}
              </span>
            </div>

            <div
              style={{
                display: "inline-block",
                background: denuncia.estado_color || getEstadoColor(denuncia.estado).badge,
                color: "white",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "800",
                marginBottom: "24px",
                marginLeft: "12px",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              {denuncia.estado}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
                marginBottom: "28px",
              }}
            >
              <div>
                <p
                  style={{
                    margin: "0 0 6px 0",
                    fontSize: "12px",
                    fontWeight: "800",
                    color: "#64748b",
                    letterSpacing: "0.5px",
                  }}
                >
                  CATEGORÍA
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#0f172a",
                  }}
                >
                  {denuncia.categoria}
                </p>
              </div>
              <div>
                <p
                  style={{
                    margin: "0 0 6px 0",
                    fontSize: "12px",
                    fontWeight: "800",
                    color: "#64748b",
                    letterSpacing: "0.5px",
                  }}
                >
                  FECHA REGISTRO
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#0f172a",
                  }}
                >
                  {formatDate(denuncia.fecha_registro)}
                </p>
              </div>
              <div>
                <p
                  style={{
                    margin: "0 0 6px 0",
                    fontSize: "12px",
                    fontWeight: "800",
                    color: "#64748b",
                    letterSpacing: "0.5px",
                  }}
                >
                  ÚLTIMA ACTUALIZACIÓN
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#0f172a",
                  }}
                >
                  {formatDate(denuncia.fecha_actualizacion)}
                </p>
              </div>
            </div>

            {denuncia.ubicacion && (
              <div style={{ marginBottom: "28px" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "12px",
                    fontSize: "12px",
                    fontWeight: "800",
                    color: "#64748b",
                    letterSpacing: "0.5px",
                  }}
                >
                  <MapPin size={16} strokeWidth={3} />
                  UBICACIÓN
                </label>
                <div
                  style={{
                    position: "relative",
                    height: "180px",
                    background:
                      "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                    borderRadius: "16px",
                    border: "2px solid #0ea5e9",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                  }}
                >
                  <MapPin
                    size={40}
                    color="#0ea5e9"
                    strokeWidth={2.5}
                    fill="#0ea5e9"
                  />
                  <p
                    style={{
                      margin: 0,
                      fontSize: "15px",
                      fontWeight: "700",
                      color: "#0369a1",
                      textAlign: "center",
                      padding: "0 20px",
                    }}
                  >
                    {denuncia.ubicacion.direccion}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#0284c7",
                    }}
                  >
                    Lat: {parseFloat(denuncia.ubicacion.lat).toFixed(6)} | Lng:{" "}
                    {parseFloat(denuncia.ubicacion.lng).toFixed(6)}
                  </p>
                </div>
              </div>
            )}

            <div>
              <p
                style={{
                  margin: "0 0 16px 0",
                  fontSize: "12px",
                  fontWeight: "800",
                  color: "#64748b",
                  letterSpacing: "0.5px",
                }}
              >
                PROGRESO
              </p>
              <div
                style={{ display: "flex", gap: "12px", alignItems: "center" }}
              >
                {["Nueva", "En Revisión", "En Proceso", "Resuelta"].map(
                  (step, idx) => {
                    const progreso = estadoToProgreso[denuncia.estado] || 0;
                    return (
                      <React.Fragment key={step}>
                        <div style={{ flex: 1, textAlign: "center" }}>
                          <div
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "50%",
                              background:
                                idx <= progreso
                                  ? "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)"
                                  : "#e2e8f0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "0 auto 8px",
                              transition: "all 0.3s ease",
                              boxShadow:
                                idx <= progreso
                                  ? "0 4px 12px rgba(14, 165, 233, 0.3)"
                                  : "none",
                            }}
                          >
                            {idx < progreso ? (
                              <span
                                style={{
                                  color: "white",
                                  fontSize: "20px",
                                  fontWeight: "800",
                                }}
                              >
                                ✓
                              </span>
                            ) : (
                              <span
                                style={{
                                  color: idx === progreso ? "white" : "#94a3b8",
                                  fontSize: "16px",
                                  fontWeight: "800",
                                }}
                              >
                                {idx + 1}
                              </span>
                            )}
                          </div>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "11px",
                              fontWeight: "700",
                              color: idx <= progreso ? "#0ea5e9" : "#94a3b8",
                            }}
                          >
                            {step}
                          </p>
                        </div>
                        {idx < 3 && (
                          <div
                            style={{
                              flex: 0.5,
                              height: "4px",
                              background: idx < progreso ? "#0ea5e9" : "#e2e8f0",
                              borderRadius: "2px",
                              marginBottom: "28px",
                              transition: "all 0.3s ease",
                            }}
                          />
                        )}
                      </React.Fragment>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        )}

        {searched && !denuncia && !error && !loading && (
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "60px 40px",
              textAlign: "center",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
              animation: "slideUp 0.3s ease-out",
            }}
          >
            <Search size={64} color="#cbd5e1" strokeWidth={1.5} />
            <p
              style={{
                margin: "20px 0 0 0",
                fontSize: "18px",
                fontWeight: "700",
                color: "#64748b",
              }}
            >
              Realiza una búsqueda para ver los resultados
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
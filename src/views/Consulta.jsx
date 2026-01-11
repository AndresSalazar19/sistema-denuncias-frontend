import React from "react";
import { ArrowLeft, Search, MapPin } from "tabler-icons-react";

export default function Consulta({
  searchCode,
  setSearchCode,
  handleSearch,
  mockDenuncia,
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
      {/* Search Container */}
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
              placeholder="DEN-2025-XXXXX"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
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
              }}
              onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
            <button
              onClick={handleSearch}
              style={{
                background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
                color: "white",
                border: "none",
                padding: "16px 32px",
                borderRadius: "14px",
                fontSize: "16px",
                fontWeight: "800",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 16px rgba(14, 165, 233, 0.3)",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(14, 165, 233, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(14, 165, 233, 0.3)";
              }}
            >
              Buscar
            </button>
          </div>
        </div>

        {/* Result Card */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
            animation: "slideUp 0.5s ease-out",
          }}
        >
          {/* Code Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#fef3c7",
              padding: "8px 16px",
              borderRadius: "12px",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                fontWeight: "800",
                color: "#92400e",
                letterSpacing: "-0.3px",
              }}
            >
              {mockDenuncia.codigo}
            </span>
          </div>

          {/* Status Badge */}
          <div
            style={{
              display: "inline-block",
              background: "#fef3c7",
              color: "#92400e",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "800",
              marginBottom: "24px",
              marginLeft: "12px",
              letterSpacing: "0.5px",
            }}
          >
            {mockDenuncia.estado}
          </div>

          {/* Info Grid */}
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
                {mockDenuncia.categoria}
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
                FECHA
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#0f172a",
                }}
              >
                {mockDenuncia.fecha}
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
                ACTUALIZACIÓN
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#0f172a",
                }}
              >
                {mockDenuncia.actualizacion}
              </p>
            </div>
          </div>

          {/* Location Map */}
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
                background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
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
                }}
              >
                {mockDenuncia.ubicacion.address}
              </p>
            </div>
          </div>

          {/* Progress */}
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
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              {["Nueva", "Revisión", "Proceso", "Resuelta"].map((step, idx) => (
                <React.Fragment key={step}>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background:
                          idx <= mockDenuncia.progreso
                            ? "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)"
                            : "#e2e8f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 8px",
                        transition: "all 0.3s ease",
                        boxShadow:
                          idx <= mockDenuncia.progreso
                            ? "0 4px 12px rgba(14, 165, 233, 0.3)"
                            : "none",
                      }}
                    >
                      {idx < mockDenuncia.progreso ? (
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
                            color:
                              idx === mockDenuncia.progreso
                                ? "white"
                                : "#94a3b8",
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
                        color:
                          idx <= mockDenuncia.progreso ? "#0ea5e9" : "#94a3b8",
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
                        background:
                          idx < mockDenuncia.progreso ? "#0ea5e9" : "#e2e8f0",
                        borderRadius: "2px",
                        marginBottom: "28px",
                        transition: "all 0.3s ease",
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
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
        `}</style>
    </div>
  );
}
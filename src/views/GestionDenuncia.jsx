import React, { useState } from "react";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import DetalleDenuncia from "./DetalleDenuncia";

export default function GestionDenuncia() {
  const [selectedDenuncia, setSelectedDenuncia] = useState(null);
  const [filters, setFilters] = useState({
    estado: "",
    categoria: "",
    fechas: "",
  });

  // Mock data
  const [denuncias, setDenuncias] = useState([
    {
      codigo: "DEN-A7K9M3",
      titulo: "Bache peligroso en avenida principal",
      categoria: "Infraestructura",
      estado: "Revisión",
      fecha: "14/12/25",
      fechaCompleta: "14/12/2025 - 10:30 AM",
      descripcion:
        "Existe un bache de aproximadamente 50cm de profundidad que ha causado varios accidentes",
      ubicacion: "Av. Principal esq. Calle 5",
      evidencias: ["Img 1", "Img 2"],
      funcionario: "",
    },
    {
      codigo: "DEN-B2N4P7",
      categoria: "Seguridad",
      estado: "Nueva",
      fecha: "13/12/25",
      fechaCompleta: "13/12/2025 - 15:45 PM",
      titulo: "Falta de iluminación en parque",
      descripcion: "El parque central no tiene iluminación nocturna",
      ubicacion: "Parque Central",
      evidencias: [],
      funcionario: "",
    },
    {
      codigo: "DEN-C5M8Q1",
      categoria: "Medio Ambiente",
      estado: "Proceso",
      fecha: "12/12/25",
      fechaCompleta: "12/12/2025 - 09:20 AM",
      titulo: "Basura acumulada en esquina",
      descripcion: "Acumulación de basura desde hace una semana",
      ubicacion: "Calle 10 y Av. 5",
      evidencias: ["Img 1"],
      funcionario: "",
    },
    {
      codigo: "DEN-D9L3R6",
      categoria: "Serv. Públicos",
      estado: "Resuelta",
      fecha: "11/12/25",
      fechaCompleta: "11/12/2025 - 14:00 PM",
      titulo: "Fuga de agua en tubería principal",
      descripcion: "Fuga significativa en tubería de agua potable",
      ubicacion: "Av. 8 Norte",
      evidencias: ["Img 1", "Img 2"],
      funcionario: "Juan Pérez",
    },
  ]);

  const estadoColors = {
    Revisión: { bg: "#fef3c7", color: "#f59e0b", border: "#fbbf24" },
    Nueva: { bg: "#d1fae5", color: "#10b981", border: "#34d399" },
    Proceso: { bg: "#dbeafe", color: "#3b82f6", border: "#60a5fa" },
    Resuelta: { bg: "#f3e8ff", color: "#a855f7", border: "#c084fc" },
  };

  const handleVerDetalle = (denuncia) => {
    setSelectedDenuncia(denuncia);
  };

  const denunciasFiltradas = denuncias.filter((denuncia) => {
    // Filtro por estado
    if (
      filters.estado &&
      denuncia.estado.toLowerCase() !== filters.estado.toLowerCase()
    ) {
      return false;
    }

    // Filtro por categoría
    if (
      filters.categoria &&
      denuncia.categoria.toLowerCase() !== filters.categoria.toLowerCase()
    ) {
      return false;
    }

    // Filtro por fecha (búsqueda simple)
    if (filters.fechas && !denuncia.fecha.includes(filters.fechas)) {
      return false;
    }

    return true;
  });

  const handleCloseModal = () => {
    setSelectedDenuncia(null);
  };

  const handleActualizar = (codigo, estado) => {
    setDenuncias((prev) =>
      prev.map((d) => (d.codigo === codigo ? { ...d, estado: estado } : d))
    );

    setSelectedDenuncia((prev) => ({
      ...prev,
      estado: estado,
    }));
    alert("Estado actualizado correctamente");
    setSelectedDenuncia(null);
  };

  const handleAsignar = () => {
    alert("Funcionario asignado correctamente");
  };

  const handleNotificar = () => {
    alert("Cambios notificados al usuario");
  };
  return (
    <>
      {!selectedDenuncia && (
        <div
          style={{
            minHeight: "100vh",
            background: "#f8fafc",
            fontFamily:
              '"Outfit", -apple-system, BlinkMacSystemFont, sans-serif',
            padding: "0",
          }}
        >
          {/* Filters Section */}
          <div
            style={{
              background: "white",
              padding: "24px 32px",
              borderBottom: "2px solid #e2e8f0",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "800",
                  color: "#334155",
                  marginRight: "8px",
                }}
              >
                Filtros:
              </div>

              {/* Estado Filter */}
              <div style={{ position: "relative" }}>
                <select
                  value={filters.estado}
                  onChange={(e) =>
                    setFilters({ ...filters, estado: e.target.value })
                  }
                  style={{
                    padding: "10px 40px 10px 16px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: "600",
                    fontFamily: "inherit",
                    cursor: "pointer",
                    background: "white",
                    color: "#64748b",
                    appearance: "none",
                    minWidth: "140px",
                  }}
                >
                  <option value="">Estado</option>
                  <option value="nueva">Nueva</option>
                  <option value="revision">Revisión</option>
                  <option value="proceso">Proceso</option>
                  <option value="resuelta">Resuelta</option>
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

              {/* Categoría Filter */}
              <div style={{ position: "relative" }}>
                <select
                  value={filters.categoria}
                  onChange={(e) =>
                    setFilters({ ...filters, categoria: e.target.value })
                  }
                  style={{
                    padding: "10px 40px 10px 16px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: "600",
                    fontFamily: "inherit",
                    cursor: "pointer",
                    background: "white",
                    color: "#64748b",
                    appearance: "none",
                    minWidth: "160px",
                  }}
                >
                  <option value="">Categoría</option>
                  <option value="infraestructura">Infraestructura</option>
                  <option value="seguridad">Seguridad</option>
                  <option value="ambiente">Medio Ambiente</option>
                  <option value="servicios">Serv. Públicos</option>
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

              {/* Fechas Filter */}
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="📅 Fechas"
                  value={filters.fechas}
                  onChange={(e) =>
                    setFilters({ ...filters, fechas: e.target.value })
                  }
                  style={{
                    padding: "10px 40px 10px 16px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: "600",
                    fontFamily: "inherit",
                    background: "white",
                    color: "#64748b",
                    minWidth: "160px",
                  }}
                />
              </div>

              {/* Buscar Button */}
              <button
                style={{
                  background: "#10b981",
                  color: "white",
                  border: "none",
                  padding: "10px 28px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: "800",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit",
                  boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#059669";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#10b981";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Buscar
              </button>

              {/* Nueva Button */}
              <button
                style={{
                  background: "#f59e0b",
                  color: "white",
                  border: "none",
                  padding: "10px 28px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: "800",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit",
                  marginLeft: "auto",
                  boxShadow: "0 2px 8px rgba(245, 158, 11, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#d97706";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f59e0b";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{ fontSize: "18px", fontWeight: "900" }}>+</span>{" "}
                Nueva
              </button>
            </div>
          </div>

          {/* Table */}
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "24px",
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                border: "1px solid #e2e8f0",
              }}
            >
              {/* Table Header */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "180px 200px 150px 130px 100px",
                  background:
                    "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
                  padding: "18px 24px",
                  color: "white",
                  fontWeight: "900",
                  fontSize: "14px",
                  letterSpacing: "0.3px",
                }}
              >
                <div>Código</div>
                <div>Categoría</div>
                <div>Estado</div>
                <div>Fecha</div>
                <div>Ver</div>
              </div>

              {/* Table Body */}
              {denunciasFiltradas.map((denuncia, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "180px 200px 150px 130px 100px",
                    padding: "20px 24px",
                    borderBottom:
                      idx < denunciasFiltradas.length - 1
                        ? "1px solid #f1f5f9"
                        : "none",
                    alignItems: "center",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f8fafc";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "white";
                  }}
                >
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "800",
                      color: "#1e293b",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {denuncia.codigo}
                  </div>

                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#475569",
                    }}
                  >
                    {denuncia.categoria}
                  </div>

                  <div>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "6px 16px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "800",
                        background: estadoColors[denuncia.estado].bg,
                        color: estadoColors[denuncia.estado].color,
                        border: `2px solid ${
                          estadoColors[denuncia.estado].border
                        }`,
                      }}
                    >
                      {denuncia.estado}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#64748b",
                    }}
                  >
                    {denuncia.fecha}
                  </div>

                  <div>
                    <button
                      onClick={() => handleVerDetalle(denuncia)}
                      style={{
                        background: "#0ea5e9",
                        border: "none",
                        padding: "8px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(14, 165, 233, 0.3)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#0284c7";
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#0ea5e9";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <Eye size={18} color="white" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
                marginTop: "24px",
                padding: "20px",
              }}
            >
              <button
                style={{
                  background: "white",
                  border: "2px solid #e2e8f0",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#64748b",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#0ea5e9";
                  e.currentTarget.style.color = "#0ea5e9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.color = "#64748b";
                }}
              >
                <ChevronLeft size={16} strokeWidth={3} /> Ant
              </button>

              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#64748b",
                }}
              >
                Pág. 1 de 8
              </span>

              <button
                style={{
                  background: "white",
                  border: "2px solid #e2e8f0",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#64748b",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#0ea5e9";
                  e.currentTarget.style.color = "#0ea5e9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.color = "#64748b";
                }}
              >
                Sig <ChevronRight size={16} strokeWidth={3} />
              </button>
            </div>
          </div>

          <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

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
      )}
      {selectedDenuncia && (
        <div
          style={{
            minHeight: "100vh",
            background: "#f8fafc",
            fontFamily:
              '"Outfit", -apple-system, BlinkMacSystemFont, sans-serif',
            padding: "0",
          }}
        >
          <DetalleDenuncia
            handleActualizar={handleActualizar}
            handleAsignar={handleAsignar}
            handleNotificar={handleNotificar}
            selectedDenuncia={selectedDenuncia}
            handleCloseModal={handleCloseModal}
            estadoColors={estadoColors}
          />
          <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

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
      )}
    </>
  );
}

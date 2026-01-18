import React, { useState, useEffect } from "react";
import { getEstadisticas } from "../functions/adminService";

export default function DashboardContent() {
  const [loading, setLoading] = useState(true);
  const [estadisticas, setEstadisticas] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      setLoading(true);
      const data = await getEstadisticas();
      setEstadisticas(data);
      setError(null);
    } catch (err) {
      console.error("Error al cargar estadísticas:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "32px 24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <div
          style={{
            fontSize: "18px",
            fontWeight: "700",
            color: "#64748b",
          }}
        >
          Cargando estadísticas...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "32px 24px",
        }}
      >
        <div
          style={{
            background: "#fee2e2",
            border: "2px solid #ef4444",
            borderRadius: "12px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              fontWeight: "800",
              color: "#991b1b",
            }}
          >
            Error al cargar estadísticas
          </div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#b91c1c",
              marginTop: "8px",
            }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!estadisticas) {
    return null;
  }

  // Calcular totales por estado
  const totalDenuncias = estadisticas.stats_estados.reduce(
    (sum, estado) => sum + estado.total,
    0,
  );

  // Obtener estadísticas por estado (asumiendo que los estados son: Nueva, En Proceso, Resuelta, etc.)
  const getEstadoTotal = (slug) => {
    const estado = estadisticas.stats_estados.find((e) => e.slug === slug);
    return estado ? estado.total : 0;
  };

  // Colores por estado
  const estadoColors = {
    nueva: { color: "#3b82f6", name: "Nueva" },
    "en-revision": { color: "#f59e0b", name: "En Revisión" },
    "en-proceso": { color: "#f59e0b", name: "En Proceso" },
    resuelta: { color: "#10b981", name: "Resuelta" },
    cerrada: { color: "#a855f7", name: "Cerrada" },
  };

  // Preparar datos para el gráfico de pastel (categorías)
  const totalCategorias = estadisticas.stats_categorias.reduce(
    (sum, cat) => sum + cat.total,
    0,
  );

  const categoriasConPorcentaje = estadisticas.stats_categorias.map(
    (cat, idx) => {
      const porcentaje = (cat.total / totalCategorias) * 100;
      const colores = ["#a855f7", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
      return {
        ...cat,
        porcentaje,
        color: colores[idx % colores.length],
      };
    },
  );

  // Calcular los arcos del gráfico de pastel
  const calcularArcos = () => {
    let acumulado = 0;
    const circunferencia = 2 * Math.PI * 90; // radio = 90

    return categoriasConPorcentaje.map((cat) => {
      const longitudArco = (cat.porcentaje / 100) * circunferencia;
      const offset = -acumulado;
      acumulado += longitudArco;

      return {
        ...cat,
        strokeDasharray: `${longitudArco} ${circunferencia}`,
        strokeDashoffset: offset,
      };
    });
  };

  const arcosPastel = calcularArcos();

  // Preparar puntos del mapa de calor
  const heatmapPoints = estadisticas.mapa_calor.map((punto, idx) => {
    // Convertir coordenadas a porcentajes para posicionamiento
    // Ajustar según el rango de tus coordenadas
    const latMin = -2.3;
    const latMax = -2.0;
    const lngMin = -80.0;
    const lngMax = -79.7;

    const x = ((parseFloat(punto.lng) - lngMin) / (lngMax - lngMin)) * 100;
    const y = ((latMax - parseFloat(punto.lat)) / (latMax - latMin)) * 100;

    // Contar denuncias en el mismo punto para intensidad
    const intensidad = estadisticas.mapa_calor.filter(
      (p) => p.lat === punto.lat && p.lng === punto.lng,
    ).length;

    return {
      x: Math.max(5, Math.min(95, x)), // Limitar entre 5% y 95%
      y: Math.max(5, Math.min(95, y)),
      intensity: Math.min(intensidad, 10), // Máximo 10 para el tamaño
      color: punto.color,
      estado: punto.estado,
    };
  });

  // Generar datos de tendencia (últimos 7 días por ejemplo)
  // Como el backend no devuelve tendencia histórica, simularemos con los estados actuales
  const trendData = estadisticas.stats_estados.map((estado, idx) => ({
    value: estado.total,
    label: estado.estado,
  }));

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "32px 24px",
      }}
    >
      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "28px 24px",
            borderRadius: "20px",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
            border: "2px solid #e2e8f0",
            transition: "all 0.3s ease",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              fontWeight: "900",
              color: "#3b82f6",
              marginBottom: "8px",
              letterSpacing: "-2px",
            }}
          >
            {totalDenuncias}
          </div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: "800",
              color: "#64748b",
              letterSpacing: "0.3px",
            }}
          >
            Total Denuncias
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "28px 24px",
            borderRadius: "20px",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
            border: "2px solid #e2e8f0",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              fontWeight: "900",
              color: "#3b82f6",
              marginBottom: "8px",
              letterSpacing: "-2px",
            }}
          >
            {getEstadoTotal("nueva")}
          </div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: "800",
              color: "#64748b",
              letterSpacing: "0.3px",
            }}
          >
            Nuevas
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "28px 24px",
            borderRadius: "20px",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
            border: "2px solid #e2e8f0",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              fontWeight: "900",
              color: "#f59e0b",
              marginBottom: "8px",
              letterSpacing: "-2px",
            }}
          >
            {getEstadoTotal("en-proceso") + getEstadoTotal("en-revision")}
          </div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: "800",
              color: "#64748b",
              letterSpacing: "0.3px",
            }}
          >
            En Proceso
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "28px 24px",
            borderRadius: "20px",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
            border: "2px solid #e2e8f0",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              fontWeight: "900",
              color: "#10b981",
              marginBottom: "8px",
              letterSpacing: "-2px",
            }}
          >
            {getEstadoTotal("resuelta") + getEstadoTotal("cerrada")}
          </div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: "800",
              color: "#64748b",
              letterSpacing: "0.3px",
            }}
          >
            Resueltas
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        {/* Pie Chart - Por Categoría */}
        <div
          style={{
            background: "white",
            padding: "32px",
            borderRadius: "20px",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
            border: "2px solid #e2e8f0",
          }}
        >
          <h3
            style={{
              margin: "0 0 24px 0",
              fontSize: "18px",
              fontWeight: "900",
              color: "#1e293b",
              letterSpacing: "-0.3px",
            }}
          >
            Denuncias por Categoría
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "250px",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {categoriasConPorcentaje.length > 0 ? (
              <>
                <svg width="220" height="220" viewBox="0 0 220 220">
                  {arcosPastel.map((cat, idx) => (
                    <circle
                      key={idx}
                      cx="110"
                      cy="110"
                      r="90"
                      fill="none"
                      stroke={cat.color}
                      strokeWidth="70"
                      strokeDasharray={cat.strokeDasharray}
                      strokeDashoffset={cat.strokeDashoffset}
                      transform="rotate(-90 110 110)"
                    />
                  ))}
                </svg>

                {/* Leyenda */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    width: "100%",
                  }}
                >
                  {categoriasConPorcentaje.map((cat, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "8px 12px",
                        background: "#f8fafc",
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "4px",
                          background: cat.color,
                        }}
                      />
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: "700",
                          color: "#475569",
                          flex: 1,
                        }}
                      >
                        {cat.categoria}
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "900",
                          color: "#1e293b",
                        }}
                      >
                        {cat.total}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#94a3b8",
                  fontStyle: "italic",
                }}
              >
                No hay datos de categorías
              </div>
            )}
          </div>
        </div>

        {/* Bar Chart - Por Estado */}
        <div
          style={{
            background: "white",
            padding: "32px",
            borderRadius: "20px",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
            border: "2px solid #e2e8f0",
          }}
        >
          <h3
            style={{
              margin: "0 0 24px 0",
              fontSize: "18px",
              fontWeight: "900",
              color: "#1e293b",
              letterSpacing: "-0.3px",
            }}
          >
            Denuncias por Estado
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              minHeight: "250px",
              justifyContent: "center",
            }}
          >
            {estadisticas.stats_estados.length > 0 ? (
              estadisticas.stats_estados.map((estado, idx) => {
                const maxValue = Math.max(
                  ...estadisticas.stats_estados.map((e) => e.total),
                );
                const porcentaje = (estado.total / maxValue) * 100;

                return (
                  <div key={idx}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "6px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: "800",
                          color: "#475569",
                        }}
                      >
                        {estado.estado}
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "900",
                          color: "#1e293b",
                        }}
                      >
                        {estado.total}
                      </span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "12px",
                        background: "#e2e8f0",
                        borderRadius: "6px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${porcentaje}%`,
                          height: "100%",
                          background: estado.color,
                          borderRadius: "6px",
                          transition: "width 0.5s ease",
                        }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#94a3b8",
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                No hay datos de estados
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <div
        style={{
          background: "white",
          padding: "32px",
          borderRadius: "20px",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
          border: "2px solid #e2e8f0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          <span style={{ fontSize: "20px" }}>🔥</span>
          <h3
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "900",
              color: "#1e293b",
              letterSpacing: "-0.3px",
            }}
          >
            Mapa de Calor de Denuncias
          </h3>
        </div>
        <div
          style={{
            position: "relative",
            height: "400px",
            background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
            borderRadius: "16px",
            border: "2px solid #10b981",
            overflow: "hidden",
          }}
        >
          {/* Grid pattern */}
          <svg
            width="100%"
            height="100%"
            style={{ position: "absolute", opacity: 0.1 }}
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Mensaje si no hay datos */}
          {heatmapPoints.length === 0 && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "16px",
                fontWeight: "700",
                color: "#059669",
                textAlign: "center",
              }}
            >
              No hay datos de ubicación
            </div>
          )}

          {/* Heatmap points */}
          {heatmapPoints.map((point, idx) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: `${point.x}%`,
                top: `${point.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              title={`${point.estado} - Intensidad: ${point.intensity}`}
            >
              {/* Pulse effect */}
              <div
                style={{
                  width: `${point.intensity * 12}px`,
                  height: `${point.intensity * 12}px`,
                  background: point.color,
                  borderRadius: "50%",
                  opacity: 0.3,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  animation: `pulse ${2 + (idx % 3) * 0.5}s infinite ease-in-out`,
                }}
              />

              {/* Main point */}
              <div
                style={{
                  width: `${point.intensity * 6}px`,
                  height: `${point.intensity * 6}px`,
                  background: point.color,
                  borderRadius: "50%",
                  border: "3px solid white",
                  boxShadow: `0 4px 20px ${point.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "900",
                  fontSize: "12px",
                  color: "white",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {point.intensity > 1 ? point.intensity : ""}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS para animación de pulso */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.3;
            }
            50% {
              transform: translate(-50%, -50%) scale(1.5);
              opacity: 0.1;
            }
          }
        `}
      </style>
    </div>
  );
}

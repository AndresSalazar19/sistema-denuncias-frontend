import React from "react";
import { Users, Clock, TrendingUp, Zap, Target, Star } from "lucide-react";

const EstadisticasPublicas = () => {
  // Mock data - Datos quemados enfocados en ciudadanos
  const estadisticas = {
    ciudadanosActivos: 3842,
    tiempoPromedioRespuesta: 4.2,
    satisfaccionCiudadana: 87,
    impactoPositivo: 92,
  };

  const tiempoRespuesta = [
    { categoria: "Infraestructura", dias: 5.2, color: "#3b82f6", maxDias: 10 },
    { categoria: "Seguridad", dias: 2.8, color: "#ef4444", maxDias: 10 },
    { categoria: "Medio Ambiente", dias: 6.1, color: "#10b981", maxDias: 10 },
    { categoria: "Serv. Públicos", dias: 3.5, color: "#f59e0b", maxDias: 10 },
  ];

  const participacionMensual = [
    { mes: "Ene", participacion: 285 },
    { mes: "Feb", participacion: 312 },
    { mes: "Mar", participacion: 298 },
    { mes: "Abr", participacion: 356 },
    { mes: "May", participacion: 389 },
    { mes: "Jun", participacion: 421 },
    { mes: "Jul", participacion: 445 },
    { mes: "Ago", participacion: 398 },
    { mes: "Sep", participacion: 412 },
    { mes: "Oct", participacion: 438 },
    { mes: "Nov", participacion: 401 },
    { mes: "Dic", participacion: 456 },
  ];

  const historiasExito = [
    {
      titulo: "Parque renovado en Zona Norte",
      descripcion: "Gracias a 23 reportes ciudadanos",
      impacto: "500+ familias beneficiadas",
      icon: "🏞️",
      color: "#10b981",
    },
    {
      titulo: "Nueva iluminación instalada",
      descripcion: "Respuesta en 3 días",
      impacto: "8 cuadras más seguras",
      icon: "💡",
      color: "#f59e0b",
    },
    {
      titulo: "Baches reparados",
      descripcion: "45 baches en el último mes",
      impacto: "Reducción 60% accidentes",
      icon: "🚧",
      color: "#3b82f6",
    },
  ];

  const comparativaCiudades = [
    { ciudad: "Tu Ciudad", score: 87, color: "#0ea5e9" },
    { ciudad: "Ciudad A", score: 72, color: "#64748b" },
    { ciudad: "Ciudad B", score: 68, color: "#64748b" },
    { ciudad: "Ciudad C", score: 81, color: "#64748b" },
  ];

  const maxParticipacion = Math.max(
    ...participacionMensual.map((m) => m.participacion)
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background patterns */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, #0ea5e9 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "float 20s infinite ease-in-out",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, #10b981 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "float 25s infinite ease-in-out reverse",
          }}
        />
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Top Stats Cards - DIFERENTES del admin */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          {/* Ciudadanos Activos */}
          <div
            style={{
              background: "rgba(0, 0, 0, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 0, 0, 0)",
              borderRadius: "20px",
              padding: "32px",
              animation: "slideUp 0.6s ease-out 0.5s backwards",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "120px",
                height: "120px",
                background:
                  "radial-gradient(circle, rgba(14, 165, 233, 0.2) 0%, transparent 70%)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "rgba(14, 165, 233, 0.2)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Users size={24} color="#0ea5e9" strokeWidth={2.5} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "48px",
                    fontWeight: "900",
                    color: "#0ea5e9",
                    lineHeight: "1",
                    letterSpacing: "-2px",
                  }}
                >
                  {estadisticas.ciudadanosActivos.toLocaleString()}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#64748b",
                    marginTop: "4px",
                    letterSpacing: "0.5px",
                  }}
                >
                  CIUDADANOS ACTIVOS
                </div>
              </div>
            </div>
          </div>

          {/* Tiempo Promedio */}
          <div
            style={{
              background: "rgba(0, 0, 0, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 0, 0, 0)",
              borderRadius: "20px",
              padding: "32px",
              animation: "slideUp 0.6s ease-out 0.5s backwards",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "120px",
                height: "120px",
                background:
                  "radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "rgba(245, 158, 11, 0.2)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Clock size={24} color="#f59e0b" strokeWidth={2.5} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "48px",
                    fontWeight: "900",
                    color: "#f59e0b",
                    lineHeight: "1",
                    letterSpacing: "-2px",
                    display: "flex",
                    alignItems: "baseline",
                    gap: "4px",
                  }}
                >
                  {estadisticas.tiempoPromedioRespuesta}
                  <span style={{ fontSize: "24px", fontWeight: "700" }}>
                    días
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#64748b",
                    marginTop: "4px",
                    letterSpacing: "0.5px",
                  }}
                >
                  TIEMPO DE RESPUESTA
                </div>
              </div>
            </div>
          </div>

          {/* Satisfacción */}
          <div
            style={{
              background: "rgba(0, 0, 0, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 0, 0, 0)",
              borderRadius: "20px",
              padding: "32px",
              animation: "slideUp 0.6s ease-out 0.5s backwards",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "120px",
                height: "120px",
                background:
                  "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "rgba(168, 85, 247, 0.2)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Star
                  size={24}
                  color="#a855f7"
                  strokeWidth={2.5}
                  fill="#a855f7"
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "48px",
                    fontWeight: "900",
                    color: "#a855f7",
                    lineHeight: "1",
                    letterSpacing: "-2px",
                    display: "flex",
                    alignItems: "baseline",
                    gap: "4px",
                  }}
                >
                  {estadisticas.satisfaccionCiudadana}
                  <span style={{ fontSize: "32px", fontWeight: "900" }}>%</span>
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#64748b",
                    marginTop: "4px",
                    letterSpacing: "0.5px",
                  }}
                >
                  SATISFACCIÓN
                </div>
              </div>
            </div>
          </div>

          {/* Impacto */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.15) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "20px",
              padding: "32px",
              position: "relative",
              overflow: "hidden",
              animation: "slideUp 0.6s ease-out 0.3s backwards",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <div
                style={{
                  fontSize: "64px",
                  fontWeight: "900",
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: "1",
                  letterSpacing: "-3px",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "4px",
                }}
              >
                {estadisticas.impactoPositivo}
                <span style={{ fontSize: "40px" }}>%</span>
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#10b981",
                  marginTop: "12px",
                  letterSpacing: "0.5px",
                  textAlign: "center",
                }}
              >
                IMPACTO POSITIVO
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Tiempo Respuesta & Participación */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          {/* Tiempo de Respuesta por Categoría */}
          <div
            style={{
              background: "rgba(0, 0, 0, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 0, 0, 0)",
              borderRadius: "20px",
              padding: "32px",
              animation: "slideUp 0.6s ease-out 0.5s backwards",
            }}
          >
            <h3
              style={{
                margin: "0 0 28px 0",
                fontSize: "22px",
                fontWeight: "900",
                color: "black",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                letterSpacing: "-0.5px",
              }}
            >
              <Zap size={24} strokeWidth={2.5} />
              Tiempo de Respuesta (días)
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {tiempoRespuesta.map((cat, idx) => (
                <div key={idx}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: "700",
                        color: "#555e69",
                      }}
                    >
                      {cat.categoria}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "4px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "24px",
                          fontWeight: "900",
                          color: cat.color,
                        }}
                      >
                        {cat.dias}
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#64748b",
                        }}
                      >
                        días
                      </span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div
                    style={{
                      height: "12px",
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "6px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${(cat.dias / cat.maxDias) * 100}%`,
                        background: `linear-gradient(90deg, ${cat.color} 0%, ${cat.color}dd 100%)`,
                        borderRadius: "6px",
                        boxShadow: `0 0 12px ${cat.color}`,
                        animation: `expand ${1 + idx * 0.2}s ease-out`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "24px",
                padding: "16px",
                background: "rgba(16, 185, 129, 0.1)",
                borderRadius: "12px",
                border: "1px solid rgba(16, 185, 129, 0.2)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Target size={20} color="#10b981" strokeWidth={2.5} />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#10b981",
                }}
              >
                ¡Reducción del 35% en tiempos vs año anterior!
              </span>
            </div>
          </div>

          {/* Participación Ciudadana Mensual */}
          <div
            style={{
              background: "rgba(0, 0, 0, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 0, 0, 0)",
              borderRadius: "20px",
              padding: "32px",
              animation: "slideUp 0.6s ease-out 0.5s backwards",
            }}
          >
            <h3
              style={{
                margin: "0 0 28px 0",
                fontSize: "22px",
                fontWeight: "900",
                color: "black",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                letterSpacing: "-0.5px",
              }}
            >
              <TrendingUp size={24} strokeWidth={2.5} />
              Participación Ciudadana 2025
            </h3>

            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                height: "280px",
                gap: "8px",
              }}
            >
              {participacionMensual.map((mes, idx) => {
                const heightPercent =
                  (mes.participacion / maxParticipacion) * 100;

                return (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                      height: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: `${heightPercent}%`,
                        background:
                          "linear-gradient(180deg, #0ea5e9 0%, #06b6d4 100%)",
                        borderRadius: "8px 8px 0 0",
                        position: "relative",
                        boxShadow: "0 -4px 20px rgba(14, 165, 233, 0.3)",
                        animation: `grow ${1 + idx * 0.05}s ease-out`,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      title={`${mes.participacion} ciudadanos`}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scaleY(1.05)";
                        e.currentTarget.style.filter = "brightness(1.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scaleY(1)";
                        e.currentTarget.style.filter = "brightness(1)";
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-22px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          fontSize: "11px",
                          fontWeight: "900",
                          color: "#0ea5e9",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {mes.participacion}
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "800",
                        color: "#64748b",
                        marginTop: "4px",
                      }}
                    >
                      {mes.mes}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-20px, -30px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }

        @keyframes expand {
          from {
            width: 0;
          }
        }

        @keyframes grow {
          from {
            height: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default EstadisticasPublicas;
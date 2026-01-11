import React from "react";
export default function DashboardContent({ heatmapPoints, trendData }) {
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
            156
          </div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: "800",
              color: "#64748b",
              letterSpacing: "0.3px",
            }}
          >
            Total
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
            23
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
            45
          </div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: "800",
              color: "#64748b",
              letterSpacing: "0.3px",
            }}
          >
            Proceso
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
              color: "#a855f7",
              marginBottom: "8px",
              letterSpacing: "-2px",
            }}
          >
            88
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
            Por Categoría
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "250px",
            }}
          >
            <svg width="220" height="220" viewBox="0 0 220 220">
              {/* Pie chart slices */}
              <circle
                cx="110"
                cy="110"
                r="90"
                fill="none"
                stroke="#a855f7"
                strokeWidth="70"
                strokeDasharray="198 628"
                strokeDashoffset="0"
                transform="rotate(-90 110 110)"
              />
              <circle
                cx="110"
                cy="110"
                r="90"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="70"
                strokeDasharray="126 628"
                strokeDashoffset="-198"
                transform="rotate(-90 110 110)"
              />
              <circle
                cx="110"
                cy="110"
                r="90"
                fill="none"
                stroke="#10b981"
                strokeWidth="70"
                strokeDasharray="189 628"
                strokeDashoffset="-324"
                transform="rotate(-90 110 110)"
              />
              <circle
                cx="110"
                cy="110"
                r="90"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="70"
                strokeDasharray="94 628"
                strokeDashoffset="-513"
                transform="rotate(-90 110 110)"
              />
            </svg>
          </div>
        </div>

        {/* Line Chart - Tendencia */}
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
            Tendencia
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              minHeight: "250px",
              padding: "20px 0",
              position: "relative",
            }}
          >
            <svg
              width="100%"
              height="200"
              style={{ position: "absolute", top: "20px", left: 0 }}
            >
              <polyline
                points="0,80 80,55 160,65 240,35 320,45 400,15 480,5"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {trendData.map((point, idx) => {
                const x = idx * 80;
                const y = 200 - point.value * 2;
                return <circle key={idx} cx={x} cy={y} r="5" fill="#3b82f6" />;
              })}
            </svg>
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
            Mapa de Calor
          </h3>
        </div>
        <div
          style={{
            position: "relative",
            height: "280px",
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
            >
              {/* Pulse effect */}
              <div
                style={{
                  width: `${point.intensity * 10}px`,
                  height: `${point.intensity * 10}px`,
                  background: point.color,
                  borderRadius: "50%",
                  opacity: 0.3,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  animation: `pulse ${2 + idx * 0.5}s infinite ease-in-out`,
                }}
              />

              {/* Main point */}
              <div
                style={{
                  width: `${point.intensity * 5}px`,
                  height: `${point.intensity * 5}px`,
                  background: point.color,
                  borderRadius: "50%",
                  border: "3px solid white",
                  boxShadow: `0 4px 20px ${point.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "900",
                  fontSize: "14px",
                  color: "white",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {point.intensity}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

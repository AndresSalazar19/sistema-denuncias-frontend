import React from "react";
import { LogOut, BarChart3 } from "lucide-react";
export default function NavegationAdmin({
  setActiveView,
  activeView,
  handleLogout,
}) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
        padding: "18px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 24px rgba(30, 58, 138, 0.2)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BarChart3 size={24} color="white" strokeWidth={2.5} />
          </div>
          <span
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "900",
              letterSpacing: "-0.5px",
            }}
          >
            Panel Admin
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            background: "rgba(255, 255, 255, 0.15)",
            padding: "6px",
            borderRadius: "12px",
            backdropFilter: "blur(10px)",
          }}
        >
          <button
            onClick={() => setActiveView("dashboard")}
            style={{
              background: activeView === "dashboard" ? "white" : "transparent",
              color: activeView === "dashboard" ? "#1e3a8a" : "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "800",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontFamily: "inherit",
            }}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveView("gestion")}
            style={{
              background: activeView === "gestion" ? "white" : "transparent",
              color: activeView === "gestion" ? "#1e3a8a" : "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "800",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontFamily: "inherit",
            }}
          >
            Gestión
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 16px",
            background: "rgba(255, 255, 255, 0.15)",
            borderRadius: "10px",
            backdropFilter: "blur(10px)",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "15px",
              fontWeight: "800",
            }}
          >
            J. Perez
          </span>
          <div
            style={{
              width: "8px",
              height: "8px",
              background: "#10b981",
              borderRadius: "50%",
              boxShadow: "0 0 10px #10b981",
            }}
          />
        </div>

        <button
          onClick={handleLogout}
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            border: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            color: "white",
            fontSize: "14px",
            fontWeight: "800",
            cursor: "pointer",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
          }}
        >
          <LogOut size={18} strokeWidth={2.5} />
          Salir
        </button>
      </div>
    </div>
  );
}

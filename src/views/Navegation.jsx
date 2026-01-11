import React from "react";
import { Shield, FileText, Search } from "tabler-icons-react";
export default function Navegation({ view, setView }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Shield size={28} color="white" strokeWidth={2.5} />
        </div>
        <div>
          <h1
            style={{
              margin: 0,
              color: "white",
              fontSize: "22px",
              fontWeight: "800",
              letterSpacing: "-0.5px",
            }}
          >
            Sistema de Denuncias
          </h1>
          <p
            style={{
              margin: 0,
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            Plataforma segura y transparente
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          background: "rgba(255, 255, 255, 0.15)",
          padding: "6px",
          borderRadius: "14px",
          backdropFilter: "blur(10px)",
        }}
      >
        <button
          onClick={() => setView("registro")}
          style={{
            background: view === "registro" ? "white" : "transparent",
            color: view === "registro" ? "#667eea" : "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "800",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow:
              view === "registro" ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none",
          }}
          onMouseEnter={(e) => {
            if (view !== "registro") {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            }
          }}
          onMouseLeave={(e) => {
            if (view !== "registro") {
              e.currentTarget.style.background = "transparent";
            }
          }}
        >
          <FileText size={18} strokeWidth={2.5} />
          Registrar Denuncia
        </button>

        <button
          onClick={() => setView("consulta")}
          style={{
            background: view === "consulta" ? "white" : "transparent",
            color: view === "consulta" ? "#667eea" : "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "800",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow:
              view === "consulta" ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none",
          }}
          onMouseEnter={(e) => {
            if (view !== "consulta") {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            }
          }}
          onMouseLeave={(e) => {
            if (view !== "consulta") {
              e.currentTarget.style.background = "transparent";
            }
          }}
        >
          <Search size={18} strokeWidth={2.5} />
          Consultar Denuncia
        </button>

        <button
          onClick={() => setView("mapa")}
          style={{
            background: view === "mapa" ? "white" : "transparent",
            color: view === "mapa" ? "#667eea" : "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "800",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow:
              view === "mapa" ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none",
          }}
          onMouseEnter={(e) => {
            if (view !== "mapa") {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            }
          }}
          onMouseLeave={(e) => {
            if (view !== "mapa") {
              e.currentTarget.style.background = "transparent";
            }
          }}
        >
          <Search size={18} strokeWidth={2.5} />
          Mapa público
        </button>

        <button
          onClick={() => setView("admin")}
          style={{
            background: view === "admin" ? "white" : "transparent",
            color: view === "admin" ? "#667eea" : "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "800",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontFamily: "inherit",
            boxShadow:
              view === "admin" ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none",
          }}
          onMouseEnter={(e) => {
            if (view !== "admin") {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            }
          }}
          onMouseLeave={(e) => {
            if (view !== "admin") {
              e.currentTarget.style.background = "transparent";
            }
          }}
        >
          Administrador
        </button>
      </div>
    </div>
  );
}
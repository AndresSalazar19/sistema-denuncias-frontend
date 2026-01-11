import React from "react";
import { Lock, User } from "lucide-react";

export default function SesionAdmin({
  handleLogin,
  credentials,
  setCredentials,
  error,
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background shapes */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "300px",
          height: "300px",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "50%",
          filter: "blur(60px)",
          animation: "float 20s infinite ease-in-out",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "400px",
          height: "400px",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "50%",
          filter: "blur(80px)",
          animation: "float 25s infinite ease-in-out reverse",
        }}
      />

      <div
        style={{
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(20px)",
          borderRadius: "28px",
          padding: "50px 45px",
          maxWidth: "440px",
          width: "100%",
          boxShadow:
            "0 25px 80px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
          position: "relative",
          zIndex: 1,
          animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Logo/Icon */}
        <div
          style={{
            width: "90px",
            height: "90px",
            background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
            borderRadius: "22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 28px",
            boxShadow: "0 12px 40px rgba(59, 130, 246, 0.4)",
            transform: "rotate(-5deg)",
          }}
        >
          <Lock size={48} color="white" strokeWidth={2.5} />
        </div>

        {/* Title */}
        <h1
          style={{
            margin: "0 0 12px 0",
            fontSize: "32px",
            fontWeight: "900",
            textAlign: "center",
            background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-1px",
          }}
        >
          Panel Admin
        </h1>
        <p
          style={{
            margin: "0 0 40px 0",
            textAlign: "center",
            color: "#64748b",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Ingresa tus credenciales para continuar
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ marginBottom: "24px" }}>
          {/* Username */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontSize: "13px",
                fontWeight: "800",
                color: "#1e293b",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              Usuario
            </label>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                  alignItems: "center",
                  pointerEvents: "none",
                }}
              >
                <User size={20} color="#94a3b8" strokeWidth={2.5} />
              </div>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                placeholder="admin"
                style={{
                  width: "90%",
                  padding: "16px 16px 16px 48px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "14px",
                  fontSize: "16px",
                  fontWeight: "600",
                  fontFamily: "inherit",
                  transition: "all 0.2s ease",
                  outline: "none",
                  background: "#f8fafc",
                  color: "#1e293b",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.background = "white";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.background = "#f8fafc";
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: "28px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontSize: "13px",
                fontWeight: "800",
                color: "#1e293b",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              Contraseña
            </label>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                  alignItems: "center",
                  pointerEvents: "none",
                }}
              >
                <Lock size={20} color="#94a3b8" strokeWidth={2.5} />
              </div>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                placeholder="••••••••"
                style={{
                  width: "90%",
                  padding: "16px 16px 16px 48px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "14px",
                  fontSize: "16px",
                  fontWeight: "600",
                  fontFamily: "inherit",
                  transition: "all 0.2s ease",
                  outline: "none",
                  background: "#f8fafc",
                  color: "#1e293b",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.background = "white";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.background = "#f8fafc";
                }}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div
              style={{
                padding: "12px 16px",
                background: "#fee2e2",
                border: "2px solid #ef4444",
                borderRadius: "12px",
                marginBottom: "24px",
                animation: "shake 0.5s ease",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#dc2626",
                  fontSize: "14px",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                ⚠️ {error}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
              color: "white",
              border: "none",
              padding: "18px",
              borderRadius: "14px",
              fontSize: "17px",
              fontWeight: "900",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: "0 4px 20px rgba(59, 130, 246, 0.4)",
              fontFamily: "inherit",
              letterSpacing: "-0.3px",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 30px rgba(59, 130, 246, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(59, 130, 246, 0.4)";
            }}
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Demo hint */}
        <div
          style={{
            padding: "16px",
            background: "#eff6ff",
            borderRadius: "12px",
            border: "1px solid #bfdbfe",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#1e40af",
              fontSize: "13px",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            💡 Demo: admin / admin123
          </p>
        </div>
      </div>

      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
          
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
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-30px) translateX(20px);
            }
          }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
        `}</style>
    </div>
  );
}

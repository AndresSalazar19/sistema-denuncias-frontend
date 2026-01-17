import React, { useState } from "react";
import { LogOut, BarChart3, Lock, User } from "lucide-react";
import { login } from "../functions/authService";
import DashboardContent from "./DashboardContent";
import SesionAdmin from "./SesionAdmin";
import GestionDenuncia from "./GestionDenuncia";
const AdminPanel = ({
  isAuthenticated,
  setIsAuthenticated,
  activeView,
  setActiveView,
  credentials,
  setCredentials,
}) => {
  // 'dashboard', 'gestion'

  const [error, setError] = useState("");

  // Mock login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials.username, credentials.password);
      credentials.id = response.id;
      alert("Login exitoso");
      setIsAuthenticated(true);
      setError("");
    } catch (error) {
      alert(error.message);
    }
  };

  // Mock data for charts
  const categoryData = [
    { name: "Infraestructura", value: 35, color: "#a855f7" },
    { name: "Seguridad", value: 20, color: "#3b82f6" },
    { name: "Servicios", value: 30, color: "#10b981" },
    { name: "Ambiente", value: 15, color: "#f59e0b" },
  ];

  const trendData = [
    { month: "Ene", value: 45 },
    { month: "Feb", value: 52 },
    { month: "Mar", value: 48 },
    { month: "Abr", value: 61 },
    { month: "May", value: 55 },
    { month: "Jun", value: 67 },
    { month: "Jul", value: 72 },
  ];

  const heatmapPoints = [
    { x: 15, y: 30, intensity: 15, color: "#ef4444" },
    { x: 50, y: 50, intensity: 9, color: "#f59e0b" },
    { x: 75, y: 35, intensity: 3, color: "#10b981" },
  ];

  // Login View
  if (!isAuthenticated) {
    return (
      <SesionAdmin
        handleLogin={handleLogin}
        credentials={credentials}
        setCredentials={setCredentials}
        error={error}
      />
    );
  }

  // Dashboard View
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f4f8",
        fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* Dashboard Content */}
      {activeView === "dashboard" && (
        <DashboardContent heatmapPoints={heatmapPoints} trendData={trendData} />
      )}

      {/* Gestión View */}
      {activeView === "gestion" && (
        <GestionDenuncia credentials={credentials} />
      )}

      <style>{`
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
      `}</style>
    </div>
  );
};

export default AdminPanel;

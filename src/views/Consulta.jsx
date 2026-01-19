import React, { useState } from "react";
import { Search, MapPin, AlertCircle, Loader, Image as ImageIcon } from "lucide-react"; // Agregué icono Image

export default function Consulta() {
  const [searchCode, setSearchCode] = useState("");
  const [denuncia, setDenuncia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

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
        `http://localhost:8000/api/denuncias/${searchCode.trim()}`
      );

      if (response.ok) {
        const data = await response.json();
        setDenuncia(data);
        setError(null);
      } else if (response.status === 404) {
        setError("No se encontró ninguna denuncia con ese código");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al buscar la denuncia");
      }
    } catch (err) {
      console.error("Error:", err);
      // Mensaje más claro si falla el puerto
      setError("No se pudo conectar con el servidor (Puerto 8000)"); 
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const formatDate = (dateString) => dateString;

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
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>
        
        {/* Buscador */}
        <div style={{ background: "white", borderRadius: "20px", padding: "32px", marginBottom: "24px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", fontSize: "14px", fontWeight: "700", color: "#334155" }}>
            <Search size={18} strokeWidth={3} /> BUSCAR POR CÓDIGO
          </label>
          <div style={{ display: "flex", gap: "12px" }}>
            <input
              type="text"
              placeholder="DEN-2026-XXXXX"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              disabled={loading}
              style={{ flex: 1, padding: "16px 20px", border: "2px solid #e2e8f0", borderRadius: "14px", fontSize: "16px", fontWeight: "600", outline: "none" }}
              onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              style={{
                background: loading ? "#94a3b8" : "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
                color: "white", border: "none", padding: "16px 32px", borderRadius: "14px", fontSize: "16px", fontWeight: "800", cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", gap: "8px", transition: "all 0.3s ease"
              }}
            >
              {loading ? <><Loader size={20} className="spin" /> Buscando...</> : "Buscar"}
            </button>
          </div>
        </div>

        {error && (
          <div style={{ background: "#fee2e2", border: "2px solid #fecaca", borderRadius: "16px", padding: "20px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
            <AlertCircle size={24} color="#dc2626" />
            <p style={{ margin: 0, fontSize: "15px", fontWeight: "600", color: "#991b1b" }}>{error}</p>
          </div>
        )}

        {denuncia && (
          <div style={{ background: "white", borderRadius: "20px", padding: "40px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", animation: "slideUp 0.5s ease-out" }}>
            
            {/* Encabezado Denuncia */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: getEstadoColor(denuncia.estado).bg, padding: "8px 16px", borderRadius: "12px", marginBottom: "16px" }}>
              <span style={{ fontSize: "18px", fontWeight: "800", color: getEstadoColor(denuncia.estado).text }}>{denuncia.codigo_seguimiento}</span>
            </div>
            <div style={{ display: "inline-block", background: denuncia.estado_color || getEstadoColor(denuncia.estado).badge, color: "white", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "800", marginBottom: "24px", marginLeft: "12px", textTransform: "uppercase" }}>
              {denuncia.estado}
            </div>

            {/* Detalles Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "28px" }}>
              <div><p style={{ fontSize: "12px", fontWeight: "800", color: "#64748b" }}>CATEGORÍA</p><p style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>{denuncia.categoria}</p></div>
              <div><p style={{ fontSize: "12px", fontWeight: "800", color: "#64748b" }}>FECHA REGISTRO</p><p style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>{formatDate(denuncia.fecha_registro)}</p></div>
            </div>

            {/* Ubicación */}
            {denuncia.ubicacion && (
              <div style={{ marginBottom: "28px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px", fontSize: "12px", fontWeight: "800", color: "#64748b" }}>
                  <MapPin size={16} strokeWidth={3} /> UBICACIÓN
                </label>
                <div style={{ height: "120px", background: "#f0f9ff", borderRadius: "16px", border: "2px solid #bae6fd", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <MapPin size={32} color="#0ea5e9" fill="#0ea5e9" />
                  <p style={{ margin: "8px 0 0", fontSize: "14px", fontWeight: "700", color: "#0369a1" }}>{denuncia.ubicacion.direccion || "Ubicación en mapa"}</p>
                </div>
              </div>
            )}

            {/* CORRECCIÓN 2: Galería de Evidencias */}
            {denuncia.evidencias && denuncia.evidencias.length > 0 && (
              <div style={{ marginBottom: "28px" }}>
                 <label style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px", fontSize: "12px", fontWeight: "800", color: "#64748b" }}>
                  <ImageIcon size={16} strokeWidth={3} /> EVIDENCIAS
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "12px" }}>
                  {denuncia.evidencias.map((ev, index) => (
                    <a key={index} href={ev.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', aspectRatio: '1', borderRadius: '12px', overflow: 'hidden', border: '2px solid #e2e8f0' }}>
                      <img 
                        src={ev.url} 
                        alt={`Evidencia ${index}`} 
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }} 
                        onMouseOver={(e) => e.target.style.transform = "scale(1.1)"}
                        onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Progreso */}
            <div>
              <p style={{ marginBottom: "16px", fontSize: "12px", fontWeight: "800", color: "#64748b" }}>PROGRESO</p>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                {["Nueva", "En Revisión", "En Proceso", "Resuelta"].map((step, idx) => {
                  const progreso = estadoToProgreso[denuncia.estado] || 0;
                  return (
                    <React.Fragment key={step}>
                      <div style={{ flex: 1, textAlign: "center" }}>
                        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: idx <= progreso ? "#0ea5e9" : "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", color: "white", fontWeight: "800" }}>
                          {idx < progreso ? "✓" : idx + 1}
                        </div>
                        <p style={{ fontSize: "10px", fontWeight: "700", color: idx <= progreso ? "#0ea5e9" : "#94a3b8" }}>{step}</p>
                      </div>
                      {idx < 3 && <div style={{ flex: 1, height: "4px", background: idx < progreso ? "#0ea5e9" : "#e2e8f0", borderRadius: "2px", marginBottom: "20px" }} />}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

          </div>
        )}
      </div>
      <style>{`@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } } .spin { animation: spin 1s linear infinite; } @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
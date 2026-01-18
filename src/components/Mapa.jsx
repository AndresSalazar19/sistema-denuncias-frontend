import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { X, MapPin } from "lucide-react";

// Fix para iconos de Leaflet en React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MapaEstatico({ isOpen, onClose, ubicacion, titulo }) {
  if (!isOpen) return null;

  // Parsear las coordenadas desde el texto de ubicación
  // Esperamos formato: "Lat: -2.189400, Lng: -79.889000" o similar
  const parseCoordinates = (ubicacionText) => {
    const latMatch = ubicacionText.match(/Lat:\s*(-?\d+\.\d+)/i);
    const lngMatch = ubicacionText.match(/Lng:\s*(-?\d+\.\d+)/i);

    if (latMatch && lngMatch) {
      return {
        lat: parseFloat(latMatch[1]),
        lng: parseFloat(lngMatch[1]),
      };
    }

    // Si no se puede parsear, retornar coordenadas por defecto (Guayaquil)
    return { lat: -2.1894, lng: -79.889 };
  };

  const location = parseCoordinates(ubicacion);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily:
          '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: "24px",
          maxWidth: "900px",
          width: "100%",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 48px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px 28px",
            borderBottom: "2px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MapPin size={22} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "22px",
                  fontWeight: "800",
                  color: "#0f172a",
                  letterSpacing: "-0.5px",
                }}
              >
                Ubicación de la Denuncia
              </h2>
              {titulo && (
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    color: "#64748b",
                    fontWeight: "500",
                  }}
                >
                  {titulo}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              border: "none",
              background: "#f1f5f9",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#e2e8f0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f1f5f9";
            }}
          >
            <X size={20} color="#da3d0d" strokeWidth={2.5} />
          </button>
        </div>

        {/* Map Container */}
        <div
          style={{
            height: "500px",
            width: "100%",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={15}
            scrollWheelZoom={true}
            style={{
              height: "100%",
              width: "100%",
              zIndex: 0,
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[location.lat, location.lng]}>
              <Popup>
                <div style={{ fontWeight: "600", fontSize: "13px" }}>
                  {titulo || "Ubicación de la denuncia"}
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Footer con coordenadas */}
        <div
          style={{
            padding: "20px 28px",
            borderTop: "2px solid #f1f5f9",
            background: "#fafbfc",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "14px 18px",
              borderRadius: "12px",
              border: "2px solid #d1fae5",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "4px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#10b981",
                }}
              ></div>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#059669",
                }}
              >
                COORDENADAS
              </span>
            </div>
            <div style={{ paddingLeft: "16px" }}>
              <div
                style={{
                  fontSize: "14px",
                  color: "#475569",
                  fontWeight: "600",
                  marginBottom: "2px",
                }}
              >
                Latitud:{" "}
                <span style={{ fontWeight: "700", color: "#0f172a" }}>
                  {location.lat.toFixed(6)}
                </span>
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#475569",
                  fontWeight: "600",
                }}
              >
                Longitud:{" "}
                <span style={{ fontWeight: "700", color: "#0f172a" }}>
                  {location.lng.toFixed(6)}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: "100%",
              marginTop: "16px",
              padding: "14px",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              border: "none",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: "800",
              color: "white",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 16px rgba(16, 185, 129, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(16, 185, 129, 0.3)";
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

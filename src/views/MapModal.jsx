import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { X, MapPin, Check } from 'tabler-icons-react';

// IMPORTANTE: Fix para iconos de Leaflet en React
// Este código debe ejecutarse antes de renderizar el mapa
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente para capturar clics en el mapa
function MapClickHandler({ onLocationSelect }) {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng);
    },
  });
  return null;
}

// Componente para recentrar el mapa cuando cambia la ubicación
function RecenterMap({ location }) {
  const map = useMap();
  
  useEffect(() => {
    if (location) {
      map.setView([location.lat, location.lng], 15, {
        animate: true,
        duration: 1
      });
    }
  }, [location, map]);
  
  return null;
}

export default function MapModal({ isOpen, onClose, onSelectLocation, initialLocation }) {
  const [tempLocation, setTempLocation] = useState(initialLocation);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [mapKey, setMapKey] = useState(0);
  
  // Centro inicial (Guayaquil, Ecuador)
  const centerPosition = tempLocation 
    ? [tempLocation.lat, tempLocation.lng]
    : [-2.1894, -79.8890];

  // Resetear el mapa cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setTempLocation(initialLocation);
      setMapKey(prev => prev + 1); // Forzar re-render del mapa
    }
  }, [isOpen, initialLocation]);

  const handleLocationSelect = (latlng) => {
    setTempLocation(latlng);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setUseCurrentLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latlng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setTempLocation(latlng);
          setUseCurrentLocation(false);
        },
        (error) => {
          alert('Error al obtener ubicación: ' + error.message);
          setUseCurrentLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      alert('Geolocalización no soportada por este navegador');
    }
  };

  const handleConfirm = () => {
    if (tempLocation) {
      onSelectLocation(tempLocation);
      onClose();
    } else {
      alert('Por favor selecciona una ubicación en el mapa');
    }
  };

  const handleClose = () => {
    setTempLocation(initialLocation);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      }}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '24px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '2px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MapPin size={22} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: '22px',
                  fontWeight: '800',
                  color: '#0f172a',
                  letterSpacing: '-0.5px',
                }}
              >
                Seleccionar Ubicación
              </h2>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b', fontWeight: '500' }}>
                Haz clic en el mapa para marcar la ubicación exacta
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: 'none',
              background: '#f1f5f9',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e2e8f0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f1f5f9';
            }}
          >
            <X size={20} color="#475569" strokeWidth={2.5} />
          </button>
        </div>

        {/* Map Container - ALTURA FIJA */}
        <div 
          style={{ 
            height: '500px', 
            width: '100%',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          <MapContainer
            key={mapKey}
            center={centerPosition}
            zoom={13}
            scrollWheelZoom={true}
            style={{ 
              height: '100%', 
              width: '100%',
              zIndex: 0,
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler onLocationSelect={handleLocationSelect} />
            {tempLocation && <RecenterMap location={tempLocation} />}
            {tempLocation && (
              <Marker position={[tempLocation.lat, tempLocation.lng]} />
            )}
          </MapContainer>

          {/* Floating Location Button */}
          <button
            onClick={handleGetCurrentLocation}
            disabled={useCurrentLocation}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              zIndex: 1000,
              padding: '12px 20px',
              background: 'white',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '700',
              color: '#10b981',
              cursor: useCurrentLocation ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease',
              opacity: useCurrentLocation ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!useCurrentLocation) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
          >
            <MapPin size={18} strokeWidth={2.5} />
            {useCurrentLocation ? 'Obteniendo...' : 'Mi ubicación'}
          </button>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '20px 28px',
            borderTop: '2px solid #f1f5f9',
            background: '#fafbfc',
            flexShrink: 0,
          }}
        >
          {tempLocation && (
            <div
              style={{
                background: 'white',
                padding: '14px 18px',
                borderRadius: '12px',
                marginBottom: '16px',
                border: '2px solid #e0f2fe',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#10b981',
                  }}
                ></div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#0369a1' }}>
                  COORDENADAS SELECCIONADAS
                </span>
              </div>
              <div style={{ paddingLeft: '16px' }}>
                <div style={{ fontSize: '14px', color: '#475569', fontWeight: '600', marginBottom: '2px' }}>
                  Latitud: <span style={{ fontWeight: '700', color: '#0f172a' }}>{tempLocation.lat.toFixed(6)}</span>
                </div>
                <div style={{ fontSize: '14px', color: '#475569', fontWeight: '600' }}>
                  Longitud: <span style={{ fontWeight: '700', color: '#0f172a' }}>{tempLocation.lng.toFixed(6)}</span>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleClose}
              style={{
                flex: 1,
                padding: '14px',
                background: 'white',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '700',
                color: '#475569',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.borderColor = '#cbd5e1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={!tempLocation}
              style={{
                flex: 2,
                padding: '14px',
                background: tempLocation
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : '#e2e8f0',
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '800',
                color: tempLocation ? 'white' : '#94a3b8',
                cursor: tempLocation ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: tempLocation ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (tempLocation) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = tempLocation
                  ? '0 4px 12px rgba(16, 185, 129, 0.3)'
                  : 'none';
              }}
            >
              <Check size={20} strokeWidth={3} />
              Confirmar Ubicación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
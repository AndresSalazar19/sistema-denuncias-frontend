import { useState } from "react";
import Navegation from "./views/Navegation";
import AdminPanel from "./views/Admin";
import NavegationAdmin from "./views/NavegationAdmin";
import EstadisticasPublicas from "./views/EstadisticasPublicas";
import Registro from "./views/registro";
import Consulta from "./views/consulta";
import { logout } from "./functions/authService";
import "./App.css";

export const ESTADOS_ORDENADOS = [
  "Nueva",
  "En Revisión",
  "En Proceso",
  "Resuelta",
  "Rechazada",
];
function App() {
  const [view, setView] = useState("registro"); // 'registro', 'consulta', 'admin'
  const [activeView, setActiveView] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchCode, setSearchCode] = useState("");
  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "",
    descripcion: "",
    ubicacion: null,
  });
  const [evidencias, setEvidencias] = useState([]);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    id: "",
  });

  const handleLogout = async () => {
    await logout();
    alert("Sesión cerrada");
    setIsAuthenticated(false);
    setCredentials({ username: "", password: "" });
    setActiveView("dashboard");
  };

  // Datos de ejemplo
  const mockDenuncia = {
    codigo: "#DEN-2025-A7K9M3",
    categoria: "Infraestructura",
    fecha: "14/12/2025 - 10:30",
    actualizacion: "15/12/2025 - 14:00",
    ubicacion: {
      address: "Av. Principal esq. Calle 5",
      lat: -34.6037,
      lng: -58.3816,
    },
    progreso: 1, // 0: Nueva, 1: Revisión, 2: Proceso, 3: Resuelta
    estado: "EN REVISIÓN",
  };

  const categorias = [
    { id: "infraestructura", label: "Infraestructura", icon: "🏗️" },
    { id: "seguridad", label: "Seguridad", icon: "🛡️" },
    { id: "servicios", label: "Serv. Públicos", icon: "🔧" },
    { id: "ambiente", label: "Medio Ambiente", icon: "🌱" },
    { id: "corrupcion", label: "Corrupción", icon: "⚖️" },
  ];

  const handleMapClick = () => {
    const mockLocation = {
      lat: -34.6037,
      lng: -58.3816,
      address: "Ubicación seleccionada",
    };
    setSelectedLocation(mockLocation);
    setFormData({ ...formData, ubicacion: mockLocation });
  };

  const handleAddEvidence = () => {
    if (evidencias.length < 3) {
      setEvidencias([...evidencias, { id: Date.now(), placeholder: true }]);
    }
  };

  const handleSubmit = () => {
    alert(
      "Denuncia enviada con éxito. Código de seguimiento: #DEN-2025-" +
        Math.random().toString(36).substr(2, 6).toUpperCase(),
    );
    // Reset form
    setFormData({
      titulo: "",
      categoria: "",
      descripcion: "",
      ubicacion: null,
    });
    setSelectedLocation(null);
    setEvidencias([]);
  };

  const handleSearch = () => {
    if (searchCode.trim()) {
      setView("consulta");
    }
  };

  return (
    <>
      {((view === "admin" && !isAuthenticated) ||
        view === "registro" ||
        view === "mapa" ||
        view === "consulta") && <Navegation view={view} setView={setView} />}
      {view === "admin" && isAuthenticated && (
        <NavegationAdmin
          setActiveView={setActiveView}
          activeView={activeView}
          handleLogout={handleLogout}
          credentials={credentials}
        />
      )}
      {view === "registro" && (
        <Registro
          categorias={categorias}
          setView={setView}
          setFormData={setFormData}
          formData={formData}
          selectedLocation={selectedLocation}
          evidencias={evidencias}
          handleMapClick={handleMapClick}
          handleAddEvidence={handleAddEvidence}
          handleSubmit={handleSubmit}
        />
      )}
      {view === "consulta" && (
        <Consulta
          searchCode={searchCode}
          setSearchCode={setSearchCode}
          setView={setView}
          handleSearch={handleSearch}
          mockDenuncia={mockDenuncia}
        />
      )}
      {view === "admin" && (
        <AdminPanel
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          setActiveView={setActiveView}
          activeView={activeView}
          credentials={credentials}
          setCredentials={setCredentials}
        />
      )}
      {view === "mapa" && <EstadisticasPublicas />}
    </>
  );
}

export default App;

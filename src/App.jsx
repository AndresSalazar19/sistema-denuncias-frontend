import { useState } from "react";
import Navegation from "./views/Navegation";
import AdminPanel from "./views/Admin";
import NavegationAdmin from "./views/NavegationAdmin";
import EstadisticasPublicas from "./views/EstadisticasPublicas";
import "./App.css";
export const ESTADOS_ORDENADOS = ["Nueva", "Revisión", "Proceso", "Resuelta"];
function App() {
  const [view, setView] = useState("registro"); // 'registro', 'consulta', 'admin'
  const [activeView, setActiveView] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCredentials({ username: "", password: "" });
    setActiveView("dashboard");
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
        />
      )}
      {view === "registro" && (
        // Registro View
        <div style={{ padding: "20px" }}>por hacer</div>
      )}
      {view === "consulta" && <div style={{ padding: "20px" }}>por hacer</div>}
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

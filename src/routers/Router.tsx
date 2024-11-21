import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/login/Login";
import { Home } from "../pages/home/Home";
import Perfil from "../pages/perfil/Perfil";
import { useAuth } from "../context/auth-context";

// Componente para rutas protegidas
const RutaProtegida  = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

// Componente para rutas públicas
const RutaPublica  = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/home" replace /> : element;
};

// Configuración del Router
export const Router = () => {
  return (
    <Routes>
      {/* Ruta pública: para todos no loggeado*/}
      <Route path="/login" element={<RutaPublica element={<Login />} />} />

      {/* Ruta protegida: solo si está loggeado */}
      <Route path="/home" element={<RutaProtegida element={<Home />} />} />
      <Route path="/perfil" element={<RutaProtegida element={<Perfil />} />} />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};


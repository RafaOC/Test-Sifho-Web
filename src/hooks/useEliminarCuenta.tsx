/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth-context";

export const useEliminarCuenta = () => {
  const { idUsuario, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const eliminarCuenta = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (idUsuario && token) {
        const response = await axios.delete(
          `http://localhost:5227/api/Persona/${idUsuario}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Cuenta eliminada:", response.data);
        setSuccess(true);
      } else {
        throw new Error("ID de usuario o token no disponible.");
      }
    } catch (error: any) {
      console.error("Error al eliminar el perfil:", error);
      setError(error.response?.data?.message || error.message || "Error desconocido.");
    } finally {
      setLoading(false);
    }
  };

  return {
    eliminarCuenta,
    loading,        
    error,          
    success,        
  };
};

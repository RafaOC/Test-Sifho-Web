/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth-context";

interface LoginData {
  usuarioCorreo: string;
  contraseña: string;
}

export const useLogin = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async ({ usuarioCorreo, contraseña }: LoginData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5227/api/Auth/login",
        {
          nombreUsuario: usuarioCorreo, 
          hashContraseña: contraseña, 
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      login(data.userId, data.token);

      return data.mensaje;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.Mensaje ||
        "Contraseña o nombre de usuario incorrecto";
      setError(errorMessage);

      console.log({
        NombreUsuarioOCorreo: usuarioCorreo,
        HashContraseña: contraseña,
      });

      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};

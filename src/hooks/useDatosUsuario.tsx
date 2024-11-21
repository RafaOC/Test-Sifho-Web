import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth-context";

export const useDatosUsuario = () => {
  const { idUsuario, token } = useAuth();

  const [datosUsuario, setDatosUsuario] = useState(null);

  useEffect(() => {
    const fetchDatosUsuario = async () => {
      try {
        if (idUsuario && token) {
          const response = await axios.get(
            `http://localhost:5227/api/Persona/${idUsuario}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setDatosUsuario(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
      }
    };

    fetchDatosUsuario();
  }, [idUsuario, token]);

  return datosUsuario;
};

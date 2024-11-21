import { useState, useEffect } from "react";
import axios from "axios";

export const useObtenerGeneros = () => {
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5227/api/Auth/generos`
        );
        setGeneros(response.data);
      } catch (error) {
        console.error("Error al obtener los generos:", error);
      }
    };

    fetchGeneros();
  }, []);

  return generos;
};

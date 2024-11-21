import { useState, useEffect } from 'react';
import axios from 'axios';

export const useObtenerNacionalidades = () => {
  const [nacionalidades, setNacionalidades] = useState([]);

  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5227/api/Auth/nacionalidades`
        );
        setNacionalidades(response.data);
      } catch (error) {
        console.error("Error al obtener los generos:", error);
      }
    };

    fetchGeneros();
  }, []);

  return nacionalidades;
};

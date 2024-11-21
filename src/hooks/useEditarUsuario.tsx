/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/auth-context';

interface EditarPerfil {
  IdUsuario: string;
  Nombre?: string;
  Apellido?: string;
  Direccion?: string;
  IdNacionalidad?: number;
  IdGenero?: number;
  Foto?: File;
  NombreUsuario?: string;
  Correo?: string;
  NuevaContraseña?: string;
}

const useEditarUsuario2 = () => {
    
    const { idUsuario, token } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
  
    const actualizarPerfil = async (datos: EditarPerfil) => {
      setLoading(true);
      setError(null);
      setSuccess(false);
  
      const formData = new FormData();
      formData.append('IdUsuario', idUsuario);
      for (const key in datos) {
        if (datos[key as keyof EditarPerfil] !== undefined) {
          formData.append(key, datos[key as keyof EditarPerfil] as any);
        }
      }
  
      try {
        const response = await axios.post('http://localhost:5227/api/Persona/actualizar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        setSuccess(true);

      } catch (error: any) {
        setError(error.response?.data?.message || 'Error al actualizar el perfil');
      } finally {
        setLoading(false);
      }
    };
  
    return { actualizarPerfil, loading, error, success };
  };

export default useEditarUsuario2;


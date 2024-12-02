/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";

interface CrearCuenta {
  Nombre: string;
  Apellido: string;
  Direccion: string;
  Cedula: string;
  IdNacionalidad: number;
  IdGenero: number;
  NombreUsuario: string;
  Contraseña: string;
  Correo: string;
  Foto?: File;
}

const useCrearCuenta = () => {
  const [isLoadingC, setIsLoadingC] = useState(false);
  const [errorC, setErrorC] = useState<string | null>(null);
  const [successC, setSuccessC] = useState(false);

  const crearCuenta = async (datosUsuario: CrearCuenta, onSuccess: () => void) => {
    setIsLoadingC(true);
    setErrorC(null);
    setSuccessC(false);

    try {
      const formData = new FormData();

      formData.append("Nombre", datosUsuario.Nombre);
      formData.append("Apellido", datosUsuario.Apellido);
      formData.append("Direccion", datosUsuario.Direccion);
      formData.append("Cedula", datosUsuario.Cedula);
      formData.append("IdNacionalidad", datosUsuario.IdNacionalidad.toString());
      formData.append("IdGenero", datosUsuario.IdGenero.toString());
      formData.append("NombreUsuario", datosUsuario.NombreUsuario);
      formData.append("Contraseña", datosUsuario.Contraseña);
      formData.append("Correo", datosUsuario.Correo);

      if (datosUsuario.Foto) {
        formData.append("Foto", datosUsuario.Foto);
      }

      const response = await axios.post(
        'http://localhost:5227/api/Auth/signup', formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        onSuccess();
      }
    } catch (err: any) {
      // console.log("Error al registrar el usuario:", err.response);
      // console.log("Error al registrar el usuario:", err.response.data.mensaje);
      if (err.response?.status === 409) {
        const mensajeError = err.response.data.mensaje;
        setErrorC(mensajeError); 
        throw new Error(mensajeError);
      } else {
        setErrorC("Error al registrar el usuario"); 
      }
    } finally {
      setIsLoadingC(false);
    }
  };

  return { isLoadingC, errorC, successC, crearCuenta };
};


export default useCrearCuenta;


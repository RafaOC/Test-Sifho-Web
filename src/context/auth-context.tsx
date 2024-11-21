import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  
  // Define la interfaz para el contexto de autenticación
  interface AuthContextType {
    isAuthenticated: boolean;
    idUsuario: number | null;
    token: string | null;
    login: (idUsuario: number, token: string) => void;
    logout: () => void;
  }
  
  // Se inicializa el contexto con un valor por defecto
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
      const savedAuthState = localStorage.getItem("isAuthenticated");
      return savedAuthState === "true";
    });
  
    const [idUsuario, setIdUsuario] = useState<number | null>(() => {
      const savedIdUsuario = localStorage.getItem("idUsuario");
      return savedIdUsuario ? Number(savedIdUsuario) : null;
    });
  
    const [token, setToken] = useState<string | null>(() => {
      return localStorage.getItem("token");
    });
  
    useEffect(() => {
      localStorage.setItem("isAuthenticated", isAuthenticated.toString());
    }, [isAuthenticated]);
  
    useEffect(() => {
      if (idUsuario !== null) {
        localStorage.setItem("idUsuario", idUsuario.toString());
      } else {
        localStorage.removeItem("idUsuario");
      }
    }, [idUsuario]);
  
    useEffect(() => {
      if (token !== null) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    }, [token]);
  
    const login = (idUsuario: number, token: string) => {
      setIsAuthenticated(true);
      setIdUsuario(idUsuario);
      setToken(token);
    };
  
    const logout = () => {
      setIsAuthenticated(false);
      setIdUsuario(null);
      setToken(null);
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("idUsuario");
      localStorage.removeItem("token");
    };
  
    return (
      <AuthContext.Provider
        value={{ isAuthenticated, idUsuario, token, login, logout }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  // Hook para usar el contexto de autenticación
  // eslint-disable-next-line react-refresh/only-export-components
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
  };
  
import "./App.css";
import { Router } from "./routers/Router";
import { AuthProvider } from "./context/auth-context";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;

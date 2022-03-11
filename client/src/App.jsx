import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Pages
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import Login from "./pages/Login";
import NuevoPassword from "./pages/NuevoPassword";
import OlvidePassword from "./pages/OlvidePassword";
import Registrar from "./pages/Registrar";
import AdministrarPacientes from "./pages/AdministrarPacientes";
import EditarPerfil from "./pages/EditarPerfil";
import CambiarPassword from "./pages/CambiarPassword";

//Context
import StatePacientes from "./context/StatePacientes";
import { AuthProvider } from "./context/AuthProvider";

//layout
import AuthLayout from "./layout/AuthLayout";
import RutaPrivada from "./layout/RutaPrivada";

function App() {
  return (
    <Router>
      <AuthProvider>
        <StatePacientes>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route
                path="olvide-password/:token"
                element={<NuevoPassword />}
              />
            </Route>

            <Route path="/admin" element={<RutaPrivada />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />
            </Route>
            
          </Routes>
        </StatePacientes>
      </AuthProvider>
    </Router>
  );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { cerrarSesion } = useAuth();

  return (
    <header className="py-10 px-2 bg-blue-400">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="font-bold text-3xl text-blue-100 text-center">
          Administrador de pacientes{" "}
          <span className="text-white font-black">Médicos</span>
        </h1>

        <nav className="flex mt-5 lg:mt-0 gap-4 ">
          <Link to="/admin" className="text-white text-xl">
            Pacientes
          </Link>
          <Link to="/admin/perfil" className="text-white text-xl">
            {" "}
            Perfil
          </Link>

          <button
            type="button"
            className="text-white text-xl"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

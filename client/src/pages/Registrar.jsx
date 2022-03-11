import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [alerta, setAlerta] = useState({});

  const { nombre, email, password, confirmpassword } = usuario;

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, confirmpassword].includes("")) {
      setAlerta({ msg: "Hay campos vacios", error: true });
      return;
    }

    if (password !== confirmpassword) {
      setAlerta({ msg: "Los password no son iguales", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "El password es muy corto,agrega minimo 6 caracteres",
        error: true,
      });
      return;
    }

    setAlerta({});

    setUsuario({
      nombre: "",
      email: "",
      password: "",
      confirmpassword: "",
    });

    try {
      await clienteAxios.post(`/medico`, usuario);

      setAlerta({
        msg: "Creado correactamente, revisa tu email",
        error: false,
      });
    } catch (err) {
      setAlerta({
        msg: err.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div className="hidden md:block">
        <h1 className="text-blue-400 font-black text-5xl leading-tight">
        Únete al administrador de pacientes 
          <span className="text-black"> más grandes</span>
        </h1>
      </div>
      <div className="shadow-lg p-5 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              name="nombre"
              onChange={handleChange}
            />
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Ingresa tu email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Ingresa password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Confirmar Password
            </label>
            <input
              type="password"
              placeholder="Confirma tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={confirmpassword}
              name="confirmpassword"
              onChange={handleChange}
            />
          </div>

          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-blue-400 w-full py-3 rounded-xl text-white uppercase font-bold 
            mt-3 hover:cursor-pointer hover:bg-blue-500 px-10
            lg:w-auto
            "
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/" className="block text-center text-gray-500 my-5">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link
            to="/olvide-password"
            className="block text-center text-gray-500 my-5"
          >
            Olvide mi password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Registrar;

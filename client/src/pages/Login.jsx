import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";

//Components
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const Login = () => {

  const { setAuth } = useAuth();
  
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const [alerta, setAlerta] = useState({});

  const { email, password } = usuario;

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post("/medico/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      setAuth(data);

      navigate("/admin");

      setUsuario({
        email: "",
        password: "",
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
          Inicia Sesión y administra tus
          <span className="text-black"> pacientes</span>
        </h1>
      </div>
      <div className="shadow-lg p-5 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}

        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email de registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              name="email"
              onChange={handleChange}
              value={email}
            />
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              name="password"
              onChange={handleChange}
              value={password}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-blue-400 w-full py-3 rounded-xl text-white uppercase font-bold 
            mt-3 hover:cursor-pointer hover:bg-blue-500 px-10
            lg:w-auto
            "
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            to="/registrar"
            className="block text-center text-gray-500 my-5"
          >
            ¿No tienes una cuenta? Regístrate
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

export default Login;

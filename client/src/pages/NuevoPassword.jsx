import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const [tokenvalido, setTokenValido] = useState(false);

  const [passwordModifcado,setPasswordModificado] = useState(false)

  const { token } = useParams();

  useEffect(() => {
    const validarToken = async () => {
      try {
        await clienteAxios(`/medico/olvide-password/${token}`);

        setTokenValido(true);
        setAlerta({
            msg: "Añade tu nueva password",
            error: false,
        });
    } catch (err) {
        setAlerta({
            msg: "Hubo un error con en el enlace",
            error: true,
        });
    }
    };
    
    validarToken();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password.trim() === "" || password.length < 6) {
        setAlerta({
            msg: "El password debe ser mínimo de 6 caracteres",
            error: true,
        });
        return;
    }
    
    try {
        const { data } = await clienteAxios.post(
            `/medico/olvide-password/${token}`,
            {password}
            );
            
            setPasswordModificado(true)
            setAlerta({
                msg: data.msg,
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
          Reestablece tu password no pierdas el acceso a tus
          <span className="text-black"> pacientes</span>
        </h1>
      </div>

      <div className="shadow-lg p-5 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}

        {tokenvalido && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password Nueva"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Guardar nueva password"
                className="bg-blue-400 w-full py-3 rounded-xl text-white uppercase font-bold 
              mt-3 hover:cursor-pointer hover:bg-blue-500 px-10
              lg:w-auto
              "
              />
            </form>
          </>
        )}
        {passwordModifcado && (
          <Link to="/" className="block text-center text-gray-500 my-5">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default NuevoPassword;

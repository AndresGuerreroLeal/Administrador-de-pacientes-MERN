import React, { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {
  const [password, setPassword] = useState({
    passwordActual: "",
    passwordNueva: "",
    confirmarPasswordNueva: "",
  });

  const [alerta, setAlerta] = useState({});

  const { passwordActual, passwordNueva, confirmarPasswordNueva } = password;

  const {guardarPassword} = useAuth()

  const handleChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([confirmarPasswordNueva, passwordActual, passwordNueva].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if(passwordNueva.length < 6){
        setAlerta({
            msg:"El password debe ser mínimo de 6 caracteres",
            error:true
        })
        return
    }

    if (passwordNueva.toString() !== confirmarPasswordNueva.toString()) {
      setAlerta({
        msg: "Las password nuevas son diferentes",
        error: true,
      });
      return;
    }

    const resultado = await guardarPassword({passwordActual,passwordNueva})

    setPassword({
      passwordActual: "",
      passwordNueva: "",
      confirmarPasswordNueva: "",
    });

    setAlerta(resultado)
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />
      <h2 className="text-center font-black text-3xl mt-10">
        Cambiar password
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu {""}
        <span className="text-blue-400 font-bold">password aqui</span>
      </p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}

          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Password
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="passwordActual"
                value={passwordActual}
                onChange={handleChange}
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Password Nueva
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="passwordNueva"
                value={passwordNueva}
                onChange={handleChange}
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Confirmar Password
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="confirmarPasswordNueva"
                value={confirmarPasswordNueva}
                onChange={handleChange}
              />
            </div>

            <input
              type="submit"
              value="Guardar Cambios"
              className="bg-blue-400 w-full px-3 py-3 font-bold rounded-lg text-white uppercase mt-5 cursor-pointer hover:bg-blue-500"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CambiarPassword;

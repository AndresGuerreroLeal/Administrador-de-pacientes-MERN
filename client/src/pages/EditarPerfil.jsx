import React, { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const EditarPerfil = () => {
  const { auth, actualizarPerfil } = useAuth();

  const [perfil, setPerfil] = useState({
      email:"",
      nombre:"",
      web:"",
      numero:""
  });

  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    if (auth) {
      setPerfil(auth);
    }
  }, [auth]);

  const { email, nombre, web, numero } = perfil;

  const handleChange = (e) => {
    setPerfil({
      ...perfil,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email].includes("")) {
      setAlerta({
        msg: "Son obligatorios los campos nombre y email",
        error: true,
      });
      return;
    }

   const resultado = await actualizarPerfil(perfil)

   setAlerta(resultado);
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />
      <h2 className="text-center font-black text-3xl mt-10">Editar Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu {""}
        <span className="text-blue-400 font-bold">información aqui</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}

          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Nombre
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="nombre"
                value={nombre}
                onChange={handleChange}
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Sition Web
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="web"
                value={web || ""}
                onChange={handleChange}
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                numero
              </label>
              <input
                type="number"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="numero"
                value={numero || ""}
                onChange={handleChange}
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Email</label>
              <input
                type="email"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="email"
                value={email}
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

export default EditarPerfil;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const ConfirmarCuenta = () => {
  const { id } = useParams();

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const { data } = await clienteAxios.get(`medico/confirmar/${id}`);

        setCuentaConfirmada(true);
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
      setCargando(false);
    };

    confirmarCuenta();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-blue-400 font-black text-5xl text-center leading-tight">
          Confirma tu cuenta y comienza administrar tus pacientes
          <span className="text-black"> pacientes</span>
        </h1>
      </div>

      <div className="shadow-lg p-5 rounded-xl bg-white">
        {!cargando && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link to="/" className="block text-center text-gray-500 my-5">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;

import React,{useState} from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const OlvidePassword = () => {

  const [email,setEmail] = useState("")
  const [alerta,setAlerta] = useState({})

  
  const handleSubmit = async(e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlerta({
        msg: "El email es obligatorio",
        error: true,
      });
      return;
    }

    try{
      const {data} = await clienteAxios.post("/medico/olvide-password",{email})

      setAlerta({
        msg: data.msg,
        error: false,
      });

    }catch(err){
      setAlerta({
        msg:err.response.data.msg,
        error:true
      })
      
    }

  };

  const {msg} = alerta


  return (
    <>
      <div className="hidden md:block">
        <h1 className="text-blue-400 font-black text-5xl leading-tight">
          Recupera tu acceso y no pierdas tus
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Enviar Instrucciones"
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
            to="/registrar"
            className="block text-center text-gray-500 my-5"
          >
            ¿No tienes una cuenta? Regístrate
          </Link>
        </nav>
      </div>
    </>
  );
};

export default OlvidePassword;

import React,{useContext, useEffect, useState} from "react";
import PacientesContext from "../context/PacientesProvider";
import Alerta from "./Alerta";
//hooks
import usePacientes from "../hooks/usePacientes";
import FormatoFecha from "../helpers/FormatoFecha";
const Form = () => {

  const [paciente,setPaciente] = useState({
      nombre:"",
      email:"",
      fecha:"",
      sintomas:""
  })

  const [alerta,setAlerta] = useState({})

  const {guardarPaciente,pacienteeditar} = useContext(PacientesContext)

  useEffect(()=>{
    if(pacienteeditar?.nombre){
      pacienteeditar.fecha = FormatoFecha(pacienteeditar.fecha)
      setPaciente(pacienteeditar)            
    }


  },[pacienteeditar])

  const {nombre,email,fecha,sintomas} =  paciente

  const handleChange = (e)=>{
    setPaciente({
        ...paciente,
        [e.target.name]:e.target.value
    })
  }

  const handleSubmit = (e)=>{
      e.preventDefault()

    if([nombre,email,fecha,sintomas].includes("")){
        setAlerta({
            msg:"Todos los campos son obligatorios",
            error:true
        })
        return
    }

    setAlerta({})

    guardarPaciente(paciente)


    setPaciente({
        nombre:"",
      email:"",
      fecha:"",
      sintomas:"",
    })
    
  }

  const { msg } = alerta;

  return (
    <>
     <h2 className='font-black text-3xl text-center'>Administrador</h2>
      <p className='text-xl mt-5 mb-10 text-center'>
      Añade tus pacientes y <span className='text-blue-400 font-bold'> Administralos</span>
          </p>

      {msg && <Alerta alerta={alerta} />}

      <form className="px-5 bg-white py-10 b-10 lg:mb-0 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5 ">
          <label
            htmlFor="paciente"
            className="text-gray-700 uppercase font-bold"
          >
            Nombre de paciente
          </label>
          <input
            id="paciente"
            placeholder="Nombre de paciente"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400
                 rounded-md"
            value={nombre}
            type="text"
            name="nombre"
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">
            email
          </label>
          <input
            id="email"
            placeholder="Email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400
                 rounded-md"
            type="email"
            value={email}
            onChange={handleChange}
            name="email"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="date" className="text-gray-700 uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="date"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400
                 rounded-md"
                 value={fecha}
                 onChange={handleChange}
                 name="fecha"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="text-gray-700 uppercase font-bold"
          >
            Sintomas
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            name="sintomas"
            onChange={handleChange}
          />
        </div>

        <input
          type="submit"
          className="bg-blue-400 w-full text-white p-3 hover:bg-blue-500 cursor-pointer transition-colors rounded-md "
          value={paciente?._id ? "Guardar Cambios" : "Agregar paciente"}
        />
      </form>
    </>
  );
};

export default Form;

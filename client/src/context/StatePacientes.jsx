import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import PacientesContext from "./PacientesProvider";

const StatePacientes = ({ children }) => {
  const [pacientesprovider, setPacientesProvider] = useState([]);
  const [pacienteeditar, setPacienteEditar] = useState({});

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        if(token){
          const { data } = await clienteAxios.get("/paciente", config);
  
          setPacientesProvider(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    obtenerPacientes();
  }, []);

  const setEdicion = (pacienteC) => {
    setPacienteEditar(pacienteC);
  };

  const guardarPaciente = async (paciente) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (paciente._id) {


      try {
        const { data } = await clienteAxios.put(
          `/paciente/${paciente._id}`,
          paciente,
          config
        );

        const pacientesActualizados = pacientesprovider.map((pacienteState) =>
          pacienteState._id === data._id ? data : pacienteState
        );

        setPacientesProvider(pacientesActualizados);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const { data } = await clienteAxios.post("/paciente", paciente, config);

        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;

        setPacientesProvider([pacienteAlmacenado, ...pacientesprovider]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const eliminarPaciente = async(id)=>{
    
    const confirmar = confirm("¿Confirmas que deseas eliminar?")
    
    if(confirmar){
      try{
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const {data} = await clienteAxios.delete(`/paciente/${id}`,config)

        const pacientesActualizado = pacientesprovider.filter((pacientesState=>pacientesState._id !== id))
        
        setPacientesProvider(pacientesActualizado)
        
      }catch(err){
        console.log(err)
      }
    }
  }


  return (
    <PacientesContext.Provider
      value={{
        pacientesprovider,
        pacienteeditar,
        guardarPaciente,
        setEdicion,
        eliminarPaciente
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default StatePacientes;

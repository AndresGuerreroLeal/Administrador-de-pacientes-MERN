import React from "react";
import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListadoPacientes = () => {
  const { pacientesprovider } = usePacientes();

  return (
    <>
      {pacientesprovider.length ? (
        <>
          <h2 className="font-black text-3xl text-center">
            Listado de pacientes
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus{" "}
            <span className="text-blue-400 font-bold"> pacientes</span>
          </p>
          {pacientesprovider.map((paciente) => (
            <Paciente paciente={paciente} key={paciente._id} />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando{" "}
            <span className="text-blue-400 font-bold">pacientes</span>
          </p>
        </>
      )}
    </>
  );
};

export default ListadoPacientes;

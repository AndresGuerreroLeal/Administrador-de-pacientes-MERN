import React from "react";

const Alerta = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error
          ? "from-red-400 to-red-600"
          : "from-blue-400 to-blue-600"
      }  
        bg-gradient-to-br
        text-center
        p-3
        rounded-xl
      text-white
        font-bold
        text-sm
        mb-10
        uppercase
      `}
    >
      {alerta.msg}
    </div>
  );
};

export default Alerta;

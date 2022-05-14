import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando,setCargando] = useState(true)


  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token){
          setCargando(false)
          return
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios.get("/medico/perfil", config);

        setAuth(data.perfil)

      } catch (err) {
        console.log(err.response.data.msg);
      }
      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  const cerrarSesion  = ()=>{
    localStorage.removeItem("token")
    setAuth({})
  }

  const actualizarPerfil = async(datos)=>{
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try{
      const url = `/medico/perfil/${datos._id}`
      const {data} = await clienteAxios.put(url,datos,config)
     
      setAuth(data)

      return {
        msg:"Almacenado correactamente"
      }

    }catch(err){
      return {
        msg: err.response.data.msg,
        error: true,
      };
    }    
  }
  
  const guardarPassword = async (datos) =>{
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

      try{

        const url = `/medico/actualizar-password`

        const {data} = await clienteAxios.put(url,datos,config)

        return {
          msg:data.msg
        }
  
      }catch(err){
        return {
          msg: err.response.data.msg,
          error: true,
        };
      }

  }
  return (
    <AuthContext.Provider
      value={{
        auth,
        cargando,
        setAuth,
        cerrarSesion,
        actualizarPerfil,
        guardarPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;

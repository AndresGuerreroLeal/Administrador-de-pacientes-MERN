import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import Fooder from '../components/Fooder';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';


const RutaPrivada = () => {
    
    const {auth,cargando} = useAuth()

    if(cargando) return "cargando"

    return (
      <>
        <Header />
        {auth?._id ? (
          <main className="container mx-auto mt-10">
            <Outlet />
          </main>
        ) : (
          <Navigate to="/" />
        )}
       
      </>
    );
}

export default RutaPrivada
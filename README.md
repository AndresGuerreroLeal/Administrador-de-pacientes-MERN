# Administrador-de-pacientes-MERN

<details>
  <summary>Tabla de contenidos</summary>
  <ol>
    <li>
      <a href="#sobre-el-proyecto">Sobre el proyecto</a>
      <ul>
        <li><a href="#herramientas-utilizadas">Herramientas Utilizadas</a></li>
      </ul>
    </li>
    <li>
      <a href="#iniciar">Iniciar</a>
      <ul>
        <li><a href="#correr-aplicación-de-manera-local">Correr aplicación de manera local </a></li>
        <li><a href="#variables-de-entorno-back-end">Variables de entorno Back-end</a></li>
        <li><a href="#variables-de-entorno-front-end">Variables de entorno Front-end</a></li>
      </ul>
    </li>
    <li><a href="#funcionalidades">Funcionalidades</a></li>
    <li><a href="#funcionalidades-futuras">Funcionalidades Futuras</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>


## Sobre el proyecto

Administrador de pacientes para médicos, la plataforma que permitirá el registro de citas médicas con los datos de cada paciente.

![product-screenshot](https://i.ibb.co/g3wPDf5/administradospacientes.png)

### Herramientas Utilizadas

El stack manejado para el proyecto fueron:

* [MongoDB](https://docs.mongodb.com/)
* [Express](https://expressjs.com/)
* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.org/)

Los estilos se manejaron con [Tailwindcss](https://tailwindcss.com/) y el flujo del estado para React se realizó con useContext.

## Iniciar

Para poder ejecutar el proyecto de manera local dejaré los siguientes pasos para su ejecución correctamente.

### Correr aplicación de manera local 

1. Clonar el repo
   ```
   git clone https://github.com/AndresGuerreroLeal/Administrador-de-pacientes-MERN.git
   ```
   
2. Instalar NPM packages en cada carpeta `./backend` y `./client`
   ```
   npm install
   ```
3. Asignar las variables de entorno como se indicará posteriormente para cada una de las carpetas del proyecto, estará indicado abajo como se deberá realizar.

4. En la carpeta `./backend` ejecutar el comando
   ```
   npm run dev
   ```
   
 5. En la carpeta `./client` ejecutar el comando
   ```
   npm run dev
   ```
   
### Variables de entorno Back-end

1. Entrar a la carpeta `./backend` 
2. Crear el archivo `.env`
   ```
   MONGO_URL = "conexión a mongodb"
   SECRETA = SECRETA

   FRONTEND_URL = http://localhost:3000

   EMAIL = "Email de gmail"
   PASSWORD = "Contraseña"
   ```   
 2.1 Opción 2, tal vez por políticas de seguridad de Google no permita el envío de emails con la cuenta asignada en las variables de entorno, 
 por lo cual el proyecto permitirá el manejo de mailtrap. 
 
  Crear el archivo `.env`
   ```
   MONGO_URL = "conexion a mongodb"
   SECRETA = SECRETA

   FRONTEND_URL = http://localhost:3000

   EMAIL_HOST = smtp.mailtrap.io
   EMAIL_PORT = Ejemplo "2359"
   EMAIL_USER = Ejemplo "c3dd43f0c008f5"
   EMAIL_PASS = Ejemplo "28662585cc7232"
   ```

   Las variables serán dadas al registrar un proyecto nuevo en mailtrap y se colocarán en las variables de entorno.  

### Variables de entorno Front-end

1. Entrar a la carpeta `./client` 
2. Entrar al archivo `.env`
   ```
   VITE_BACKEND_URL = http://localhost:3001/api
   ```   
   
## Funcionalidades

- [x] Autenticación.
- [x] Registro de usuarios.
- [x] CRUD con pacientes vinculados al médico.  
- [x] Confirmación de cuenta mediante email.
- [x] Confirmación de cambio de contraseña vía email.
- [x] Sistema de recuperación de contraseña vía email.
- [x] Sistema de recuperación de contraseña vía sesión.
- [x] Modificación de datos registrados (perfil).

## Funcionalidades Futuras

- [ ] Soporte de múltiples idiomas.
    - [ ] Inglés.
- [ ] Modo oscuro.
- [ ] Añadir foto de perfil para los usuarios registrados.
- [ ] Calendario con citas creadas.

## Contacto

Linkedin: https://www.linkedin.com/in/andres-guerrero-5731311ba/

Correo: afguerreroleal12@gmail.com

📌 Los tiempos de carga dependerá del servicio de hosting donde fue alojado. 

Deploy: https://administradorpacientesmern.netlify.app/



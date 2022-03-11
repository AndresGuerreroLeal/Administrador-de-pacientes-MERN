const nodemailer = require("nodemailer");

const emailRegistro = async (datos) => {

  var transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const { email, nombre, token } = datos;

  await transport.sendMail({
    from: "afguerreromusic@gmail.com",
    to: email,
    subject: "Confirma tu cuenta en administrador de pacientes",
    text: "Confirma tu cuenta en administrador de pacientes",
    html: `<p>Hola ${nombre} comprueba tu cuenta en administrador de pacientes</p>
    <p>Tu cuenta ya esta lista, solo debes comprobar en el siguiente enlace:
    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
    <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje</p>
            `,
  });
};

module.exports = emailRegistro;

const nodemailer = require("nodemailer");

const olvidePassword = async (datos) => {

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
    subject: "Restablece tu password",
    text: "Restablece tu password",
    html: `<p>Hola ${nombre} has solicitado restablecer tu password.</p>
     <p>Sigue el siguiente enlace para generar un nuevo password:
     <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer password</a>
     <p>Si tú no creaste realizaste la operación de restablecer password, 
   por favor comunicarse con 12345678
            `,
  });

};

module.exports = olvidePassword;

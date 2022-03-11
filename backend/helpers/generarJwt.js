const jwt = require("jsonwebtoken")

const generarjwt = function (id) {
  return jwt.sign(
    {
      id,
    },
    process.env.SECRETA,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = generarjwt;

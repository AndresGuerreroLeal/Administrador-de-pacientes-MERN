const jwt = require("jsonwebtoken");
const Medico = require("../models/Medico");

const auth = async (req, res, next) => {
  
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.SECRETA);

      req.medico = await Medico.findById(decoded.id).select(
        "-password -token -confirmado"
      );
      
      return next();
    } catch (err) {
      const error = new Error("Token no válido");

      res.status(403).json({ msg: error.message });
    }
  }

  if (!token) {
    const error = new Error("Token no válido o inexistente");
    res.status(403).json({ msg: error.message });
  }

  next();
};

module.exports = auth;

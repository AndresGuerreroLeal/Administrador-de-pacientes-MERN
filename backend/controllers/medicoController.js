const Medico = require("../models/Medico");
const generarJWT = require("../helpers/generarJwt");
const generarId = require("../helpers/generarId")
const emailRegistro = require("../helpers/emailRegistro")
const olvidePassword = require("../helpers/emailOlvidePassword")


exports.registrar = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    const existeMedico = await Medico.findOne({ email });

    if (existeMedico) {
      return res.status(401).json({ msg: "Usuario ya esta registrado" });
    }

    const medico = new Medico(req.body);

    const medicoSave = await medico.save();

    emailRegistro({email,nombre,token:medicoSave.token})

    res.json({ medico });
  } catch (err) {
    console.log(err);
  }
};

exports.perfil = (req, res) => {
    const { medico } = req;
    
    res.json({ perfil: medico });
};

exports.confirmar = async (req, res) => {
  const { token } = req.params;

  const usuarioConfirmar = await Medico.findOne({ token });

  if (!usuarioConfirmar)
  
    return res.status(404).json({ msg: "Token no válido" });

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;

    await usuarioConfirmar.save();

    res.json({ msg: "Usuario Confirmado Correctamente" });
  } catch (err) {
    console.log(err);
  }
};

exports.autenticar = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Medico.findOne({ email });

    if (!usuario)
      return res.status(403).json({ msg: "El usuario no está registrado" });

    if (!usuario.confirmado)
      return res.status(403).json({ msg: "Cuenta no confirmada" });

    if (await usuario.comprobarPassword(password)) {
        res.json({
          _id:usuario._id,
          nombre:usuario.nombre,
          email:usuario.email,
          token:generarJWT(usuario._id),
        });
    } else {
      return res.status(403).json({ msg: "Credenciales inválidos" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.olvidePassword = async (req,res)=>{
  const {email} = req.body

  let existeMedico = await Medico.findOne({email})

  if(!existeMedico){
    return res.status(400).json({msg:"El usuario no existe"})
  }

  try{
    existeMedico.token = generarId();

    existeMedico = await existeMedico.save();

    olvidePassword({
      email: existeMedico.email,
      nombre: existeMedico.nombre,
      token: existeMedico.token,
    });

    res.json({msg:"Hemos enviado un email con las instrucciones"})

  }catch(err){
    console.log(err)
  }
}

exports.comprobarToken = async (req,res)=>{
  const {token} = req.params

  const tokenValido = await Medico.findOne({token})

  if(tokenValido){
    res.json({msg:"Token válido y el usuario existe"})
  }else{
    const error = new Error("Token no válido")
    return res.status(400).json({msg:error.message})
  }
}

exports.nuevoPassword = async(req,res)=>{
  const { token } = req.params;
  const { password } = req.body;

  let medico = await Medico.findOne({token})

  if(!medico){
    const error = new Error("Hubo un error")
    return res.status(400).json({msg:error.message})
  }

  try{
    medico.token = null
 
    medico.password = password

    await medico.save()

    return res.json({ msg: "Password modificado correctamente" });

  }catch(err){
    console.log(err)
  }

}


exports.actualizarPerfil = async(req,res)=>{
  const {id} = req.params

  const medico = await Medico.findById(id)

  if(!medico){
    return res.status(400).json({msg:"Hubo un error"})
  }

  if(medico.email !== req.body.email){
    const existeEmail = await Medico.findOne({email:req.body.email})
    if(existeEmail){
      return res.status(400).json({msg:"Ese email ya esta registrado"})
    }
  }


  try{

    medico.nombre = req.body.nombre || medico.nombre
    medico.email = req.body.email || medico.email
    medico.web = req.body.web || medico.web
    medico.numero = req.body.numero || medico.numero

    const medicoActualizado = await medico.save()

    res.json(medicoActualizado)

  }catch(err){
    console.log(err)
  }
}


exports.actualizarPassword = async (req,res)=>{
  const { id } = req.medico;

  const { passwordActual, passwordNueva } = req.body;

  const medico = await Medico.findById(id);

  if (!medico) {
    return res.status(400).json({ msg: "Hubo un error" });
  }

  if (await medico.comprobarPassword(passwordActual)) {
    medico.password = passwordNueva;

    await medico.save();

    res.json({ msg: "Password almacenado correctamente" });
  } else {
    return res.status(400).json({ msg: "El password actual es incorreacto" });
  }
}
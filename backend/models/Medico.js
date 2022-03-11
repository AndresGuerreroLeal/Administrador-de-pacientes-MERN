const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const generarId = require("../helpers/generarId")

const MedicoSchema = mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  numero: {
    type: String,
    default: null,
    trim: true,
  },
  web: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: generarId(),
  },
  confirmado: {
    type: Boolean,
    default: false,
  },
});

MedicoSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

MedicoSchema.methods.comprobarPassword = async function (passwordForm){
  return await bcrypt.compare(passwordForm, this.password);
}

module.exports = mongoose.model("Medico",MedicoSchema)
const mongoose = require("mongoose")

const PacienteSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
      default:Date.now()
    },
    sintomas: {
      type: String,
      required: true,
    },
    medico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medico",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =  mongoose.model("Paciente",PacienteSchema)



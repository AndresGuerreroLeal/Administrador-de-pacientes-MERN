const Paciente = require("../models/Paciente");

exports.agregarPaciente = async (req, res) => {
  const paciente = new Paciente(req.body);

  paciente.medico = req.medico._id;

  try {
    const pacienteAlmacenado = await paciente.save();

    res.json(pacienteAlmacenado);
  } catch (err) {
    console.log(err);
  }
};

exports.obtenerPacientes = async (req, res) => {
  const pacientes = await Paciente.find().where("medico").equals(req.medico);

  res.json(pacientes);
};

exports.obtenerPaciente = async (req, res) => {
  const { id } = req.params;

  const paciente = await Paciente.findById(id);

  if (!paciente) {
    return res.json({ msg: "Paciente no encontrado" });
  }

  if (paciente.medico._id.toString() !== req.medico._id.toString()) {
    return res.json({ msg: "Acción no válida" });
  }

  res.json(paciente);
};

exports.actualizarPaciente = async (req, res) => {
  const { id } = req.params;

  const paciente = await Paciente.findById(id);

  if (!paciente) {
    return res.json({ msg: "Paciente no encontrado" });
  }

  if (paciente.medico._id.toString() !== req.medico._id.toString()) {
    return res.json({ msg: "Acción no válida" });
  }

  try {
    const pacienteActualizado = await Paciente.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    await pacienteActualizado.save();

    res.json(pacienteActualizado);
  } catch (err) {
    console.log(err);
  }
};

exports.eliminarPaciente = async (req, res) => {
  const { id } = req.params;

  const paciente = await Paciente.findById(id);

  if (!paciente) {
    return res.json({ msg: "Paciente no encontrado" });
  }

  if (paciente.medico._id.toString() !== req.medico._id.toString()) {
    return res.json({ msg: "Acción no válida" });
  }

  try {
    await paciente.deleteOne();
    res.json("Paciente eliminado");
  } catch (err) {
    console.log(err);
  }
};

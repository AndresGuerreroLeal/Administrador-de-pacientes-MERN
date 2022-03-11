const router = require("express").Router()
const pacienteController = require("../controllers/pacienteController")
const auth = require("../middleware/auth")

router.post("/",auth,pacienteController.agregarPaciente)
router.get("/",auth,pacienteController.obtenerPacientes)
router.get("/:id",auth,pacienteController.obtenerPaciente)
router.put("/:id",auth,pacienteController.actualizarPaciente)
router.delete("/:id",auth,pacienteController.eliminarPaciente)

module.exports = router
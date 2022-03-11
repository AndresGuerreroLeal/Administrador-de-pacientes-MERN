const router = require("express").Router()
const medicoController = require("../controllers/medicoController")
const auth = require("../middleware/auth")

router.post("/", medicoController.registrar);
router.get("/confirmar/:token",medicoController.confirmar)
router.post("/login",medicoController.autenticar)
router.post("/olvide-password",medicoController.olvidePassword)
router.get("/olvide-password/:token",medicoController.comprobarToken)
router.post("/olvide-password/:token",medicoController.nuevoPassword)


router.get("/perfil",auth, medicoController.perfil);
router.put("/perfil/:id",auth,medicoController.actualizarPerfil)
router.put("/actualizar-password",auth,medicoController.actualizarPassword)


module.exports = router

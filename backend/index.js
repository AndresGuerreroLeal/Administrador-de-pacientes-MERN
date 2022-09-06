const express = require("express");
const db = require("./config/db");
const cors = require("cors")

const app = express();

app.use(express.json())
app.use(cors())
db();

app.use("/api/medico", require("./routes/medicoRoutes"));
app.use("/api/paciente", require("./routes/pacienteRouter"));

app.get("/",(req,res)=>{
  res.json({msg:"Deploy exitoso"})
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Servidor funcionado en el puerto " + PORT);
});

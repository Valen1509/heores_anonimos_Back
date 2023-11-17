import express from "express"
import multer from "multer";
import { conectar } from "./db/conexionDB.js"
import { configuracionSeguridad } from "./security/configuracionSeguridad.js"
import { variables } from "./utils/variables.js"


const app = express()
const PORT = variables.EXPRESS_PORT

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json())
app.use(express.urlencoded({extended:true}))

configuracionSeguridad(app)

conectar()

app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}`)
})
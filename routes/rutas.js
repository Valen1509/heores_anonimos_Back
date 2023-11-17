import { Router } from "express"
import routerUsuario from "./rutasUsuario.js"
import routerProyecto from "./rutasProyecto.js"

const router = Router()

router.use("/usuario", routerUsuario)
router.use("/proyecto", routerProyecto)


export default router


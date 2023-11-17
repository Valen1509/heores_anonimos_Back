import { Router } from "express"
import passport  from "passport"
import proyectoController from "../controllers/proyectoController.js"

const routerProyecto = Router()

routerProyecto.post("/",
    passport.authenticate("jwt", {session: false}),
    proyectoController.postProyecto)

routerProyecto.get("/",
    passport.authenticate("jwt", {session: false}),
    proyectoController.getProyecto)

routerProyecto.get("/:id",
    passport.authenticate("jwt", {session: false}),
    proyectoController.detalleProyecto)

routerProyecto.put("/:id",
    passport.authenticate("jwt", {session: false}),
    proyectoController.actualizarProyecto)

routerProyecto.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    proyectoController.eliminarProyecto)

export default routerProyecto
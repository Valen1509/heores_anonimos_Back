import respuestasHttp from "../utils/respuestasHttp.js"
import proyectoService from "../services/proyectoService.js";
import { ProyectoActualizarReqModel, ProyectoCrearRequestModel, ProyectoDatosResModel } from "../models/proyectoModel.js";

const postProyecto= (req, res)=>{

    proyectoService.crearProyecto(new ProyectoCrearRequestModel(req.body), req.user)

    .then( (proyecto)=>{
        respuestasHttp.exito(req, res, new ProyectoDatosResModel(proyecto), 201)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al crear el proyecto", 400)        
    })
}


const getProyecto= (req, res)=>{
    
  proyectoService.leerProyecto()

  .then( array =>{

    let losProyectos = []

    array.forEach(proyecto => {

        losProyectos.push(new ProyectoDatosResModel(proyecto))
        
    });
      respuestasHttp.exito(req, res, losProyectos, 200)
  })
  .catch( err =>{
      respuestasHttp.error(req, res, err, "Error al leer los Proyectos", 500)      
  })
}


const detalleProyecto= (req, res) => {

  proyectoService.detalleProyecto(req.params.id)
  .then (proyecto =>{
    respuestasHttp.exito(req, res, new ProyectoDatosResModel(proyecto), 200)
  })
  .catch( err =>{
    respuestasHttp.error(req, res, err, "Error al leer el proyecto", 500)
  })
}


const actualizarProyecto= (req, res) => {

  proyectoService.actualizarProyecto(req.params.id, new ProyectoActualizarReqModel(req.body))

  .then(proyecto => {
      respuestasHttp.exito(req, res, new ProyectoDatosResModel(proyecto), 200)
    })
    .catch(err => {
      respuestasHttp.error(req, res, err, "error al actualizar el proyecto", 400)    
    })
}


const eliminarProyecto= (req, res)=>{

  proyectoService.eliminarProyecto(req.params.id)

  .then( () =>{
    respuestasHttp.exito(req, res, "proyecto eliminado con exito", 200)
  })
  .catch( err=>{
    respuestasHttp.error(req, res, err, "error al eliminar la proyecto", 400)
  })
}


export default { postProyecto, getProyecto, detalleProyecto, actualizarProyecto, eliminarProyecto }
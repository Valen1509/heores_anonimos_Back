import respuestasHttp from "../utils/respuestasHttp.js"
import usuarioService from "../services/usuarioService.js"
import { PasswordActualizarReqModel, UsuarioActualizarReqModel, UsuarioCrearRequestModel, UsuarioDatosResModel } from "../models/usuarioModel.js"

const postUsuario= (req, res)=>{

    usuarioService.crearUsuario(new UsuarioCrearRequestModel(req.body), req.user.sub)

    .then( (usuario)=>{
        respuestasHttp.exito(req, res, new UsuarioDatosResModel(usuario), 201)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al crear el usuario", 400)        
    })
}

const getUsuarios= (req, res)=>{

    usuarioService.leerUsuarios()

    .then( array =>{        
        let losUsuarios= []
        array.forEach(usuario => {
        losUsuarios.push(new UsuarioDatosResModel(usuario)) 
        })
            respuestasHttp.exito(req, res, losUsuarios, 200)
        })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer todos los usuarios", 400)        
    })
}

const getUsuario= (req, res)=>{

    usuarioService.leerUsuario(req.user.sub)

    .then( array =>{        
        let losUsuarios= []
        array.forEach(usuario => {
        losUsuarios.push(new UsuarioDatosResModel(usuario)) 
        })
            respuestasHttp.exito(req, res, losUsuarios, 200)
        })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer los usuarios", 400)        
    })
}

const getDetalleUsuario= (req, res)=>{

    usuarioService.detalleUsuario(req.params.id, req.user.sub)

    .then(usuario=>{
        respuestasHttp.exito(req, res, new UsuarioDatosResModel(usuario), 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer el usuario", 400)
    })
}

const putUsuario= (req, res)=>{

    usuarioService.actualizarUsuario(req.params.id, new UsuarioActualizarReqModel(req.body), req.user.sub)

    .then(usuario=>{
        respuestasHttp.exito(req, res, new UsuarioDatosResModel(usuario), 200)
    })
    .catch( err =>{
        respuestasHttp.error(req, res, err, "Error al actualizar el usuario", 400)
    })
}

const putPassword= (req, res)=>{

    usuarioService.actualizarPassword(req.params.id, new PasswordActualizarReqModel(req.body), req.user.sub)

    .then( ()=>{
        respuestasHttp.exito(req, res, "Contraseña actualizada con exito", 200)
    })
    .catch( err =>{
        respuestasHttp.error(req, res, err, "Error al actualizar la contraseña", 400)
    })
}

const deleteUsuario= (req, res)=>{

    usuarioService.eliminarUsuario(req.params.id, req.user.sub)

    .then(()=>{
        respuestasHttp.exito(req, res, "Usuario eliminado correctamente", 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "No se pudo eliminar el usuario", 500)
    })
}

const postSignin= (req, res)=>{

    if(!req.user.error){
        respuestasHttp.signin(req, res, "", 200)
    }else{
        respuestasHttp.error(req, res, "", req.user.error, 403)
    }
}

export default { postSignin, postUsuario, getUsuarios, getDetalleUsuario, putUsuario, getUsuario, putPassword, deleteUsuario }

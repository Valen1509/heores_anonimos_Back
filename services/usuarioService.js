import usuarioRepository from "../db/repository/usuarioRepository.js"
import crypto from "crypto"
import bcrypt from "bcrypt"

const crearUsuario= (usuario)=>{

    return new Promise(async(resolve,reject)=>{

        if(!usuario.nombre || !usuario.email || !usuario.password){
            reject("Faltan datos")
        }
        else if(await usuarioRepository.buscarEmail(usuario.email) !==null){
            reject("Este email ya se encuentra registrado")
        }
        else{
        usuario.idUsuario= crypto.randomUUID()
        usuario.passwordEncriptada= bcrypt.hashSync(usuario.password, 10)

        usuarioRepository.crear(usuario)

        resolve(usuario)
        }
    })

}

const leerUsuarios = () => {

    return new Promise((resolve, reject) => {

        usuarioRepository.leer()

            .then(async array => {
                let usuarios=[]
                for await (const usuario of array){                    
                    usuarios.push(usuario)
                }
                resolve(usuarios);
            })
            .catch(err => {
                reject("No es posible leer todos los usuarios")
            })
    })
}

const leerUsuario= (email)=>{

    return new Promise((resolve, reject)=>{

        usuarioRepository.buscarEmail(email)
        .then( usuario=>{
            if(usuario == null){
                reject("No se encuentra el usuario")
            }
            resolve(usuario)
        })
    })
}

const detalleUsuario=(id)=>{
    return new Promise ((resolve , reject)=> {

        resolve(usuarioRepository.detalle(id))
    })
}

const actualizarUsuario=(id, usuario)=>{

    return new Promise(async (resolve, reject)=>{

        if(!usuario.nombre  || !usuario.email){
            reject("Faltan datos")
        }
        /* else if(await usuarioRepository.buscarEmail(usuario.email) !==null){
            reject("Este email ya se encuentra registrado")
        } */
        else{

            const usuarioDetalle = await usuarioRepository.detalle(id)
            usuarioDetalle.nombre = usuario.nombre
            usuarioDetalle.email = usuario.email            

            const usuarioData = await usuarioRepository.actualizar(usuarioDetalle)
        
            resolve(usuarioData)
        }
    })  
}

const actualizarPassword=(id, usuario)=>{    

    return new Promise ( async (resolve, reject)=>{

        if(!usuario.newPassword || !usuario.confirPassword){
            reject("Faltan datos")
        }
        else if(usuario.newPassword !== usuario.confirPassword){
            reject("Las contraseñas no coiciden")
        }
        else{
            const usuarioDetalle = await usuarioRepository.detalle(id)
            usuarioDetalle.passwordEncriptada= bcrypt.hashSync(usuario.newPassword, 10)
            const passwordActualizada = await usuarioRepository.actualizarPassword(usuarioDetalle);
            resolve(passwordActualizada)
        }
    })
}

const eliminarUsuario = (id) =>{

    return new Promise((resolve, reject)=>{
        
        resolve(usuarioRepository.eliminar(id))
    })
}

export default {crearUsuario, leerUsuario, leerUsuarios, detalleUsuario, actualizarUsuario, actualizarPassword, eliminarUsuario}
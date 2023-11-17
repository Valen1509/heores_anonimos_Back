import { db } from "../conexionDB.js"

const crear = (usuario) => {
  
    db.query('INSERT INTO usuario SET ?', {idUsuario:usuario.idUsuario, nombre:usuario.nombre, email:usuario.email, passwordEncriptada:usuario.passwordEncriptada}, (err, results) => {

        if (err) {
        console.error('Error al crear el usuario', err)
      } else {
        console.log('Usuario creado con éxito')
      }
    })
  }

const leer= ()=>{
    
  return new Promise((resolve, reject) => {

    db.query('SELECT * FROM usuario', (err, results) => {
        if (err) {
            console.error('Error al obtener los usuarios', err)
            reject(err)
        } else {
            console.log('Usuarios obtenidos con éxito');
            resolve(results)
        }
    })
  })
}

const buscarEmail = (email) => {

    return new Promise((resolve, reject) => {

      db.query('SELECT * FROM usuario WHERE email = ?', [email], (err, results) => {
          
          if (err) {
              console.error('Error al obtener el email', err)
              reject(err)
           } 
           else if (results.length === 0){
            console.log('No se encontró ningun email')
            resolve(null)
          }
          else{
            console.error('Este email ya se encuentra registrado')
            resolve(results[0])
          }
      })
    })
  }
  
const detalle=(id)=>{
  
  return new Promise ((resolve ,reject)=> {

    db.query('SELECT * FROM usuario WHERE idUsuario = ?', [id], (err, results)=>{

      if(err){
        console.error('Error al obtener el usuario', err)
        reject(err)
      }
      else if(results.length === 0){
        console.error('No se encontró ningun usuario', err)
        reject(err)
      }
      else{
        console.log('usuario obtenido con éxito')
        resolve(results[0])
      }
    })
  })
}

const actualizar=(usuarioDetalle)=>{

  return new Promise((resolve, reject)=>{

    db.query('UPDATE usuario SET nombre = ?, email = ? WHERE idUsuario = ?', [usuarioDetalle.nombre, usuarioDetalle.email, usuarioDetalle.idUsuario], (err, results) => {

      if(err){
        console.error('Error al actualizar el usuario', err)
        reject(err)
      }
      else if(results.length === 0){
        console.error('No se econtro ningun usuario para actualizar', err)
        reject(err)
      }
      else{

        db.query('SELECT * FROM usuario WHERE idUsuario = ?', [usuarioDetalle.idUsuario], (err, results)=>{

          if(err){
            console.error('Error al obtener el usuario', err)
            reject(err)
          } else {
            console.log('Usuario obtenido con exito')
            resolve(results[0])
          }
        })
      }

    })
  })
}

const actualizarPassword=(usuarioDetalle)=>{

  return new Promise((resolve, reject)=>{

    db.query('UPDATE usuario SET passwordEncriptada = ? WHERE idUsuario = ?', [usuarioDetalle.passwordEncriptada, usuarioDetalle.idUsuario], (err, results) => {

      if(err){
        console.error('Error al actualizar la password', err)
        reject(err)
      }
      if(results.affectedRows === 0){
        console.error('No se encontró ningún usuario con el ID especificado', err)
        reject(err)
      }
      else{
        console.log("Password actualizada con éxito")
        resolve(results)
      }
    })
  })
}

const eliminar = (id) => {

  return new Promise((resolve,reject)=> {

      db.query('DELETE FROM usuario WHERE idUsuario = ?', [id], (err, results)=>{
          if(err){
              console.error('Error al eliminar el usuario', err)
              reject(err)
          }
          if(results.lenght === 0){
              reject('No existe un registro con ese ID', err)
              reject(err)
          }
          else{
              console.log('Usuario eliminado con éxito')
              resolve(results)
          }
      })
  })
}

export default {crear, leer, buscarEmail, detalle, actualizar, actualizarPassword, eliminar}
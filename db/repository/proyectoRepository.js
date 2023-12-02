import { db } from "../conexionDB.js";

const crear = (proyecto) => {    
  
    db.query('INSERT INTO proyecto SET ?',{idProyecto:proyecto.idProyecto, nombreHeroe:proyecto.nombreHeroe, profesionHeroe:proyecto.profesionHeroe, autor:proyecto.autor, descripcion:proyecto.descripcion, imgProyecto:proyecto.imgProyecto, imgHeroe:proyecto.imgHeroe}, (err, results) => {

        if (err) {        
            console.error('Error al crear el proyecto', err)
        } else {
            console.log('proyecto creado con éxito')
      }
    })
  }

  const leer = () => {

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM proyecto',(err, results) => {
            if (err) {
                console.error('Error al obtener los proyectos', err)
                reject(err); 
            } else {
                /* console.log('proyectos obtenidos con éxito') */
                resolve(results)
            }
        })
    })
}


const detalle= (id)=>{

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM proyecto WHERE idProyecto = ?', [id], (err, results) => {
            
            if (err) {
                console.error('Error al obtener el proyecto', err)
                reject(err);

             } else if (results.length === 0){
              console.error('No se encontro ningun proyecto', err);
                reject(err); 

            } else {
                console.log('proyecto obtenido con éxito')
                resolve(results[0]);
            }
        });
    });
}

const actualizar = (proyectoDetalle) => {
console.log(proyectoDetalle)
    return new Promise((resolve, reject) => {
                
        db.query('UPDATE proyecto SET nombreHeroe = ?, profesionHeroe = ?, autor = ?, descripcion = ?, imgProyecto = ?, imgHeroe = ? WHERE idProyecto = ?', [proyectoDetalle.nombreHeroe, proyectoDetalle.profesionHeroe, proyectoDetalle.autor, proyectoDetalle.descripcion, proyectoDetalle.imgProyecto, proyectoDetalle.imgHeroe, proyectoDetalle.idProyecto], (err, results) => {
            if (err) {
                console.error('Error al actualizar el proyecto', err);
                reject(err);
            }
            if (results && results.length === 0) {                
                console.error('No se encontró ningun proyecto para actualizar', err);
                reject(err);
            } else {

                db.query('SELECT * FROM proyecto WHERE idProyecto = ?', [proyectoDetalle.idProyecto], (err, results) => {
            
                if (err) {
                    console.error('Error al obtener el proyecto', err)
                    reject(err);
                
                } else {
                    console.log('proyecto obtenido con éxito');
                    resolve(results[0]); 
                    }
                })
            }
        })
    })
   }
   
   const eliminar = (id) => {
    
    return new Promise((resolve, reject) => {

        db.query('DELETE FROM proyecto WHERE idProyecto = ?', [id], (err, results) => {
            if (err) {
                console.error('Error al eliminar el proyecto', err)
                reject(err)
            }    
            if(results.length === 0){
            console.error('No se encontro ningun proyecto', err)
                reject(err)
            } else {
                console.log('proyecto eliminado con éxito')
                resolve(results)
            }
        })
    })
}

export default {crear, leer, detalle, actualizar, eliminar}

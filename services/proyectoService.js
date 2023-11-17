import proyectoRepository from "../db/repository/proyectoRepository.js";
import crypto from "crypto"

const crearProyecto = (proyecto, email) => {    

    return new Promise( async (resolve, reject)=>{

        if(!proyecto.nombreHeroe || !proyecto.profesionHeroe || !proyecto.autor || !proyecto.descripcion || !proyecto.imgProyecto){
            reject("Faltan datos");
        } else {
            
            proyecto.nombreHeroe = proyecto.nombreHeroe.toLowerCase();
            proyecto.idProyecto = crypto.randomUUID();
            
            proyectoRepository.crear(proyecto);
            resolve(proyecto);
            
        }
    })
}

const leerProyecto = () => {

    return new Promise((resolve, reject) => {

        proyectoRepository.leer()

            .then(array => {
                resolve(array);
            })
            .catch(err => {
                reject("No es posible leer los proyectos")
            })
    })
}

const detalleProyecto = (id) => {
    
    return new Promise((resolve, reject) => {

       resolve(proyectoRepository.detalle(id))

    })
}

const actualizarProyecto = (id, proyecto) => {

    return new Promise( async (resolve, reject)=>{

        if(!proyecto.nombreHeroe || !proyecto.profesionHeroe || !proyecto.autor || !proyecto.descripcion || !proyecto.imgProyecto){
            reject("Faltan datos");
        } else {

            const proyectoDetalle = await proyectoRepository.detalle(id);
            proyectoDetalle.nombreHeroe = proyecto.nombreHeroe
            proyectoDetalle.profesionHeroe = proyecto.profesionHeroe
            proyectoDetalle.autor = proyecto.autor
            proyectoDetalle.descripcion = proyecto.descripcion
            proyectoDetalle.imgProyecto = proyecto.imgProyecto
            const proyectoData = await proyectoRepository.actualizar(proyectoDetalle)

            resolve(proyectoData)
        }
    })
}

const eliminarProyecto = (id) => {

    return new Promise ((resolve ,reject)=> {

        resolve(proyectoRepository.eliminar(id))
    })
}

export default { crearProyecto, leerProyecto, detalleProyecto, actualizarProyecto, eliminarProyecto }
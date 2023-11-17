function ProyectoCrearRequestModel(proyecto){
    this.nombreHeroe = proyecto.nombreHeroe
    this.profesionHeroe = proyecto.profesionHeroe
    this.autor = proyecto.autor
    this.descripcion = proyecto.descripcion
    this.imgProyecto = proyecto.imgProyecto
}

function ProyectoDatosResModel(proyecto){
    this.idProyecto = proyecto.idProyecto
    this.nombreHeroe = proyecto.nombreHeroe
    this.profesionHeroe = proyecto.profesionHeroe
    this.autor = proyecto.autor
    this.descripcion = proyecto.descripcion
    this.imgProyecto = proyecto.imgProyecto
}

function ProyectoActualizarReqModel(proyecto){
    this.nombreHeroe = proyecto.nombreHeroe
    this.profesionHeroe = proyecto.profesionHeroe
    this.autor = proyecto.autor
    this.descripcion = proyecto.descripcion
    this.imgProyecto = proyecto.imgProyecto
}

export { ProyectoCrearRequestModel, ProyectoDatosResModel, ProyectoActualizarReqModel }
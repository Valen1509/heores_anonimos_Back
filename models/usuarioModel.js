function UsuarioCrearRequestModel(usuario){
    this.nombre = usuario.nombre
    this.email = usuario.email
    this.password = usuario.password    
}

function UsuarioDatosResModel(usuario){
    this.idUsuario = usuario.idUsuario
    this.nombre = usuario.nombre
    this.email = usuario.email
    this.passwordEncriptada = usuario.passwordEncriptada
}

function UsuarioActualizarReqModel(usuario){
    this.nombre= usuario.nombre    
    this.email = usuario.email    
}

function PasswordActualizarReqModel(usuario){
    this.newPassword = usuario.newPassword
    this.confirPassword = usuario.confirPassword
}

function UsuarioEntity(usuario){
    this.idUsuario = usuario.idUsuario
    this.nombre = usuario.nombre
    this.email = usuario.email
}

export {UsuarioCrearRequestModel, UsuarioDatosResModel, UsuarioEntity, UsuarioActualizarReqModel, PasswordActualizarReqModel}
const registrar = () => {
    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('correo').value;
    let perfil = document.getElementById('perfil').value;
    let pass = document.getElementById('contraseña').value;

    let usuario = {
        nombre,
        correo,
        perfil,
        pass
    }
    console.log(usuario)
}

const iniciarSesion = () => {
    let correo = document.getElementById('correo').value;
    let pass = document.getElementById('password').value;

    let usuario = {
        correo,
        pass
    }
    console.log(usuario);
}
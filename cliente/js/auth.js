const registrar = () => {
    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('correo').value;
    let perfil = document.getElementById('perfil').value;
    let pass = document.getElementById('contraseña').value;

    if(nombre == '' || correo == '' || pass == '') {
        //alert('No has ingresado las credenciales completas.')

        swal.fire({
            title: 'Error!',
            text: 'Llena todos los espacios',
            type: 'error',
            confirmButtonText: 'Cool'
        })
    } else {
        let usuario = {
            nombre,
            correo,
            perfil,
            pass
        }
    
        console.log(usuario)
    }
}

const iniciarSesion = () => {
    let correo = document.getElementById('correo').value;
    let pass = document.getElementById('password').value;

    if(correo == '' || pass == '') {
        swal.fire({
            title: 'Error!',
            text: 'Llena todos los espacios',
            type: 'error',
            confirmButtonText: 'Cool'
        })
    } else {
        let usuario = {
            correo,
            pass
        }
        console.log(usuario);
    }
}
const registrar = () => {
    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('correo').value;
    let perfil = document.getElementById('perfil').value;
    let pass = document.getElementById('contraseña').value;

    if(nombre == '' || correo == '' || pass == '') {
        mostrarMensaje('Debes llenar el formulario');
        // swal.fire({
        //     title: 'Error!',
        //     text: 'Llena todos los espacios',
        //     type: 'error',
        //     confirmButtonText: 'Cool'
        // })
    } else {
        console.log(nombre)
    
        $.post('../../server/controllers/UserController.php', {nombre, correo, perfil, password: pass}, (res, req) => {
            if(req == 'success') {
                document.getElementById('registerForm').reset();
                swal.fire({
                    title: 'Usuario registrado',
                    text: 'Te has registrado exitosamente, por favor inicia sesion',
                    type: 'success'
                })
            }
        });
    }
}

const iniciarSesion = () => {
    let correo = document.getElementById('correo').value;
    let pass = document.getElementById('password').value;

    if(correo == '' || pass == '') {
        mostrarMensaje('Debes llenar el formulario');
        // swal.fire({
        //     title: 'Error!',
        //     text: 'Llena todos los espacios',
        //     type: 'error',
        //     confirmButtonText: 'Cool'
        // })
    } else {
        let usuario = {
            correo,
            pass
        }
        console.log(usuario);
    }
}

const mostrarMensaje = (mensaje) => {
    $(`#mensaje`).html(`<div class="alert alert-danger" role="alert">${mensaje}</div>`)
}
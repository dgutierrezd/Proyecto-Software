const registrar = () => {
    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('correo').value;
    let perfil = document.getElementById('perfil').value;
    let pass = document.getElementById('contraseña').value;

    if(nombre == '' || correo == '' || pass == '') {
        mostrarMensaje('Debes llenar el formulario');
    } else {
        $.post('../../server/controllers/UserController.php', {nombre, correo, perfil, password: pass, metodo:'registrar'}, (res, req, error) => {
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
    } else {
        $.post('../../server/controllers/UserController.php', {nombre:'', correo, perfil:'', password: pass, metodo:'iniciarSesion'}, (res, req, error) => {
            if(res) {
                window.location.href="../autor/misArticulos.html";
            } else 
                mostrarMensaje('Credenciales no válidas');
        });
    }
}

const mostrarMensaje = (mensaje) => {
    $(`#mensaje`).html(`<div class="alert alert-danger" role="alert">${mensaje}</div>`)
}
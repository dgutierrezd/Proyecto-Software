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
            res = res.split(" ");
    
            if(res) {
                switch (res[0]) {
                    case 'autor':
                        localStorage.setItem('id', res[1])
                        window.location.href="../autor/misArticulos.html";    
                        break;
                    case 'evaluador':
                        localStorage.setItem('id', res[1])
                        window.location.href="../evaluador/verArticulos.html";
                        break;
                
                    default:
                        mostrarMensaje('Credenciales no válidas');
                        break;
                }
            } else 
                mostrarMensaje('Credenciales no válidas');
        });
    }
}

const mostrarMensaje = (mensaje) => {
    $(`#mensaje`).html(`<div class="alert alert-danger" role="alert">${mensaje}</div>`)
}
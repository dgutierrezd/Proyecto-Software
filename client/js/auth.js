// Registrar el usuario en la bd
const registrar = () => {
    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('correo').value;
    let perfil = document.getElementById('perfil').value;
    let pass = document.getElementById('contraseña').value;

    if(nombre == '' || correo == '' || pass == '') {
        mostrarMensaje('Debes llenar el formulario');
    } else {
        // enviar los datos del usuario al servidor
        $.post('../../server/controllers/UserController.php', {nombre, correo, perfil, password: pass, metodo:'registrar'}, (res, req, error) => {
            if(req == 'success') {
                // se vacia el formulario.
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

// iniciar sesion y se guarda el id en el local storage.
const iniciarSesion = () => {
    let correo = document.getElementById('correo').value;
    let pass = document.getElementById('password').value;

    if(correo == '' || pass == '') {
        mostrarMensaje('Debes llenar el formulario');
    } else {
        // Enviar los datos al servidor y consultar si existe el usuario en la bd
        $.post('../../server/controllers/UserController.php', {nombre:'', correo, perfil:'', password: pass, metodo:'iniciarSesion'}, (res, req, error) => {
            res = res.split(" ");
    
            if(res) {
                // dependiendo del perfil se ingresa a la pagina.
                switch (res[0]) {
                    case 'autor':
                        // guardar el id en el local storage
                        localStorage.setItem('id', res[1])
                        window.location.href = "../autor/misArticulos.html";    
                        break;
                    case 'evaluador':
                        localStorage.setItem('id', res[1])
                        window.location.href = "../evaluador/verArticulos.html";
                        break;
                    case 'editor':
                        localStorage.setItem('id', res[1])
                        window.location.href = "../editor/editor.html";
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

// Mensaje que se muestra al ingresar alguna credencial no válida
const mostrarMensaje = (mensaje) => {
    $(`#mensaje`).html(`<div class="alert alert-danger" role="alert">${mensaje}</div>`)
}
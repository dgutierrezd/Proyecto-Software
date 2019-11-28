// al cerrar sesion se elimina el id del local storage
const cerrarSesion = () => {
    localStorage.removeItem('id');
    window.location.href="../index.html"; 
}

const enviarArticulo = () => {
    let titulo = document.getElementById('titulo').value;
    let descripcion = document.getElementById('descripcion').value;
    let autorId = localStorage.getItem('id');
    let estado = 'enviado';

    if(titulo == '' | descripcion == '') {
        mostrarMensaje('Debes llenar todos los campos.');
    } else {
        // enviar los datos del usuario al servidor
        $.post('../../server/controllers/ArticleController.php', {id:0 ,titulo, descripcion, autorId, estado, evaluadorId:0, metodo:'agregarArticulo'}, (res, req, error) => {
            console.log(res)
            if(req == 'success') {
                // se vacia el formulario.
                document.getElementById('articleForm').reset();
                swal.fire({
                    title: 'Articulo enviado',
                    text: 'El articulo enviado satisfactoriamente, espera a que lo evaluen.',
                    type: 'success'
                })
            }
        });
    }
}

const mostrarMensaje = (mensaje) => {
    $(`#mensaje`).html(`<div class="alert alert-danger" role="alert">${mensaje}</div>`)
}
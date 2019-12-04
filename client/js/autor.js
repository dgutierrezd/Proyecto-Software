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
            if(req == 'success') {
                console.log(res)
                saveFile(res)
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

const saveFile = id => {
    var file_data = $('#file').prop('files')[0];
    
    if(file_data != undefined) {
        var form_data = new FormData();                  
        form_data.append('file', file_data, `${id}.pdf`);
        $.ajax({
            type: 'POST',
            url: '../../server/controllers/upload.php',
            contentType: false,
            processData: false,
            data: form_data,
            success: (response) => {
                if(response == 'success') {
                    console.log('File uploaded successfully.');
                } else if(response == 'false') {
                    console.log('Invalid file type.');
                } else {
                    console.log('Something went wrong. Please try again.');
                }

                $('#file').val('');
            }
        });
    }
}

window.onload = () => {
    let autorId = localStorage.getItem('id');
    $.post('../../server/controllers/ArticleController.php', {id:0, titulo:'', descripcion:'', autorId, estado:'enviado', evaluadorId:0, metodo:'getArticlesAutor'}, (res, req, error) => {
        if(!res) {
            $('.noArticulos').html('<h2>No has enviado artículos aún</h2>')
        }
        res = res.split('*');
        res.pop();

        var table = `<table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Título Artículo</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Estado</th>
                            </tr>
                        </thead>
                        <tbody>`;
        
        for(let item in res) {
            item = res[item].split('->');
            
            table += `<tr>
                        <th scope="row">${item[0]}</th>
                        <td>${item[1]}</td>
                        <td>${item[2]}</td>
                        <td>${item[3]}</td>
                    </tr>`
        }

        table += `</tbody>
                </table>`;
        document.getElementById('articlesTable').innerHTML = table;
    })
}

const mostrarMensaje = (mensaje) => {
    $(`#mensaje`).html(`<div class="alert alert-danger" role="alert">${mensaje}</div>`)
}
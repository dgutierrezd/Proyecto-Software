// al cerrar sesion se elimina el id del local storage
const cerrarSesion = () => {
    localStorage.removeItem('id');
    window.location.href="../index.html"; 
}

window.onload = () => {
    $.post('../../server/controllers/ArticleController.php', {id:0, titulo:'', descripcion:'', autorId:'', estado:'enviado', evaluadorId:'', metodo:'getArticlesAdmin'}, (res, req, error) => {
        res = res.split('*');
        res.pop();

        var table = `<table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Título Artículo</th>
                                <th scope="col">Autor</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                    <tbody>`;
        
        for(let item in res) {
            item = res[item].split('->');
            
            table += `<tr>
                        <th scope="row">${item[0]}</th>
                        <td>${item[1]}</td>
                        <td>${item[3]}</td>
                        <td>${item[2]}</td>
                        <td>
                            <button type="button" class="btn btn-info" onclick="getEvaluadores(${item[0]})">Enviar a</button>
                        </td>
                    </tr>`
        }
        table += `</tbody>
                </table>`;
        document.getElementById('articlesTable').innerHTML = table;
    })
}

const enviarArticulo = (evaluadorId, articuloId) => {
    $.post('../../server/controllers/ArticleController.php', {id: articuloId, titulo:'', descripcion:'', autorId:'', estado:'enviado', evaluadorId:evaluadorId, metodo:'setEvaluador'}, (res, req, error) => {
        location.reload();
    })
}

const getEvaluadores = id => {
    document.getElementById('lista').style.display = 'block';
    $.post('../../server/controllers/UserController.php', {nombre:'', correo:'', perfil:'evaluador', password:'', metodo:'getEvaluators'}, (res, req, error) => {
        res = res.split('*');
        res.pop();
        var table = `<table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>`;

        for(let item in res) {
        item = res[item].split('->');
        table += `<tr>
                    <td>${item[1]}</td>
                    <td>${item[2]}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick="enviarArticulo(${item[0]}, ${id})">Enviar</button>
                    </td>
                </tr>`
        }
        table += `</tbody>
                </table>`;
        document.getElementById('evaluadoresTable').innerHTML = table;
    })
}
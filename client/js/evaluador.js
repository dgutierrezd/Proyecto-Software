// al cerrar sesion se elimina el id del local storage
const cerrarSesion = () => {
    localStorage.removeItem('id');
    window.location.href="../index.html"; 
}

window.onload = () => {
    let evaluadorId = localStorage.getItem('id');
    $.post('../../server/controllers/ArticleController.php', {id:0, titulo:'', descripcion:'', autorId:'', estado:'enviado', evaluadorId, metodo:'getArticlesEvaluate'}, (res, req, error) => {
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
                            <button type="button" class="btn btn-info btn-block mb-2"><a href="../articulos/articulo.pdf" target="_blank" style="color: white;">Leer</a></button><div style="float: right;">
                            <button type="button" class="btn btn-success btn-block" onclick="aprobarArticulo(${item[0]})">Aprobar</button>
                            <button type="button" class="btn btn-danger btn-block" onclick="rechazarArticulo(${item[0]})">Rechazar</button>
                        </td>
                    </tr>`
        }

        table += `</tbody>
                </table>`;
        document.getElementById('articlesTable').innerHTML = table;
    })
}

const aprobarArticulo = id => {
    $.post('../../server/controllers/ArticleController.php', {id, titulo:'', descripcion:'', autorId:0, estado:'aprobado', evaluadorId:0, metodo:'aprobarArticulo'}, (res, req, error) => {
        location.reload();
    })
}

const rechazarArticulo = id => {
    $.post('../../server/controllers/ArticleController.php', {id, titulo:'', descripcion:'', autorId:0, estado:'rechazado', evaluadorId:0, metodo:'rechazarArticulo'}, (res, req, error) => {
        location.reload();
    })
}
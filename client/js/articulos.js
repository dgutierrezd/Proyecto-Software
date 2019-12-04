const filtrar = () => {
    let input = document.getElementById('filtro');
    let filter = input.value.toUpperCase();
    let table = document.getElementById('table');
    let tr = table.getElementsByTagName('tr');
    for(let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[0];
        let txtValue = td.textContent || td.innerText;
        if(txtValue.toUpperCase().indexOf(filter) > -1)
            tr[i].style.display = '';
        else
            tr[i].style.display = 'none';
    }
}

window.onload = () => {
    $.post('../server/controllers/ArticleController.php', {id:0, titulo:'', descripcion:'', autorId:0, estado:'aprobado', evaluadorId:0, metodo:'getArticles'}, (res, req, error) => {
        res = res.split('*');
        res.pop();

        var table = `<table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Título Artículo</th>
                                <th scope="col">Autor</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="table">`;
        
        for(let item in res) {
            item = res[item].split('->');
            
            table += `<tr>
                        <th scope="row">${item[0]}</th>
                        <td>${item[1]}</td>
                        <td>${item[2]}</td>
                        <td>
                            <button type="button" class="btn btn-info"><a href="./articulos/${item[0]}.pdf" target="_blank" style="color: white;">Leer</a></button>
                        </td>
                    </tr>`
        }

        table += `</tbody>
                </table>`;
        document.getElementById('articlesTable').innerHTML = table;
    })
}
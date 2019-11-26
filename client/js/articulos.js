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
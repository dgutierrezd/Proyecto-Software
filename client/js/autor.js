// al cerrar sesion se elimina el id del local storage
const cerrarSesion = () => {
    localStorage.removeItem('id');
    window.location.href="../index.html"; 
}

const verificarInformacion = () =>
{
    var nombre = document.getElementById('titulo').value;
    var descripcion = document.getElementById('descripcion').value;

    if(nombre == '' | descripcion == '')
    {
        mostrarMensaje('Debes llenar todos los campos.');
    }
    else
    {
        let archivo = document.getElementById('file');
        console.log(archivo);     
    }
}

function readURL( e ) {
           
    if ( this.files && this.files[0] ) {
       
        var reader = new FileReader();           
        reader.onload = ( function( e ) {
            $( 'img#previewWindow' ).attr( 'src' , e.target.result );
        });           
        reader.readAsDataURL( this.files[0] );
       
        myFile = this.files[0];      // store file in global variable
       
  }
   
}       

const mostrarMensaje = (mensaje) => {
    $(`#mensaje`).html(`<div class="alert alert-danger" role="alert">${mensaje}</div>`)
}

const enviarArticulo = () =>
{

}
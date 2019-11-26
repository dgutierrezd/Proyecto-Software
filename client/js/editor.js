// al cerrar sesion se elimina el id del local storage
const cerrarSesion = () => {
    localStorage.removeItem('id');
    window.location.href="../index.html"; 
}
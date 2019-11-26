const cerrarSesion = () => {
    localStorage.removeItem('id');
    window.location.href="../index.html"; 
}
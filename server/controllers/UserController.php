<?php
    include_once('../config/conexion.php');
    include_once('../models/User.php');

    Class UserController {
        public $nombre;
        public $correo;
        public $perfil;
        public $password;

        function __construct($nombre, $correo, $perfil, $password){
            $this->nombre = $nombre;
            $this->correo = $correo;
            $this->perfil = $perfil;
            $this->password = $password;
        }

        function registrar() {
            if($this->nombre != null) { 
                $conexion = new Conexion();
                $usuario = new User($this->nombre, $this->correo, $this->perfil, $this->password);
                
                $usuario->registrar($conexion);
            }
        }

        function iniciarSesion() {
            if($this->correo != null) { 
                $conexion = new Conexion();
                $usuario = new User($this->nombre, $this->correo, $this->perfil, $this->password);
                
                $usuario->iniciarSesion($conexion);
            }
        }

        function getEvaluators() {
            if($this->perfil != null) { 
                $conexion = new Conexion();
                $usuario = new User($this->nombre, $this->correo, $this->perfil, $this->password);
                
                $usuario->getEvaluators($conexion);
            }
        }
    } 

    // Crear un controlador para obtener los datos enviados desde el front
    $obj = new UserController($_REQUEST['nombre'],$_REQUEST['correo'],$_REQUEST['perfil'],$_REQUEST['password']);
    // dependiendo del metodo enviado desde el front se determina que funcion realizar
    switch ($_REQUEST['metodo']) {
        case 'registrar':
            $obj->registrar();
        break;
        case 'iniciarSesion':
            $obj->iniciarSesion();
        break;
        case 'getEvaluators':
            $obj->getEvaluators();
        break;
        default:
            print_r('hay un error');
            break;
    }

?>
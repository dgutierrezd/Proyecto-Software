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
    } 

    $obj = new UserController($_REQUEST['nombre'],$_REQUEST['correo'],$_REQUEST['perfil'],$_REQUEST['password']);
    $obj->registrar();
?>
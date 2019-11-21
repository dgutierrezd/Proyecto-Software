<?php

    class User {
        public $nombre;
        public $correo;
        public $perfil;
        public $password;

        function __construct($nombre, $correo, $perfil, $password) {
            $this->nombre = $nombre;
            $this->correo = $correo;
            $this->perfil = $perfil;
            $this->password = $password;
        }

        function registrar($connect) {
            $query = "insert into usuarios values (default,'".$this->nombre."','".$this->correo."','".$this->perfil."','".$this->password."');";
            pg_query($connect->getInfodb(), $query);
        }
    }

?>
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

        function iniciarSesion($connect) {
            $query = "select * from usuarios where correo='".$this->correo."' and password='".$this->password."'";
            $rs = pg_query($connect->getInfodb(), $query);

            // Se obtienen los datos que se obtuvieron al consultar la bd
            while ($row = pg_fetch_row($rs)) {
                print_r($row[3]." ".$row[0]);
            }
        }

        function getEvaluators($connect) {
            $query = "select * from usuarios where perfil='".$this->perfil."' and id!='0'";
            $rs = pg_query($connect->getInfodb(), $query);

            // Se obtienen los datos que se obtuvieron al consultar la bd
            while ($row = pg_fetch_array($rs)) {
                echo $row['id']."->".$row['nombre']."->".$row['correo']."*";
            }
        }
    }

?>
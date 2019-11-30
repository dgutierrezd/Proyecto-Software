<?php

    class Article {
        public $id;
        public $titulo;
        public $descripcion;
        public $autorId;
        public $estado;
        public $evaluadorId;

        function __construct($id, $titulo, $descripcion, $autorId, $estado, $evaluadorId) {
            $this->id = $id;
            $this->titulo = $titulo;
            $this->descripcion = $descripcion;
            $this->autorId = $autorId;
            $this->estado = $estado;
            $this->evaluadorId = $evaluadorId;
        }

        function agregarArticulo($connect) {
            $query = "insert into articulos values (default,'".$this->titulo."','".$this->descripcion."','".$this->autorId."','".$this->estado."','".$this->evaluadorId."')";
            print_r('llega al model');
            pg_query($connect->getInfodb(), $query);
        }

        function getArticlesAdmin($connect) {
            $query = "select articulos.id, titulo, nombre, descripcion from articulos, usuarios where estado='".$this->estado."' and evaluadorid='0' and usuarios.id=articulos.autorid ";
            $rs = pg_query($connect->getInfodb(), $query);

            // Se obtienen los datos que se obtuvieron al consultar la bd
            while ($row = pg_fetch_array($rs)) {
                echo $row['id']."->".$row['titulo']."->".$row['descripcion']."->".$row['nombre']."*";
                
            }
        }

        function setEvaluador($connect) {
            $query = "update articulos set evaluadorid='".$this->evaluadorId."' where id='".$this->id."'";
            pg_query($connect->getInfodb(), $query);
        }

        function getArticlesEvaluate($connect) {
            $query = "select articulos.id, titulo, nombre, descripcion from articulos, usuarios where evaluadorid='".$this->evaluadorId."' and usuarios.id=articulos.autorid and estado='enviado'";
            $rs = pg_query($connect->getInfodb(), $query);

            // Se obtienen los datos que se obtuvieron al consultar la bd
            while ($row = pg_fetch_array($rs)) {
                echo $row['id']."->".$row['titulo']."->".$row['descripcion']."->".$row['nombre']."*";
            }
        }

        function getNombreAutor($connect) {
            $query = "select nombre from usuarios where id='".$this->autorId."'";
            $rs = pg_query($connect->getInfodb(), $query);

            while($row = pg_fetch_array($rs)) {
                echo($row['nombre']);
            }
        }

        function evaluarArticulo($connect) {
            $query = "update articulos set estado='".$this->estado."' where id='".$this->id."'";
            pg_query($connect->getInfodb(), $query);
        }

        function getArticlesAutor($connect) {
            $query = "select * from articulos where autorid='".$this->autorId."'";
            $rs = pg_query($connect->getInfodb(), $query);

            // Se obtienen los datos que se obtuvieron al consultar la bd
            while ($row = pg_fetch_array($rs)) {
                echo $row['id']."->".$row['titulo']."->".$row['descripcion']."->".$row['estado']."*";
            }
        }

        function getArticles($connect) {
            $query = "select articulos.id, titulo, nombre from articulos, usuarios where usuarios.id=articulos.autorid and estado='".$this->estado."'";
            $rs = pg_query($connect->getInfodb(), $query);

            // Se obtienen los datos que se obtuvieron al consultar la bd
            while ($row = pg_fetch_array($rs)) {
                echo $row['id']."->".$row['titulo']."->".$row['nombre']."*";
            }
        }
    }

?>
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
            $query = "select * from articulos where estado='".$this->estado."' and evaluadorid='0' ";
            $rs = pg_query($connect->getInfodb(), $query);

            // Se obtienen los datos que se obtuvieron al consultar la bd
            while ($row = pg_fetch_array($rs)) {
                echo $row['id']."->".$row['titulo']."->".$row['descripcion']."->".$row['autorid']."*";
            }
        }

        function setEvaluador($connect) {
            $query = "update articulos set evaluadorid='".$this->evaluadorId."' where id='".$this->id."'";
            pg_query($connect->getInfodb(), $query);
        }
    }

?>
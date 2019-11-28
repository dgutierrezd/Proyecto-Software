<?php
    include_once('../config/conexion.php');
    include_once('../models/Article.php');

    class ArticleController {
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

        function agregarArticulo() {
            if($this->titulo != null) { 
                $conexion = new Conexion();
                $articulo = new Article($this->id, $this->titulo, $this->descripcion, $this->autorId, $this->estado, $this->evaluadorId);
                
                $articulo->agregarArticulo($conexion);
            }
        }

        function getArticlesAdmin() {
            if($this->estado != null) { 
                $conexion = new Conexion();
                $articulo = new Article($this->id, $this->titulo, $this->descripcion, $this->autorId, $this->estado, $this->evaluadorId);
                
                $articulo->getArticlesAdmin($conexion);
            }
        }

        function setEvaluador() {
            if($this->id != null) { 
                $conexion = new Conexion();
                $articulo = new Article($this->id, $this->titulo, $this->descripcion, $this->autorId, $this->estado, $this->evaluadorId);
                
                $articulo->setEvaluador($conexion);
            }
        }
    } 

    // Crear un controlador para obtener los datos enviados desde el front
    $obj = new ArticleController($_REQUEST['id'],$_REQUEST['titulo'],$_REQUEST['descripcion'],$_REQUEST['autorId'],$_REQUEST['estado'],$_REQUEST['evaluadorId']);
    // dependiendo del metodo enviado desde el front se determina que funcion realizar
    switch ($_REQUEST['metodo']) {
        case 'agregarArticulo':
            $obj->agregarArticulo();
        break;
        case 'getArticlesAdmin':
            $obj->getArticlesAdmin();
        break;
        case 'setEvaluador':
            $obj->setEvaluador();
        break;
        default:
            print_r('hay un error');
            break;
    }

?>
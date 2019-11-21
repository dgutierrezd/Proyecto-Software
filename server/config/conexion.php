<?php

    class Conexion {
        private $info_db;

        function __construct() {
            $this->info_db = pg_connect('host=localhost dbname=universidad port=5432 user=universidad password=123456');

            if($this->info_db == null) {
                echo json_encode('Hubo un error');
            }
        }

        public function getInfodb() {
            return $this->info_db;
        }
    }

?>
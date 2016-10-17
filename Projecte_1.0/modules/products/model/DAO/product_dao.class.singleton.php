<?php
class productDAO {

    static $_instance;

    private function __construct() {
        
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }

    public function create_product_DAO($db, $arrArgument) {
        $id_prod = $arrArgument['id_prod'];
        $prod_name = $arrArgument['prod_name'];
        $price = $arrArgument['price'];
        $dis_date = $arrArgument['dis_date'];
        $exp_date = $arrArgument['exp_date'];
        $status = $arrArgument['status'];
        $avatar = $arrArgument['avatar'];

        // foreach ($interests as $indice) {
        //     if ($indice === 'History')
        //         $history = 1;
        //     if ($indice === 'Music')
        //         $music = 1;
        //     if ($indice === 'Computing')
        //         $computing = 1;
        //     if ($indice === 'Magic')
        //         $magic = 1;
        // }

        $sql = "INSERT INTO products (id_prod, prod_name, price, dis_date,"
                . " exp_date, status, avatar"
                . " ) VALUES ('$id_prod', '$prod_name', '$price',"
                . " '$dis_date', '$exp_date', '$status', '$avatar')";

        return $db->ejecutar($sql);
    }

}

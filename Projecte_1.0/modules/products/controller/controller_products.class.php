<?php
session_start();
//include  with absolute route
include ($_SERVER['DOCUMENT_ROOT'] . "/Projecte_1.0/modules/products/utils/functions_products.inc.php");
include ($_SERVER['DOCUMENT_ROOT'] . "/Projecte_1.0/utils/upload.php");
include ($_SERVER['DOCUMENT_ROOT'] . "/Projecte_1.0/utils/common.inc.php");



if ((isset($_GET["upload"])) && ($_GET["upload"] == true)) {
	
    $result_avatar = upload_files();
    $_SESSION['result_avatar'] = $result_avatar;
    // echo json_encode($result_avatar);
    // exit;
}

if ((isset($_POST['alta_products_json']))) {

    alta_products();
}

function alta_products() {
    $jsondata = array();
    $productsJSON = json_decode($_POST["alta_products_json"], true);
    
    $result = validate_products($productsJSON);
    
    if (empty($_SESSION['result_avatar'])) {
        $_SESSION['result_avatar'] = array('resultado' => true, 'error' => "", 'datos' => 'media/default-avatar.jpg');
    }

    $result_avatar = $_SESSION['result_avatar'];


    if (($result['resultado']) && ($result_avatar['resultado'])) {
        $arrArgument = array(
            'id_prod' => ucfirst($result['datos']['id_prod']),
            'prod_name' => ucfirst($result['datos']['prod_name']),
            'price' => $result['datos']['price'],
            'dis_date' => $result['datos']['dis_date'],
            'exp_date' => $result['datos']['exp_date'],
            'status' => $result['datos']['status'],
            'avatar' => $result_avatar['datos']
        );

        /////////////////insert into BD////////////////////////
        $arrValue = false;
        $path_model = $_SERVER['DOCUMENT_ROOT'] . '/Projecte_1.0/modules/products/model/model/';
        $arrValue = loadModel($path_model, "product_model", "create_product", $arrArgument);
        //echo json_encode($arrValue);
        //die();

        if ($arrValue)
            $mensaje = "Su registro se ha efectuado correctamente, para finalizar compruebe que ha recibido un correo de validacion y siga sus instrucciones";
        else
            $mensaje = "No se ha podido realizar su alta. Intentelo mas tarde";

        //redirigir a otra p�gina con los datos de $arrArgument y $mensaje
        $_SESSION['products'] = $arrArgument;
        $_SESSION['msje'] = $mensaje;
        $callback = "index.php?module=products&view=results_products";
        $jsondata["success"] = true;
        $jsondata["redirect"] = $callback;
        
        echo json_encode($jsondata);
        exit;
    } else {
        //$error = $result['error'];
        //$error_avatar = $result_avatar['error'];
        $jsondata["success"] = false;
        $jsondata["error"] = $result['error'];
        $jsondata["error_avatar"] = $result_avatar['error'];
        $jsondata["success1"] = false;
        
        if ($result_avatar['resultado']) {
            $jsondata["success1"] = true;
            $jsondata["img_avatar"] = $result_avatar['datos'];
        }
        header('HTTP/1.0 400 Bad error');
        echo json_encode($jsondata);
        //exit;
    }
}



if (isset($_GET["delete"]) && $_GET["delete"] == true) {
    $_SESSION['result_avatar'] = array();
    $result = remove_files();
    if ($result === true) {
        echo json_encode(array("res" => true));
    } else {
        echo json_encode(array("res" => false));
    }
    // echo json_encode($result);
    // exit;
}

//////////////////////////////////////////////////////////////// load
if (isset($_GET["load"]) && $_GET["load"] == true) {
    $jsondata = array();
    if (isset($_SESSION['products'])) {
        $jsondata["products"] = $_SESSION['products'];
    }
    if (isset($_SESSION['msje'])) {
        //echo $_SESSION['msje'];
        $jsondata["msje"] = $_SESSION['msje'];
    }
    close_session();
    echo json_encode($jsondata);
    exit;
}

function close_session() {
    unset($_SESSION['products']);
    unset($_SESSION['msje']);
    $_SESSION = array(); // Destruye todas las variables de la sesión
    session_destroy(); // Destruye la sesión
}

/////////////////////////////////////////////////// load_data
if ((isset($_GET["load_data"])) && ($_GET["load_data"] == true)) {
    $jsondata = array();

    if (isset($_SESSION['products'])) {
        $jsondata["products"] = $_SESSION['products'];
        echo json_encode($jsondata);
        exit;
    } else {
        $jsondata["products"] = "";
        echo json_encode($jsondata);
        exit;
    }
}
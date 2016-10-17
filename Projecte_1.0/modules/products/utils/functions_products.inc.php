<?php

function validate_products($value) {
	$error = array();
	$valido = true;
	$filtro = array(
		'id_prod' => array(
			'filter' => FILTER_VALIDATE_REGEXP,
			'options' => array('regexp' => '/^[0-9]{8}$/')
		),
		'prod_name' => array(
			'filter' => FILTER_VALIDATE_REGEXP,
			'options' => array('regexp' => '/^[A-Za-z]{2,30}$/')
		),
		'price' => array(
			'filter' => FILTER_VALIDATE_REGEXP,
			'options' => array('regexp' => '/^[0-9]+$/')
		),
		'dis_date' => array(
			'filter' => FILTER_VALIDATE_REGEXP,
			'options' => array('regexp' => '/^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d$/')
		),
		'exp_date' => array(
			'filter' => FILTER_VALIDATE_REGEXP,
			'options' => array('regexp' => '/^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d$/')
			),
	);
	$resultado = filter_var_array($value, $filtro);
	
	//No filter
	$resultado['status'] = $value['status'];
	
	
	if ($resultado['dis_date']) {
		//validate to user's after current date
		$dates = validateDischarge($value['dis_date']);
		//return $dates;
		if (!$dates) {
			$error['dis_date'] = 'The product discharge date must occur after the current date';
			$valido = false;
		}
	}
	
	if ($resultado['dis_date'] && $resultado['exp_date']) {
		//compare date of birth with title_date
		$dates = valida_dates($value['dis_date'], $value['exp_date']);

		if (!$dates) {
			$error['dis_date'] = 'Discharge date must be after the expire date.';
			$valido = false;
		}
	}
	
	if ($resultado != null && $resultado) {

		if (!$resultado['id_prod']) {
			$error['id_prod'] = 'Product ID should have 8 numbers';
			$valido = false;
		}
		if (!$resultado['prod_name']) {
			$error['prod_name'] = 'Product name should have between 2 or 20 lettes.';
			$valido = false;
		}
		if (!$resultado['price']) {
			$error['price'] = 'Product price should have only numbers.';
			$valido = false;
		}
		if (!$resultado['dis_date']) {
			if ($value['dis_date'] == "") {
				$error['dis_date'] = "This camp can't empty";
				$valido = false;
			} else {
				$error['dis_date'] = 'Error format date (mm/dd/yyyy)';
				$valido = false;
			}
		}

		if (!$resultado['exp_date']) {
			if ($value['exp_date'] == "") {
				$error['exp_date'] = "This camp can't empty";
				$valido = false;
			} else {
				$error['exp_date'] = 'Error format date (mm/dd/yyyy)';
				$valido = false;
			}
		}
	}else{
	    $valido = false;
	};
	return $return = array('resultado' => $valido, 'error' => $error, 'datos' => $resultado);
}

	function valida_dates($start_days, $dayslight) {
	
	    $start_day = date("d/m/Y", strtotime($start_days));
	    $daylight = date("d/m/Y", strtotime($dayslight));
	
	    list($dia_one, $mes_one, $anio_one) = split('/', $start_day);
	    list($dia_two, $mes_two, $anio_two) = split('/', $daylight);
	
	    $dateOne = new DateTime($anio_one . "-" . $mes_one . "-" . $dia_one);
	    $dateTwo = new DateTime($anio_two . "-" . $mes_two . "-" . $dia_two);
	
	    if ($dateOne <= $dateTwo) {
	        return true;
	    }
	    return false;
	}


	// validate discharge date
	function validateDischarge ($discharge) {
		$date_today = date("d-m-Y");
    	
		if (is_string($date_today)) {
			$date_today = strtotime($date_today);
		}
	
		if (is_string($discharge)) {
			$discharge = strtotime($discharge);
		}
		//return $date_today ;
		if ( $discharge > $date_today ) {
			return false;
		}
	
		return true;
	}
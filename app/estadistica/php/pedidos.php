<?php 
	include '../../../config/config.php';
	include "../../../config/conect.php";
	$conect = new CONEXION();
	mysql_set_charset('utf8');

	$datos = array();
	$meses = [1 =>'Enero',2=>'Febrero',3=>'Marzo',4=>'Abril',5=>'Mayo',6=>'Junio',7=>'Julio',8=>'Agosto',9=>'Septiembre',10=>'Octubre',11=>'Noviembre',12=>'Diciembre'];

	$ind = date("n");

	for ($i=0; $i < 6; $i++) 
	{ 
		$datos[$i] = array(
			'mes' => $meses[$ind],
			'cantidad' => getMes($ind)
		);
		$ind--;
		if($ind == 0)
		{
			$ind = 12;
		}
	}
	
	$send = json_encode(array_reverse($datos));
	echo $send;	

	function getMes($mes)
	{
		$resultado = mysql_query("SELECT COUNT(*) AS cantidad FROM pedidos WHERE MONTH(fecha) = $mes");
		$resultado = mysql_fetch_object($resultado);
		return $resultado->cantidad;
	}
 ?>
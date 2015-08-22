<?php 

	include '../../../config/config.php';
	include "../../../config/conect.php";
	$conect = new CONEXION();
	mysql_set_charset('utf8');

	$datos = array();

	$peticion = "SELECT * FROM top_pedidos";

	$sql = mysql_query($peticion);
		$i = 0;
		while($fila = mysql_fetch_array($sql))
		{
			$datos[$i] = array(
				'id_producto' => $fila['id_producto'],
				'nombre' => $fila['nombre'],
				'concurrencia' => $fila['concurrencia']
				);
			$i++;
		}
		$send = json_encode($datos);
		echo $send;	
	
 ?>
<?php 
	
	include '../../../../config/config.php';
	include "../../../../config/conect.php";
	$conect = new CONEXION();
	mysql_set_charset('utf8');


	switch($_SERVER["REQUEST_METHOD"])
	{
		case 'GET':
			Get();
		break;
	}

	function Get()
	{
		$datos = array();

		$peticion = "SELECT * FROM listapedidos";

		$sql = mysql_query($peticion);
		$i = 0;
		while($fila = mysql_fetch_array($sql))
		{
			$datos[$i] = array(
				'id' => $fila['id'],
				'nombre' => $fila['nombre'],
				'direccion' => $fila['direccion'],
				'fecha' => $fila['fecha'],
				'hora' => $fila['hora']
				);
			$i++;
		}
		$send = json_encode($datos);
		echo $send;	
	}
 ?>
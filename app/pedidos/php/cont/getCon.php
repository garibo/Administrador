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

		$partes=parse_url($_SERVER["REQUEST_URI"]);
		$parametro=explode('/', $partes['path'])[7];

		$peticion = "SELECT 

		CONCAT(clientes.nombre,' ',clientes.apellido_paterno,' ',clientes.apellido_materno) AS cliente,
		CONCAT(direcciones.calle,' #',direcciones.numero,', ',direcciones.colonia) AS direccion,
		clientes.correo, 
		pedidos.id 

		FROM pedidos 

		LEFT JOIN  clientes ON pedidos.id_cliente = clientes.id
		LEFT JOIN direcciones ON pedidos.id_direccion = direcciones.id

		WHERE pedidos.id = $parametro";

		$sql = mysql_query($peticion);
		$i = 0;
		while($fila = mysql_fetch_array($sql))
		{
			$datos[$i] = array(
				'id' => $fila['id'],
				'cliente' => $fila['cliente'],
				'direccion' => $fila['direccion'],
				'correo' => $fila['correo']
				);
			$i++;
		}
		$send = json_encode($datos);
		echo $send;	
	}
 ?>
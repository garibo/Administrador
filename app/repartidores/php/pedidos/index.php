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
		$parametro=explode('/', $partes['path'])[6];

		$peticion = "SELECT * FROM pedidos_repartidores";
		$peticion.= $parametro == "" ? "" : " WHERE idrepartidor = $parametro";

		$sql = mysql_query($peticion);
		$i = 0;
		while($fila = mysql_fetch_array($sql))
		{
			$datos[$i] = array(
				'id' => $fila['id'],
				'nombre' => $fila['nombre'],
				'direccion' => $fila['direccion'],
				'fecha' => $fila['fecha'],
				'visto' => $fila['visto'],
				'hora' => $fila['hora']
				);
			$i++;
		}
		$send = json_encode($datos);
		echo $send;	
	}
 ?>
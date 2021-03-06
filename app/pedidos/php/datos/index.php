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

		$peticion = "SELECT 

		clientes.nombre AS cliente,

		direcciones.calle, 
		direcciones.colonia, 
		direcciones.numero, 
		direcciones.entre_calles, 
		direcciones.extra,
		CONCAT(direcciones.calle,' #',direcciones.numero,', ',direcciones.colonia) AS direccion,

		repartidores.id as repartidor_id,
		telefonos.telefono,

		pedidos.hora,
		pedidos.fecha,
		pedidos.latitud,
		pedidos.longitud,
		pedidos.eliminado,
		pedidos.id

		FROM pedidos 

		LEFT JOIN  clientes ON pedidos.id_cliente = clientes.id
		LEFT JOIN direcciones ON pedidos.id_direccion = direcciones.id
		LEFT JOIN repartidores ON pedidos.id_repartidor = repartidores.id
		LEFT JOIN telefonos ON pedidos.id_telefono = telefonos.id 

		WHERE pedidos.id = $parametro";

		$sql = mysql_query($peticion);
		$i = 0;
		while($fila = mysql_fetch_array($sql))
		{
			$datos[$i] = array(
				'id' => $fila['id'],
				'cliente' => $fila['cliente'],
				'calle' => $fila['calle'],
				'colonia' => $fila['colonia'],
				'numero' => $fila['numero'],
				'entre_calles' => $fila['entre_calles'],
				'extra' => $fila['extra'],
				'direccion' => $fila['direccion'],
				'repartidor_id' => $fila['repartidor_id'],
				'telefono' => $fila['telefono'],
				'hora' => $fila['hora'],
				'fecha' => $fila['fecha'],
				'latitud' => $fila['latitud'],
				'longitud' => $fila['longitud'],
				'eliminado' => $fila['eliminado']
				);
			$i++;
		}
		$send = json_encode($datos);
		echo $send;	
	}
 ?>
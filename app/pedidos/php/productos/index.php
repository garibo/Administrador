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

		productos.nombre,
		productos.ingredientes,
		productos.tamano,
		productos.precio,
		pedidos_linea.cantidad

		FROM pedidos_linea

		INNER JOIN productos

		ON pedidos_linea.id_producto = productos.id

		WHERE pedidos_linea.id_pedido = $parametro";

		$sql = mysql_query($peticion);
		$i = 0;
		while($fila = mysql_fetch_array($sql))
		{
			$datos[$i] = array(
				'nombre' => $fila['nombre'],
				'ingredientes' => $fila['ingredientes'],
				'tamano' => $fila['tamano'],
				'precio' => $fila['precio'],
				'cantidad' => $fila['cantidad'],
				'total' => ($fila['precio'] * $fila['cantidad'])
				);
			$i++;
		}
		$send = json_encode($datos);
		echo $send;	
	}
 ?>
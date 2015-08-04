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
		productos.precio,
		precios_pizzas.precio AS precio_pizza,
		precios_pizzas.nombre AS nombre_tamano,
		pedidos_linea.cantidad

		FROM pedidos_linea

		LEFT JOIN precios_pizzas
		ON precios_pizzas.id = pedidos_linea.tamano

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
				'precio' => $fila['precio'],
				'precio_pizza' => $fila['precio_pizza'],
				'nombre_tamano' => $fila['nombre_tamano'],
				'cantidad' => $fila['cantidad']
				);
			$i++;
		}
		$send = json_encode($datos);
		echo $send;	
	}
 ?>
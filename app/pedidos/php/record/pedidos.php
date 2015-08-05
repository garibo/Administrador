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


		$peticion = " SELECT 
		pedidos.id,
		pedidos.fecha,
		pedidos.hora,
		pedidos.estado_pedido
		FROM pedidos

		WHERE pedidos.id_cliente =  $parametro";

		$sql = mysql_query($peticion);
		$i = 0;
		while($fila = mysql_fetch_array($sql))
		{
			$datos[$i] = array(
				'id' => $fila['id'],
				'fecha' => $fila['fecha'],
				'hora' => $fila['hora'],
				'estado_pedido' => $fila['estado_pedido'],
				'productos' => getPedidos($fila['id'])
				);
			$i++;
		}

		$send = json_encode($datos);
		echo $send;	

	}


	function getPedidos($idPedido)
	{
		$productos = array();

		$peticionp = "SELECT 

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

		WHERE pedidos_linea.id_pedido = $idPedido";

		$sql = mysql_query($peticionp);
		$i = 0;
		while($fila = mysql_fetch_array($sql))
		{
			$productos[$i] = array(
				'nombre' => $fila['nombre'],
				'ingredientes' => $fila['ingredientes'],
				'precio' => $fila['precio'],
				'precio_pizza' => $fila['precio_pizza'],
				'nombre_tamano' => $fila['nombre_tamano'],
				'cantidad' => $fila['cantidad']
				);
			$i++;
		}

		return $productos;

	}
	
	
 ?>
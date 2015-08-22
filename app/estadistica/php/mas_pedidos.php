<?php 

	include '../../../config/config.php';
	include "../../../config/conect.php";
	$conect = new CONEXION();
	mysql_set_charset('utf8');

	$datos = array();

	$resultado1 = mysql_fetch_object(mysql_query("SELECT COUNT(*) AS total_pizzas FROM productos_pedidos WHERE tipo = 'pizza'"));
	$resultado2 = mysql_fetch_object(mysql_query("SELECT COUNT(*) AS total_otros FROM productos_pedidos WHERE tipo = 'otros'"));
	$resultado3 = mysql_fetch_object(mysql_query("SELECT COUNT(*) AS total_refrescos FROM productos_pedidos WHERE tipo = 'refresco'"));

	$datos[0] = array(
	'total_pizzas' => $resultado1->total_pizzas,
	'total_otros' => $resultado2->total_otros,
	'total_refrescos' => $resultado3->total_refrescos
	);

	echo json_encode($datos);

 ?>
<?php 
	
	include '../../../../config/config.php';
	include "../../../../config/conect.php";
	$conect = new CONEXION();
	mysql_set_charset('utf8');

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	@$id = $request->id;
	@$id_repartidor = $request->id_repartidor;


	$sql = "UPDATE pedidos SET id_repartidor = $id_repartidor WHERE id = $id";
	mysql_query($sql);


 ?>
<?php 
	
	include '../../../../config/config.php';
	include "../../../../config/conect.php";
	$conect = new CONEXION();
	mysql_set_charset('utf8');

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	@$id = $request->id;
	@$importante = $request->importante;

	$importante = $importante == 0 ? 1 : 0; 

	$sql = "UPDATE pedidos SET importante = $importante WHERE id = $id";
	mysql_query($sql);


 ?>
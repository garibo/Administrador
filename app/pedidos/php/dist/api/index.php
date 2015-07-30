<?php 
	header("Access-Control-Allow-Orgin: *");
	header("Access-Control-Allow-Methods: *");
	header("Access-Control-Allow-Headers: *");
	header("Content-Type: application/json");
	include '../../../../../config/config.php';
	include "../../../../../config/conect.php";
	$conect = new CONEXION();
	mysql_set_charset('utf8');

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	@$calle = $request->calle;
	@$colonia = $request->colonia;
	


	$peticion = "INSERT INTO coordenadas(latitud, longitud) VALUES ('$calle','$colonia')";
	mysql_query($peticion);


 ?>
<?php 
	header("Access-Control-Allow-Orgin: *");
	header("Access-Control-Allow-Methods: *");
	header("Content-Type: application/json");
	include '../../../../../config/config.php';
	include "../../../../../config/conect.php";
	$conect = new CONEXION();
	mysql_set_charset('utf8');

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);


	@$calle = $request->calle;
	@$Colonia = $request->Colonia;
	// // @$numero = $request->numero;
	// // @$informacion = $request->informacion;
	// // @$entre = $request->entre;
	// // @$telefono = $request->telefono;
	// // @$productos = $request->productos;
	// @$latitud = $request->latitud;
	// @$longitud = $request->longitud;
	



	$peticion = "INSERT INTO coordenadas(latitud, longitud) VALUES ('$calle','$Colonia')";
	mysql_query($peticion);


 ?>
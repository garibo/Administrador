<?php 
	header("Access-Control-Allow-Orgin: *");
	header("Access-Control-Allow-Methods: *");
	header("Content-Type: application/json");

	include '../../../../config/config.php';
	include "../../../../config/conect.php";
	$conect = new CONEXION();
	mysql_set_charset('utf8');

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	@$nombre = $request->nombre;

	switch($_SERVER["REQUEST_METHOD"])
	{
		case 'POST':
			Post($nombre);
		break;

		case 'GET':
			Get();
		break;

	}

	function Get()
	{
		$resultado = mysql_query("SELECT nombre from usuarios WHERE id = 1");
		$resultado = mysql_fetch_object($resultado);
		$respuesta[0] = array(
		'nombre' => $resultado->nombre
		);
		$send = json_encode($respuesta[0]);
		echo $send;
	}

	function Post($nombre)
	{
		$resultado = mysql_query("UPDATE usuarios SET nombre = '$nombre'");
		if($resultado)
		{
			$respuesta[0] = array(
			'respuesta' => "bien"
			);
			$send = json_encode($respuesta[0]);
			echo $send;
		}
		else
		{
			$respuesta[0] = array(
			'respuesta' => "mal"
			);
			$send = json_encode($respuesta[0]);
			echo $send;
		}
	}
?>
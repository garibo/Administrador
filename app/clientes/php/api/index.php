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
	@$id  = $request->id;
	@$nombre = $request->nombre;
	@$apellido_paterno = $request->apellido_paterno;
	@$apellido_materno = $request->apellido_materno;

	switch($_SERVER["REQUEST_METHOD"])
	{
		case 'GET':
			Get();
		break;

		case 'POST':
			Post($nombre, $apellido_paterno, $apellido_materno);
		break;

		case 'PUT':
			Put($nombre, $apellido_paterno, $apellido_materno);
		break;

		case 'DELETE':
			Delete();
		break;
	}

	function Get()
	{
		$datos = array();

		$partes=parse_url($_SERVER["REQUEST_URI"]);
		$parametro=explode('/', $partes['path'])[6];

		$peticion = "SELECT * FROM clientes";
		$peticion.= $parametro == "" ? "" : " WHERE id = $parametro";

		$sql = mysql_query($peticion);
		$i = 0;
		while($fila = mysql_fetch_array($sql))
		{
			$datos[$i] = array(
				'id' => $fila['id'],
				'nombre' => $fila['nombre'],
				'apellido_paterno' => $fila['apellido_paterno'],
				'apellido_materno' => $fila['apellido_materno'],
				);
			$i++;
		}
		$send = json_encode($datos);
		echo $send;	
	}

	function Post($nombre, $apellido_paterno, $apellido_materno)
	{
		$peticion = "INSERT INTO clientes(nombre, apellido_paterno, apellido_materno) VALUES ('$nombre', '$apellido_paterno', '$apellido_materno')";
		mysql_query($peticion);
	}

	function Put($nombre, $apellido_paterno, $apellido_materno)
	{
		$partes = parse_url($_SERVER["REQUEST_URI"]);
		$id = explode('/', $partes['path'])[6];

		$peticion = "UPDATE clientes SET nombre='$nombre',apellido_paterno='$apellido_paterno',apellido_materno='$apellido_materno' WHERE id = $id";
		mysql_query($peticion);
	}

	function Delete()
	{
		$partes = parse_url($_SERVER["REQUEST_URI"]);
		$id = explode('/', $partes['path'])[6];

		$peticion = "DELETE FROM clientes WHERE id = $id";
		mysql_query($peticion);
	}
 ?>
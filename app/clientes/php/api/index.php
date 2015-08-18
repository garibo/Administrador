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
	@$correo = $request->correo;

	switch($_SERVER["REQUEST_METHOD"])
	{
		case 'GET':
			Get();
		break;

		case 'POST':
			Post($nombre, $correo);
		break;

		case 'PUT':
			Put($nombre, $correo);
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
				'correo' => $fila['correo']
				);
			$i++;
		}
		$send = json_encode($datos);
		echo $send;	
	}

	function Post($nombre, $correo)
	{
		$peticion = "INSERT INTO clientes(nombre, correo) VALUES ('$nombre', '$correo')";
		mysql_query($peticion);
	}

	function Put($nombre, $correo)
	{
		$partes = parse_url($_SERVER["REQUEST_URI"]);
		$id = explode('/', $partes['path'])[6];

		$peticion = "UPDATE clientes SET nombre='$nombre' ,correo='$correo' WHERE id = $id";
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
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
	@$id  = $request->id;
	@$nombre = $request->nombre;
	@$precio = $request->precio;

	switch($_SERVER["REQUEST_METHOD"])
	{
		case 'GET':
			Get();
		break;

		case 'PUT':
			Put($id, $nombre, $precio);
		break;

	}

	function Get()
	{
		$datos = array();

		$peticion = "SELECT * FROM precios_pizzas";

		$sql = mysql_query($peticion);
		$i = 0;
		while($fila = mysql_fetch_array($sql))
		{
			$datos[$i] = array(
				'id' => $fila['id'],
				'nombre' => $fila['nombre'],
				'precio' => $fila['precio']
				);
			$i++;
		}
		$send = json_encode($datos);
		echo $send;	
	}

	function Put($id, $nombre, $precio)
	{
		// $partes = parse_url($_SERVER["REQUEST_URI"]);
		// $id = explode('/', $partes['path'])[7];

		$peticion = "UPDATE precios_pizzas SET precio = $precio WHERE id = $id";
		mysql_query($peticion);
	}
 ?>
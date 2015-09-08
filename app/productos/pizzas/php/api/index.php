<?php 
	header("Access-Control-Allow-Orgin: *");
	header("Access-Control-Allow-Methods: *");
	header("Content-Type: application/json");

	include "../../../../../config/config.php";
	include "../../../../../config/conect.php";
	$conect = new CONEXION();
	mysql_set_charset('utf8');

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	@$id  = $request->id;
	@$nombre = $request->nombre;
	@$descripcion = $request->descripcion;
	@$precio = $request->precio;
	@$ingredientes = $request->ingredientes;
	@$tamano = $request->tamano;
	@$tipo = $request->tipo;
	@$imagen_url = $request->imagen_url;
	@$metodo = $request->metodo;

	switch($_SERVER["REQUEST_METHOD"])
	{
		case 'GET':
			Get();
		break;

		case 'POST':
			switch ($metodo) {
				case 'update':
					Put($nombre, $descripcion, $precio, $ingredientes, $tamano, $tipo, $imagen_url);
				break;

				case 'delete':
					Delete();
				break;
				
				default:
					Post($nombre, $descripcion, $precio, $ingredientes, $tamano, $tipo, $imagen_url);
				break;
			}
		break;
	}

	function Get()
	{
		$datos = array();

		$partes=parse_url($_SERVER["REQUEST_URI"]);
		$parametro=explode('/', $partes['path'])[7];

		$peticion = "SELECT * FROM productos WHERE";
		$peticion.= $parametro == "" ? "" : " id = $parametro AND ";
		$peticion.= " tipo = 'pizza'";

		$sql = mysql_query($peticion);
		$i = 0;
		while($fila = mysql_fetch_array($sql))
		{
			$datos[$i] = array(
				'id' => $fila['id'],
				'nombre' => $fila['nombre'],
				'descripcion' => $fila['descripcion'],
				'precio' => $fila['precio'],
				'ingredientes' => $fila['ingredientes'],
				'tamano' => $fila['tamano'],
				'tipo' => $fila['tipo'],
				'imagen_url' => $fila['imagen_url']
				);
			$i++;
		}
		$send = json_encode($datos);
		echo $send;	
	}

	function Post($nombre, $descripcion, $precio, $ingredientes, $tamano, $tipo, $imagen_url)
	{
		$peticion = "INSERT INTO productos(nombre, descripcion, precio, ingredientes, tamano, tipo, imagen_url) VALUES ('$nombre', '$descripcion', $precio, '$ingredientes', '$tamano', '$tipo', '$imagen_url')";
		mysql_query($peticion);
	}

	function Put($nombre, $descripcion, $precio, $ingredientes, $tamano, $tipo, $imagen_url)
	{
		$partes = parse_url($_SERVER["REQUEST_URI"]);
		$id = explode('/', $partes['path'])[7];

		$peticion = "UPDATE productos SET nombre='$nombre',descripcion='$descripcion', precio=$precio, ingredientes='$ingredientes', tamano='$tamano', tipo='$tipo', imagen_url='$imagen_url'  WHERE id = $id";
		mysql_query($peticion);
	}

	function Delete()
	{
		$partes = parse_url($_SERVER["REQUEST_URI"]);
		$id = explode('/', $partes['path'])[7];

		$peticion = "DELETE FROM productos WHERE id = $id";
		mysql_query($peticion);
	}
 ?>
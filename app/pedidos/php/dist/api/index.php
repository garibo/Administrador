<?php 
	header("Access-Control-Allow-Orgin: *");
	header("Access-Control-Allow-Methods: *");
	header("Content-Type: application/json");

	include '../../../../../config/config.php';
	include "../../../../../config/conect.php";

	$conect = new CONEXION();
	mysql_set_charset('utf8');
	$respuesta = array();
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	@$id_cliente = $request->id_cliente;
	@$id_direccion = $request->id_direccion;
	@$id_telefono = $request->id_telefono;
	@$latitud = $request->latitud;
	@$longitud = $request->longitud;
	@$telefono = $request->telefono;
	@$productos = json_encode($request->productos);
	$productos = json_decode($productos, true);
	@$direccion = json_encode($request->direccion);
	$direccion = json_decode($direccion, true);

	function idDireccion($direccion)
	{
		$sql = "INSERT INTO direcciones (calle, colonia, numero, entre_calles, extra)
				VALUES ('".$direccion['calle']."', '".$direccion['colonia']."', ".$direccion['numero'].", '".$direccion['entre']."', '".$direccion['informacion']."')";	
		mysql_query($sql);
		return mysql_insert_id();
	}

	function idTelefono($telefono)
	{
		$sql = "INSERT INTO telefonos (telefono) VALUES ($telefono)";
		mysql_query($sql);
		return mysql_insert_id();
	}


	$queryPedidos = "INSERT INTO pedidos (id_cliente, id_direccion, id_telefono, fecha, hora, latitud, longitud)
	VALUES ($id_cliente, ".idDireccion($direccion).", ".idTelefono($telefono).", NOW(), NOW(), $latitud, $longitud) ";

	$resultPedidos = mysql_query($queryPedidos);



	if (!$resultPedidos) {
     // mysql_error();
     $respuesta[0] = array(
		'respuesta' => "mal"
	);
	$send = json_encode($respuesta[0]);
	echo $send;
   } 
   else{
   	$id_pedido = mysql_insert_id();
   	$queryPedidosLinea = "";
   	for ($i = 0; $i < count($productos); $i++){ 
   		$tamano = $productos[$i]['tamano'] < 1 || $productos[$i]['tamano'] > 6 ? 0 : $productos[$i]['tamano'];
   		mysql_query("INSERT INTO pedidos_linea (id_producto, id_pedido, cantidad, tamano) VALUES (".$productos[$i]['id_producto'].", $id_pedido, 1, $tamano)");
   	}

   	$respuesta[0] = array(
	'respuesta' => "bien"
	);
	$send = json_encode($respuesta[0]);
	echo $send;

   }
   	
	
 ?>
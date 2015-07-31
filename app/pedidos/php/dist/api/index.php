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

	@$id_cliente = $request->id_cliente;
	@$id_direccion = $request->id_direccion;
	@$id_telefono = $request->id_telefono;
	@$latitud = $request->latitud;
	@$longitud = $request->longitud;
	@$productos = json_encode($request->productos);
	$productos = json_decode($productos, true);


	$queryPedidos = "INSERT INTO pedidos (id_cliente, id_direccion, id_telefono, fecha, hora, latitud, longitud)
	VALUES ($id_cliente, $id_direccion, $id_telefono, NOW(), NOW(), $latitud, $longitud) ";

	$resultPedidos = mysql_query($queryPedidos);



	if (!$resultPedidos) {
     mysql_error();
   } 
   else{
   	$id_pedido = mysql_insert_id();
   	$queryPedidosLinea = "";
   	for ($i = 0; $i < count($productos); $i++){ 
   		mysql_query("INSERT INTO pedidos_linea (id_producto, id_pedido, cantidad) VALUES (".$productos[$i]['id_producto'].", $id_pedido, 1)");
   	}

   }
	

 ?>
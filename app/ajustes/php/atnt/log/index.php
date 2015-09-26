<?php 
	session_start();
	header("Access-Control-Allow-Orgin: *");
	header("Access-Control-Allow-Methods: *");
	header("Content-Type: application/json");

	include '../../../../../config/config.php';
	include "../../../../../config/conect.php";
	$conect = new CONEXION();
	mysql_set_charset('utf8');

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	@$email = $request->email;
	@$contra = $request->contra;
	@$recuerdame = $request->recuerdame;

	switch($_SERVER["REQUEST_METHOD"])
	{
		case 'POST':
			Post($contra, $email, $recuerdame);
		break;

	}

	function desencriptador($sealed_data, $envelope)
	{
		$private_key = openssl_get_privatekey(file_get_contents('private.key'));
		// Aqui comienza el desencriptador
		$input = base64_decode($sealed_data);
		$einput = base64_decode($envelope);

		$plaintext = NULL;
		openssl_open($input, $plaintext, $einput, $private_key);

		return $plaintext;
	}

	function Post($contra, $email, $recuerdame)
	{

		$datos = array();
		$respuesta = array();


		$sql = mysql_query("SELECT * FROM usuarios");
		$i = 0;
		while($fila = mysql_fetch_array($sql))
		{
			$datos[$i] = array(
				'id' => $fila['id'],
				'nombre' => $fila['nombre'],
				'username' => $fila['username'],
				'pass' => desencriptador($fila['passwords'], $fila['passworde'])
				);
			$i++;
		}

		if($datos[0]["pass"] == $contra && $email == $datos[0]["username"])
		{
			$_SESSION["username"] = $datos[0]["username"];
			$respuesta[0] = array(
			'respuesta' => "ok"
			);
			$send = json_encode($respuesta[0]);
			echo $send;
		}
		else
		{
			$respuesta[0] = array(
			'respuesta' => "error"
			);
			$send = json_encode($respuesta[0]);
			echo $send;
		}

	}
 ?>
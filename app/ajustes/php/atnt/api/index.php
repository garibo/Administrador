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
	@$contra = $request->contra;
	@$contran = $request->contran;
	@$contrann = $request->contrann;

	switch($_SERVER["REQUEST_METHOD"])
	{
		case 'POST':
			Post($contra, $contran, $contrann);
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

	function Post($contra, $contran, $contrann)
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

		if($datos[0]["pass"] == $contra && $contrann == $contran)
		{
			$public_key = openssl_get_publickey(file_get_contents('public.pem'));
			$data = $contrann;
			$encrypted = $e = NULL;
			openssl_seal($data, $encrypted, $e, array($public_key));
			$sealed_data = base64_encode($encrypted);
			$envelope = base64_encode($e[0]);

			$peticion = "UPDATE usuarios SET passwords = '$sealed_data ', passworde = '$envelope'  WHERE id = 1";
			mysql_query($peticion);

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
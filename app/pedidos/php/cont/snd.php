<?php 
	
	include '../../../../config/config.php';
	include "../../../../config/conect.php";
	$conect = new CONEXION();
	mysql_set_charset('utf8');

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	@$destinatrio = $request->destinatrio;
	@$asunto  = $request->asunto;
	@$mensaje = $request->mensaje;


	switch($_SERVER["REQUEST_METHOD"])
	{
		case 'POST':
			Post($asunto, $mensaje, $destinatrio);
		break;
	}

	function Post($asunto, $mensaje, $destinatrio)
	{
		$datos = array();
		$to = $destinatrio;
		$subject = $asunto;

		$message = "<html><head><title></title><link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'></head><body style='background-color: #F1F2F7;'><center><div id='wrapper' style='width: 500px; height: auto; background-color: #474751;margin: 0 auto; border-radius: 8px 8px 0px 0px;padding-bottom: 20px;'><div class='user-heading alt gray-bg' style='padding-top: 20px;'> <a href='#' style='float: left; margin-right: 15px; margin-left: 30px; display: inline-block; border: 5px solid rgba(255,255,255,0.3); border-radius: 50%; -webkit-border-radius: 50%;'> <img alt='' src='http://pizzeriayes.com/administrador/assets/images/productos/pizza.png' style='width: 85px; height: 85px; border-radius: 50%; -webkit-border-radius: 50%; vertical-align: middle;'> </a> <h1 class='sign-up-title' style='font-size: 20px; font-weight: 300; margin-bottom: 5px; font-family: 'Open Sans',sans-serif; margin-top: 0px;'><font color='#ffffff'>Yes Pizza!</font></h1> <p style='font-size: 16px; color: #8b8b8b; line-height: 25px; margin-top: -5px; font-family: 'Open Sans',sans-serif;'><font color='#767676'>Tu pedido ha sido atendido</font></p></div></div><div id='contenido' style='background-color: #fff; height: 200px; width: 500px;margin: 0 auto;border-radius: 0px 0px 8px 8px;'> <div id='linea' style='height: 5px; background: #c4e17f; background-image: -webkit-linear-gradient(left, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4); background-image: -moz-linear-gradient(left, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4); background-image: -o-linear-gradient(left, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4); background-image: linear-gradient(to right, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4); '></div><h1 style='font-family: Arial; color: #333; font-size: 1.6em; text-align: center; padding-top: 10px;'>Su pedido esta en proceso de entrega</h1><p style='font-family: Arial; color: #333; text-align: center;'> '$mensaje' </p><center><p><input type='submit' value='Ir al sitio' class='emerald-flat-button' style='position: relative; vertical-align: top; width: 150px; height: 45px; padding: 0; border-radius: 5px; font-size: 1.3em; color: white; text-align: center; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25); background: #2ecc71; border: 0; border-bottom: 2px solid #28be68; cursor: pointer; -webkit-box-shadow: inset 0 -2px #28be68; box-shadow: inset 0 -2px #28be68;'></p></center></div></center></body></html>";

		// Always set content-type when sending HTML email
		$headers = "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

		// More headers
		$headers .= 'From: <ventas@pizzeriayes.com>' . "\r\n";

		if(mail($to,$subject,$message,$headers))
		{
			$datos[0] = array(
				'respuesta' => "bien"
			);

			$send = json_encode($datos);
			echo $send;	
		}
		else
		{
			$datos[0] = array(
				'respuesta' => "mal"
			);

			$send = json_encode($datos);
			echo $send;	
		}
	}
 ?>
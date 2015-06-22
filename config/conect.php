<?php
	class CONEXION
	{
	    function __construct() 
	    {
	        $this->connect();
	    }
	 
	    function __destruct() 
	    {
	        $this->close();
	    }	 
	    
	    function connect() 
	    {
	        include '../../../../config/config.php';	 
	        $con = mysql_connect(SERVER, USUARIO, PASSWORD) or die(mysql_error());	 
	        $db = mysql_select_db(DATABASE) or die(mysql_error()) or die(mysql_error());	 
	        return $con;
	    }
	 
	    function close()
	    {
	        mysql_close();
	    }	 
	} 
?>
CREATE TABLE repartidores
(
	id 					int 				not null auto_increment,
	nombre 				varchar(35) 		character set utf8 collate utf8_spanish_ci,
	apellido_paterno 	varchar(35) 		character set utf8 collate utf8_spanish_ci,
	apellido_materno 	varchar(35)  		character set utf8 collate utf8_spanish_ci,
	telefono			varchar(15) 		character set utf8 collate utf8_spanish_ci,
	PRIMARY KEY (id)
);

CREATE TABLE productos
(
	id 					int  				not null auto_increment,
	nombre 				varchar(35)  		character set utf8 collate utf8_spanish_ci,
	descripcion 		varchar(140) 		character set utf8 collate utf8_spanish_ci,
	precio				numeric(15,2),
	ingredientes 		varchar(140) 		character set utf8 collate utf8_spanish_ci,
	tamano 				varchar(20) 		character set utf8 collate utf8_spanish_ci,
	tipo 				varchar(20) 		character set utf8 collate utf8_spanish_ci,
	imagen_url			varchar(2083) 		character set utf8 collate utf8_spanish_ci,
	PRIMARY KEY (id)
);


CREATE TABLE clientes
(
	id 					int  				not null auto_increment,
	nombre 				varchar(35) 		character set utf8 collate utf8_spanish_ci,
	apellido_paterno 	varchar(35) 		character set utf8 collate utf8_spanish_ci,
	apellido_materno 	varchar(35) 		character set utf8 collate utf8_spanish_ci,
	PRIMARY KEY (id)
);

CREATE TABLE usuarios
(
	id 					int    				not null auto_increment,
	nombre 				varchar(35) 		character set utf8 collate utf8_spanish_ci,
	username 			varchar(35) 		character set utf8 collate utf8_spanish_ci,
	passworde 			varchar(500) 		character set utf8 collate utf8_spanish_ci, --Enveloped Data - Algoritmo de encriptacion asimetrica
	passwords 			varchar(500) 		character set utf8 collate utf8_spanish_ci, --Sealed Data - Algoritmo de encriptacion asimetrica
	PRIMARY KEY (id)
);

CREATE TABLE direcciones
(
	id 					int 					not null auto_increment,
	id_cliente			int,
	calle 				varchar(70) 			character set utf8 collate utf8_spanish_ci,
	colonia 			varchar(70) 			character set utf8 collate utf8_spanish_ci,
	numero				int,
	entre_calles 		varchar(150) 			character set utf8 collate utf8_spanish_ci,
	extra 				varchar(70) 			character set utf8 collate utf8_spanish_ci,
	PRIMARY KEY (id),
	FOREIGN KEY (id_cliente) REFERENCES clientes (id)
);

CREATE TABLE telefonos
(
	id 					int  					not null auto_increment,
	id_cliente			int,
	telefono 			varchar(15) 			character set utf8 collate utf8_spanish_ci,
	PRIMARY KEY (id),
	FOREIGN KEY (id_cliente) REFERENCES clientes (id)
);


CREATE TABLE pedidos
(
	id 					int 					not null auto_increment,
	id_cliente			int,
	id_direccion		int,
	id_repartidor		int,
	id_telefono			int,
	estado_pedido		varchar(35) 			character set utf8 collate utf8_spanish_ci,
	fecha				date,
	hora				time,
	PRIMARY KEY (id),
	FOREIGN KEY (id_cliente) REFERENCES clientes (id),
	FOREIGN KEY (id_direccion) REFERENCES direcciones (id),
	FOREIGN KEY (id_repartidor) REFERENCES repartidores (id),
	FOREIGN KEY (id_telefono) REFERENCES telefonos (id)
);

CREATE TABLE pedidos_linea
(
	id 					int 					not null auto_increment,
	id_producto			int,
	id_pedido			int,
	cantidad			int,
	total				numeric(15,2),
	PRIMARY KEY (id),
	FOREIGN KEY (id_producto) REFERENCES productos (id),
	FOREIGN KEY (id_pedido) REFERENCES pedidos (id)
);


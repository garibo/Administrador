---------------------------------------
-----View para listar los pedidos------
---------------------------------------
CREATE VIEW listapedidos AS
SELECT pedidos.id, clientes.nombre , CONCAT(direcciones.calle,' #',direcciones.numero,', ',direcciones.colonia) AS direccion,  pedidos.fecha, pedidos.hora
FROM pedidos
	LEFT JOIN direcciones
ON pedidos.id_cliente = direcciones.id_cliente
	LEFT JOIN clientes
ON pedidos.id_cliente = clientes.id
ORDER BY pedidos.id DESC;




-----------------------------------------------------------
---Consulta para listar los datos de un solo pedido--------
-----------------------------------------------------------

SELECT 

CONCAT(clientes.nombre,' ',clientes.apellido_paterno,' ',clientes.apellido_materno) AS cliente,

direcciones.calle, 
direcciones.colonia, 
direcciones.numero, 
direcciones.entre_calles, 
direcciones.extra,

CONCAT(repartidores.nombre,' ',repartidores.apellido_paterno,' ',repartidores.apellido_materno) AS repartidor,

telefonos.telefono

FROM pedidos 

LEFT JOIN  clientes ON pedidos.id_cliente = clientes.id
LEFT JOIN direcciones ON pedidos.id_direccion = direcciones.id
LEFT JOIN repartidores ON pedidos.id_repartidor = repartidores.id
LEFT JOIN telefonos ON pedidos.id_telefono = telefonos.id 

WHERE pedidos.id = 1;



---------------------------------------------------------------
---Consulta para listar los productos de un solo pedido--------
---------------------------------------------------------------

SELECT 

productos.nombre,
productos.ingredientes,
productos.tamano,
productos.precio,
pedidos_linea.cantidad

FROM pedidos_linea

INNER JOIN productos

ON pedidos_linea.id_producto = productos.id

WHERE pedidos_linea.id_pedido = 1;


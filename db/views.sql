---------------------------------------
-----View para listar los pedidos------
---------------------------------------
CREATE VIEW listapedidos AS
SELECT pedidos.id, clientes.nombre , CONCAT(direcciones.calle,' #',direcciones.numero,', ',direcciones.colonia) AS direccion,  pedidos.fecha, pedidos.hora, pedidos.visto, pedidos.importante, pedidos.eliminado, pedidos.contestado
FROM pedidos
	LEFT JOIN direcciones
ON pedidos.id_direccion = direcciones.id
	LEFT JOIN clientes
ON pedidos.id_cliente = clientes.id
ORDER BY pedidos.id DESC;

-----------------------------------------------------------
-----View para listar los pedidos productos ordenados------
-----------------------------------------------------------
CREATE VIEW productos_pedidos AS
SELECT pedidos_linea.id , productos.nombre, productos.id AS id_producto, productos.tipo
FROM pedidos_linea
LEFT JOIN productos
ON pedidos_linea.id_producto = productos.id
ORDER BY pedidos_linea.id;


-------------------------------------------------------------
-----View para listar el top 5 de productos mas pedidos------
-------------------------------------------------------------
CREATE VIEW top_pedidos AS
SELECT id_producto, nombre, COUNT(id_producto) AS concurrencia  
FROM     productos_pedidos
GROUP BY id_producto
ORDER BY concurrencia DESC
LIMIT    5;


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
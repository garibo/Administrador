(function(){

	angular.module('pizzaApp', ['ngRoute','ngResource','ngMessages'])

	.config(function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'tabla.html',
			controller: 'pizzasCtrl'
		}).
		when('/nuevo', {
			templateUrl: 'nuevo.html',
			controller: 'nuevoCtrl'
		}).
		when('/editar/:id', {
			templateUrl: 'editar.html',
			controller: 'editCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
	})

	.factory('Pizzas',function($resource){
		return $resource('http://localhost/administrador/app/productos/pizzas/php/api/:id',{
			id : '@id'
			},{
			'update': { method:'POST' },
			'eliminar': { method:'POST' },
		});
	})

	.controller('pizzasCtrl', function($scope, Pizzas) 
	{
		$scope.pizzas = Pizzas.query();
	})

	.controller('nuevoCtrl', function($scope, Pizzas) 
	{
		$scope.pizzas = Pizzas.query();
		$scope.agregar = function()
		{
			var record = new Pizzas();
			record.id = 1;
			record.nombre = $scope.nombre;
			record.descripcion = $scope.descripcion;
			record.precio = 0;
			record.ingredientes = $scope.ingredientes;
			record.tipo = 'pizza';

			record.$save(function(response){
            	$scope.pizzas.push(record);
     			swal("Pizza agregada!", "El registro se ha guardado!", "success");
     		});

			$scope.nombre = "";
			$scope.descripcion = "";
			$scope.ingredientes = "";
			$scope.nuevoForm.$setUntouched();
			
		}
	})

	.controller('editCtrl', function($scope, $routeParams, Pizzas) 
	{
		var re = new Pizzas();
		$scope.pizzas = Pizzas.query(function(data)
		{
			for(var i = 0; i < $scope.pizzas.length; i++)
			{
				if($scope.pizzas[i].id == $routeParams.id)
				{
					$scope.nombre = $scope.pizzas[i].nombre;
					$scope.descripcion = $scope.pizzas[i].descripcion;
					$scope.precio = $scope.pizzas[i].precio;
					$scope.ingredientes = $scope.pizzas[i].ingredientes;


					re.id = $routeParams.id;
					re.nombre = $scope.pizzas[i].nombre;
					re.descripcion = $scope.pizzas[i].descripcion;
					re.precio = $scope.pizzas[i].precio;
					re.ingredientes = $scope.pizzas[i].ingredientes;
					re.metodo = "update";
				}
			}
		},
		function(){

		});

		$scope.eliminar = function()
		{
			

			swal({   title: "Estas seguro?",   
				text: "Ya no podras recuperar este registro",   
				type: "warning",   
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",  
				cancelButtonText: "Cancelar!", 
				confirmButtonText: "Si, Eliminalo!",   
				closeOnConfirm: false }, 
				function(){  
				re.metodo = "delete";
				Pizzas.eliminar({ id: $routeParams.id }, re, function()
				{
					for(var i=0,len=$scope.pizzas.length;i<len;i++)
					{
						if($scope.pizzas[i].id == $routeParams.id)
						{
							$scope.pizzas.splice(i,1);
							swal("Eliminado!", "El registro ha sido eliminado.", "success"); 
							document.location.href = "http://localhost/administrador/app/productos/pizzas/#/";
							break;
						}
					}
				});
			});
		};

		$scope.editar = function()
		{
			re.metodo = "update";
			re.id = $routeParams.id;
			re.nombre = $scope.nombre;
			re.descripcion = $scope.descripcion;
			re.ingredientes = $scope.ingredientes;
			re.tipo = "pizza";
			Pizzas.update({ id: $routeParams.id }, re);
			swal("Registro actualizado!", "El registro se ha actualizado exitosamente", "success");
		};


	})

	.controller('perfilCtrl', function($scope, $http) 
	{
		$scope.nombrePerfil = "";
		$http.get('http://localhost/administrador/app/ajustes/php/usn/')
		.then(function(respuesta) {
           $scope.nombrePerfil = respuesta.data.nombre;
        }, function(error) {

        });
	});
	
})();
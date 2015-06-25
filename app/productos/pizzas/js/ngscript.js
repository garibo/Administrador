(function(){

	angular.module('pizzaApp', ['ngRoute','ngResource'])

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
			'update': { method:'PUT' }
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
			record.precio = $scope.precio;
			record.ingredientes = $scope.ingredientes;
			record.tipo = 'pizza';

			record.$save(function(response){
            	$scope.pizzas.push(record);
     		});

			$scope.nombre = "";
			$scope.descripcion = "";
			$scope.precio = "";
			$scope.ingredientes = "";
			
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
				}
			}
		},
		function(){

		});

		$scope.eliminar = function()
		{
			re.$remove(function()
			{
				for(var i=0,len=$scope.pizzas.length;i<len;i++)
				{
					if($scope.pizzas[i].id == $routeParams.id)
					{
						$scope.pizzas.splice(i,1);
						break;
					}
				}
			});
		};

		$scope.editar = function()
		{
			re.id = $routeParams.id;
			re.nombre = $scope.nombre;
			re.descripcion = $scope.descripcion;
			re.precio = $scope.precio;
			re.ingredientes = $scope.ingredientes;
			re.tipo = "pizza";

			Pizzas.update({ id: $routeParams.id }, re);
		};


	});
})();
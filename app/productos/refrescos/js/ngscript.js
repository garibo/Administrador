(function(){

	angular.module('refrescoApp', ['ngRoute','ngResource'])

	.config(function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'tabla.html',
			controller: 'refrescosCtrl'
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

	.factory('Refrescos',function($resource){
		return $resource('http://localhost/administrador/app/productos/refrescos/php/api/:id',{
			id : '@id'
			},{
			'update': { method:'PUT' }
		});
	})

	.controller('refrescosCtrl', function($scope, Refrescos) 
	{
		$scope.refrescos = Refrescos.query();
	})

	.controller('nuevoCtrl', function($scope, Refrescos) 
	{
		$scope.refrescos = Refrescos.query();;
		$scope.agregar = function()
		{
			var record = new Refrescos();
			record.id = 1;
			record.nombre = $scope.nombre;
			record.descripcion = $scope.descripcion;
			record.precio = $scope.precio;
			record.tipo = 'refresco';

			record.$save(function(response){
            	$scope.refrescos.push(record);
     		});

			$scope.nombre = "";
			$scope.descripcion = "";
			$scope.precio = "";
			
		}
	})

	.controller('editCtrl', function($scope, $routeParams, Refrescos) 
	{
		var re = new Refrescos();
		$scope.refrescos = Refrescos.query(function(data)
		{
			for(var i = 0; i < $scope.refrescos.length; i++)
			{
				if($scope.refrescos[i].id == $routeParams.id)
				{
					$scope.nombre = $scope.refrescos[i].nombre;
					$scope.descripcion = $scope.refrescos[i].descripcion;
					$scope.precio = $scope.refrescos[i].precio;


					re.id = $routeParams.id;
					re.nombre = $scope.refrescos[i].nombre;
					re.descripcion = $scope.refrescos[i].descripcion;
					re.precio = $scope.refrescos[i].precio;
				}
			}
		},
		function(){

		});

		$scope.eliminar = function()
		{
			re.$remove(function()
			{
				for(var i=0,len=$scope.refrescos.length;i<len;i++)
				{
					if($scope.refrescos[i].id == $routeParams.id)
					{
						$scope.refrescos.splice(i,1);
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
			re.tipo = "refresco";

			Refrescos.update({ id: $routeParams.id }, re);
		};


	});
})();
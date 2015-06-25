(function(){

	angular.module('repartidoresApp', ['ngRoute','ngResource'])

	.config(function($routeProvider) {
		$routeProvider.
		when('/', {
		templateUrl: 'tabla.html',
		controller: 'repartidoresCtrl'
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

	.factory('Repartidores',function($resource){
		return $resource('http://localhost/administrador/app/repartidores/php/api/:id',{
			id : '@id'
			},{
			'update': { method:'PUT' }
		});
	})

	.controller('repartidoresCtrl', function($scope, Repartidores) 
	{
		$scope.repartidores = Repartidores.query();
	})

	.controller('nuevoCtrl', function($scope, Repartidores) 
	{
		$scope.agregar = function()
		{
			var record = new Repartidores();
			record.id = 1;
			record.nombre = $scope.nombre;
			record.apellido_paterno = $scope.apellido_paterno;
			record.apellido_materno = $scope.apellido_materno;
			record.telefono = $scope.telefono;

			record.$save(function(response){
            	$scope.repartidores.push(record);
     		});
     		
			$scope.nombre = "";
			$scope.apellido_paterno = "";
			$scope.apellido_materno = "";
			$scope.telefono = "";
		}

	})

	.controller('editCtrl', function($scope, $routeParams, Repartidores) 
	{
		var re = new Repartidores();
		$scope.repartidores = Repartidores.query(function(data)
			{
				for(var i = 0; i < $scope.repartidores.length; i++)
				{
					if($scope.repartidores[i].id == $routeParams.id)
					{
						$scope.nombre = $scope.repartidores[i].nombre;
						$scope.apellido_paterno = $scope.repartidores[i].apellido_paterno;
						$scope.apellido_materno = $scope.repartidores[i].apellido_materno;
						$scope.telefono = $scope.repartidores[i].telefono;


						re.id = $routeParams.id;
						re.nombre = $scope.repartidores[i].nombre;
						re.apellido_paterno = $scope.repartidores[i].apellido_paterno;
						re.apellido_materno = $scope.repartidores[i].apellido_materno;
						re.telefono = $scope.repartidores[i].telefono;

					}
				}
			},
			function(){

			});

		$scope.eliminar = function()
		{
			re.$remove(function()
			{
				for(var i=0,len=$scope.repartidores.length;i<len;i++)
				{
					if($scope.repartidores[i].id == $routeParams.id)
					{
						$scope.repartidores.splice(i,1);
						break;
					}
				}
			});
		};

		$scope.editar = function()
		{
			re.id = $routeParams.id;
			re.nombre = $scope.nombre;
			re.apellido_paterno = $scope.apellido_paterno;
			re.apellido_materno = $scope.apellido_materno;
			re.telefono = $scope.telefono;

			Repartidores.update({ id: $routeParams.id }, re);
		}


	});	


})();
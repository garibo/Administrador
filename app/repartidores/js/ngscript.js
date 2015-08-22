(function(){

	angular.module('repartidoresApp', ['ngRoute','ngResource', 'ngMessages'])

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
				swal("Repartidor agregado!", "El registro se ha realizado exitosamente", "success");
            	$scope.repartidores.push(record);
     		});
     		
			$scope.nombre = "";
			$scope.apellido_paterno = "";
			$scope.apellido_materno = "";
			$scope.telefono = "";
			$scope.repartidoresForm.$setUntouched();
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
						$scope.telefono = parseInt($scope.repartidores[i].telefono);


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
			swal({   title: "Estas seguro?",   
				text: "Ya no podras recuperar este registro",   
				type: "warning",   
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",  
				cancelButtonText: "Cancelar!", 
				confirmButtonText: "Si, Eliminalo!",   
				closeOnConfirm: false }, 
				function(){  
				re.$remove(function()
				{
					for(var i=0,len=$scope.repartidores.length;i<len;i++)
					{
						if($scope.repartidores[i].id == $routeParams.id)
						{
							$scope.repartidores.splice(i,1);
							swal("Eliminado!", "El registro ha sido eliminado.", "success"); 
							document.location.href = "http://localhost/administrador/app/repartidores/#/";					
							break;
						}
					}
				});
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
			swal("Repartidor actualizado!", "El registro se ha actualizado exitosamente", "success");
		}


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
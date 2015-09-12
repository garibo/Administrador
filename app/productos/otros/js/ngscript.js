(function(){

	angular.module('otrosApp', ['ngRoute','ngResource','ngMessages'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'tabla.html',
			controller: 'otrosCtrl'
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
	}])

	.factory('Otros', ['$resource', function($resource){
		return $resource('http://localhost/administrador/app/productos/otros/php/api/:id',{
			id : '@id'
			},{
			'update': { method:'POST' },
			'eliminar': { method:'POST' },
		});
	}])

	.controller('otrosCtrl', ['$scope', 'Otros', function($scope, Otros) 
	{
		$scope.otros = Otros.query();
	}])

	.controller('nuevoCtrl', ['$scope', 'Otros', function($scope, Otros) 
	{
		$scope.otros = Otros.query();
		$scope.agregar = function()
		{
			var record = new Otros();
			record.id = 1;
			record.nombre = $scope.nombre;
			record.descripcion = $scope.descripcion;
			record.precio = $scope.precio;
			record.ingredientes = $scope.ingredientes;
			record.imagen_url = $scope.imagen_url;
			record.tipo = 'otros';
			record.$save(function(response){
            	$scope.otros.push(record);
            	swal("Platillo agregado!", "El registro se ha guardado!", "success");
     		});

			$scope.nombre = "";
			$scope.descripcion = "";
			$scope.precio = "";
			$scope.ingredientes = "";
			$scope.imagen_url = "";
			$scope.nuevoForm.$setUntouched();
			
		}
	}])

	.controller('editCtrl', ['$scope', '$routeParams', 'Otros', function($scope, $routeParams, Otros) 
	{
		var re = new Otros();
		$scope.otros = Otros.query(function(data)
		{
			for(var i = 0; i < $scope.otros.length; i++)
			{
				if($scope.otros[i].id == $routeParams.id)
				{
					$scope.nombre = $scope.otros[i].nombre;
					$scope.descripcion = $scope.otros[i].descripcion;
					$scope.precio = parseFloat($scope.otros[i].precio);
					$scope.ingredientes = $scope.otros[i].ingredientes;


					re.id = $routeParams.id;
					re.nombre = $scope.otros[i].nombre;
					re.descripcion = $scope.otros[i].descripcion;
					re.precio = $scope.otros[i].precio;
					re.ingredientes = $scope.otros[i].ingredientes;
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
				Otros.eliminar({ id: $routeParams.id }, re, function()
				{
					for(var i=0,len=$scope.otros.length;i<len;i++)
					{
						if($scope.otros[i].id == $routeParams.id)
						{
							$scope.otros.splice(i,1);
							swal("Eliminado!", "El registro ha sido eliminado.", "success"); 
							document.location.href = "http://localhost/administrador/app/productos/otros/#/";
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
			re.precio = $scope.precio;
			re.ingredientes = $scope.ingredientes;
			re.tipo = "otros";
			Otros.update({ id: $routeParams.id }, re);
			swal("Registro actualizado!", "El registro se ha actualizado exitosamente", "success");
		};


	}])

	.controller('perfilCtrl', ['$scope', '$http', function($scope, $http) 
	{
		$scope.nombrePerfil = "";
		$http.get('http://localhost/administrador/app/ajustes/php/usn/')
		.then(function(respuesta) {
           $scope.nombrePerfil = respuesta.data.nombre;
        }, function(error) {

        });
	}]);
})();
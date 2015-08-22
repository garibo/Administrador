(function(){

	angular.module('refrescoApp', ['ngRoute','ngResource', 'ngMessages'])

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
		$scope.refrescos = Refrescos.query();
		$scope.agregar = function()
		{
			var record = new Refrescos();
			record.id = 1;
			record.nombre = $scope.nombre;
			record.descripcion = $scope.descripcion;
			record.precio = $scope.precio;
			record.imagen_url = $scope.imagen_url;
			record.tipo = 'refresco';

			record.$save(function(response){
            	$scope.refrescos.push(record);
            	swal("Bebida agregada!", "El registro se ha realizado exitosamente", "success");
     		});

			$scope.nombre = "";
			$scope.descripcion = "";
			$scope.precio = "";
			$scope.imagen_url = "";
			$scope.nuevoForm.$setUntouched();
			
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
					$scope.precio = parseFloat($scope.refrescos[i].precio);


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
					for(var i=0,len=$scope.refrescos.length;i<len;i++)
					{
						if($scope.refrescos[i].id == $routeParams.id)
						{
							$scope.refrescos.splice(i,1);
							swal("Eliminado!", "El registro ha sido eliminado.", "success"); 
							document.location.href = "http://localhost/administrador/app/productos/refrescos/#/";
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
			re.descripcion = $scope.descripcion;
			re.precio = $scope.precio;
			re.tipo = "refresco";
			Refrescos.update({ id: $routeParams.id }, re);
			swal("Bebida actualizada!", "El registro se ha actualizado exitosamente", "success");
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
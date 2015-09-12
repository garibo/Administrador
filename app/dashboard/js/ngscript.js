(function(){

	angular.module('dashApp', ['ngResource'])


	.factory('Usuarios', ['$resource', function($resource){
		return $resource('http://localhost/administrador/app/clientes/php/api/',{
			id : '@id'
			},{
			'update': { method:'PUT' }
		});
	}])

	.factory('Pedidos', ['$resource', function($resource){
		return $resource('http://localhost/administrador/app/pedidos/php/api/',{
			id : '@id'
			},{
			'update': { method:'PUT' }
		});
	}])

	.controller('dashCtrl', ['$scope', 'Usuarios', 'Pedidos', function($scope, Usuarios, Pedidos) 
	{
		$scope.pedidos = Pedidos.query();
		$scope.usuarios = Usuarios.query();

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
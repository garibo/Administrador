(function(){

	angular.module('clientesApp', ['ngRoute','ngResource'])

	.config(function($routeProvider) {
		$routeProvider.
		when('/', {
		templateUrl: 'tabla.html',
		controller: 'clientesCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
	})

	.factory('Clientes',function($resource){
		return $resource('http://localhost/administrador/app/clientes/php/api/:id',{
			id : '@id'
			},{
			'update': { method:'PUT' }
		});
	})

	.controller('clientesCtrl', function($scope, Clientes) 
	{
		$scope.clientes = Clientes.query();
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
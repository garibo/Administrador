(function(){

	angular.module('clientesApp', ['ngRoute','ngResource'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
		when('/', {
		templateUrl: 'tabla.html',
		controller: 'clientesCtrl'
		}).
		when('/info/:id', {
		templateUrl: 'informacion.html',
		controller: 'informacionCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
	}])

	.factory('Listado', ['$http', function($http){
	return {
	  datos: function (id, callback){
	    $http({
	      method: 'GET',
	      url: 'http://localhost/administrador/app/clientes/php/pedidos/'+id
	    }).success(callback);
	  }
	};
	}])

	.factory('Clientes', ['$resource', function($resource){
		return $resource('http://localhost/administrador/app/clientes/php/api/:id',{
			id : '@id'
			},{
			'update': { method:'PUT' }
		});
	}])

	.controller('clientesCtrl', ['$scope', 'Clientes', function($scope, Clientes) 
	{
		$scope.clientes = Clientes.query();
	}])

	.controller('informacionCtrl', ['$scope', 'Listado', '$routeParams', '$route', function($scope, Listado, $routeParams, $route) 
	{
		Listado.datos($routeParams.id, function(data) {
          $scope.pedidos = data;
        });

		$scope.fecha = function(dt, dh)
		{
			moment.locale('es');
			return moment(dt+" "+dh).startOf('minute').fromNow();
		}

		$scope.recargar = function()
	    {
	    	$route.reload();
	    }
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
(function(){
	angular.module('pedidosApp', ['ngRoute','ngResource'])

	.config(function($routeProvider) {
		$routeProvider.

		when('/', {
			templateUrl: 'tabla.html',
			controller: 'listaCtrl'
		}).

		when('/vista/:id', {
			templateUrl: 'vista.html',
			controller: 'vistaCtrl'
		}).

		otherwise({
			redirectTo: '/'
		});
	})

	.factory('Listado',function($resource){
		return $resource('http://localhost/administrador/app/pedidos/php/api/');
	})

	.factory('DatosPedido', function($http){
	return {
	  datos: function (id, callback){
	    $http({
	      method: 'GET',
	      url: 'http://localhost/administrador/app/pedidos/php/datos/'+id+''
	    }).success(callback);
	  },
	  productos: function(id, callback){
	    $http({
	      method: 'GET',
	      url: 'http://localhost/administrador/app/pedidos/php/productos/'+id+''
	    }).success(callback);
	  }
	};
	})

	.controller('listaCtrl', function($scope, Listado) 
	{
		$scope.pedidos = Listado.query();

		$scope.$on('onRepeatLast', function(scope, element, attrs){
			angular.element('.minimal input').iCheck({
				checkboxClass: 'icheckbox_minimal',
				radioClass: 'iradio_minimal',
				increaseArea: '20%'
			});
		});
	})

	.controller('vistaCtrl', function($scope, $routeParams, DatosPedido) 
	{
		DatosPedido.datos($routeParams.id, function(data) {
          $scope.datos = data[0];
        });

        DatosPedido.productos($routeParams.id, function(data) {
          $scope.productos = data;
        });
	})

	.directive('onLastRepeat', function() {
        return function(scope, element, attrs) {
            if (scope.$last) setTimeout(function(){
                scope.$emit('onRepeatLast', element, attrs);
            }, 1);
        };
    });

})();